from fastapi import FastAPI, UploadFile, File, HTTPException
import whisper
import tempfile
import os
import subprocess

app = FastAPI()

# Load Whisper model (CPU-friendly)
model = whisper.load_model("small")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file received")

    temp_path = None
    try:
        suffix = "." + file.filename.split(".")[-1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        result = model.transcribe(temp_path)
        return {"text": result.get("text", "").strip()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {e}")

    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                pass


def call_ollama(prompt: str) -> str:
    """Call Ollama model safely via subprocess."""
    try:
        cmd = [
            "ollama",
            "run",
            "llama2:7b",   # replace with the model you pulled
            prompt
        ]
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if result.returncode != 0:
            return f"Error: {result.stderr.strip()}"
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        return "Error: Ollama call timed out"
    except Exception as e:
        return f"Error calling Ollama: {e}"


@app.post("/score")
async def score(payload: dict):
    text = payload.get("text", "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="Empty text")

    prompt = (
        "You are an IELTS Speaking examiner.\n"
        "Evaluate the following answer critically, and give a realistic band score between 5.0 and 9.0.\n"
        "Consider fluency, coherence, grammar, and vocabulary carefully. "
        "Be strict: penalize awkward sentences, grammatical errors, or basic vocabulary.\n\n"
        "Respond in this exact format:\n"
        "Band: <number>\n"
        "Strengths: <1–2 short points>\n"
        "Improvements: <1–2 short points>\n\n"
        f"Answer:\n{text}"
            )


    feedback = call_ollama(prompt)
    return {"feedback": feedback}


@app.post("/evaluate-speaking")
async def evaluate_speaking(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    temp_path = None
    try:
        # Save audio temporarily
        suffix = "." + file.filename.split(".")[-1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        # Transcribe
        result = model.transcribe(temp_path)
        transcript = result.get("text", "").strip()

        if not transcript:
            raise HTTPException(status_code=400, detail="Could not transcribe audio")

        # IELTS evaluation prompt (standardized)
        prompt = (
            "You are an IELTS Speaking examiner.\n"
            "Evaluate the following answer and respond in this exact format:\n\n"
            "Band: <number between 5.0 and 9.0>\n"
            "Strengths: <1–2 short points>\n"
            "Improvements: <1–2 short points>\n\n"
            f"Answer:\n{transcript}"
        )

        feedback = call_ollama(prompt)

        return {
            "transcript": transcript,
            "evaluation": feedback
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                pass
