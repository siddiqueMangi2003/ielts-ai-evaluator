from fastapi import FastAPI, UploadFile, File, HTTPException
import whisper
import tempfile
import os
import subprocess
import asyncio
from concurrent.futures import ThreadPoolExecutor
from pydub import AudioSegment
import numpy as np

app = FastAPI()

# Faster Whisper model
model = whisper.load_model("base")

# Thread pool for CPU-bound work
executor = ThreadPoolExecutor(max_workers=2)


# -------------------- STARTUP: WARM OLLAMA --------------------

@app.on_event("startup")
def warm_ollama():
    """
    Warm up Ollama to avoid first-request timeout.
    Runs once when FastAPI starts.
    """
    try:
        subprocess.run(
            ["ollama", "run", "llama2:7b", "Say ready"],
            capture_output=True,
            timeout=300
        )
        print("Ollama warmed up successfully")
    except Exception as e:
        print(f"Ollama warm-up failed: {e}")


# -------------------- HEALTH --------------------

@app.get("/health")
def health():
    return {"status": "ok"}


# -------------------- WHISPER --------------------

async def transcribe_audio(audio_path: str):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(
        executor,
        lambda: model.transcribe(
            audio_path,
            fp16=False,
            beam_size=1,
            verbose=False
        )
    )


# -------------------- OLLAMA --------------------

def call_ollama_sync(prompt: str) -> str:
    try:
        result = subprocess.run(
            ["ollama", "run", "llama2:7b", prompt],
            capture_output=True,
            timeout=300
        )
        if result.returncode != 0:
            return "Evaluation error"
        return result.stdout.decode("utf-8", errors="replace").strip()
    except subprocess.TimeoutExpired:
        return "Error: Ollama timeout"
    except Exception as e:
        return f"Error: {e}"


async def call_ollama_async(prompt: str) -> str:
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, call_ollama_sync, prompt)


# -------------------- FILLER DETECTION (CAPPED) --------------------

async def detect_fillers_async(audio_path: str):
    def _detect():
        audio = AudioSegment.from_file(audio_path)
        samples = np.array(audio.get_array_of_samples())
        sr = audio.frame_rate

        fillers = []
        window = int(sr * 0.25)  # 250ms
        last_time = -10.0

        for i in range(0, len(samples), window):
            chunk = samples[i:i + window]
            if len(chunk) == 0:
                continue

            rms = np.sqrt(np.mean(chunk.astype(float) ** 2))
            db = 20 * np.log10(rms + 1e-9)

            if db < -42:
                t = i / sr
                if t - last_time > 1.2:
                    fillers.append((t, "(um)"))
                    last_time = t

        return fillers

    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, _detect)


# -------------------- MAIN ENDPOINT --------------------

@app.post("/evaluate-speaking")
async def evaluate_speaking(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    temp_path = None
    try:
        suffix = "." + file.filename.split(".")[-1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        # Run in parallel
        result, fillers = await asyncio.gather(
            transcribe_audio(temp_path),
            detect_fillers_async(temp_path)
        )

        segments = result.get("segments", [])
        transcript_parts = []
        prev_end = 0.0
        filler_idx = 0

        for seg in segments:
            # Pause detection
            if seg["start"] - prev_end > 0.6:
                transcript_parts.append("(pause)")

            # Insert capped filler
            while filler_idx < len(fillers) and fillers[filler_idx][0] < seg["end"]:
                transcript_parts.append(fillers[filler_idx][1])
                filler_idx += 1

            transcript_parts.append(seg["text"].strip())
            prev_end = seg["end"]

        transcript = " ".join(transcript_parts).strip()

        if not transcript:
            raise HTTPException(status_code=400, detail="Empty transcription")

        # IELTS evaluation prompt (fast + strict)
        prompt = (
            "You are an IELTS Speaking examiner.\n"
            "Score strictly (5.0–9.0).\n"
            "Consider fluency, grammar, vocabulary, pauses, fillers.\n\n"
            "Format:\n"
            "Band: <number>\n"
            "Strengths: <points>\n"
            "Improvements: <points>\n\n"
            f"Answer:\n{transcript}"
        )

        evaluation = await call_ollama_async(prompt)

        return {
            "transcript": transcript,
            "evaluation": evaluation
        }

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)
