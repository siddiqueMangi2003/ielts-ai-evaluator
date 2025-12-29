"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-4 top-0 h-32 w-32 animate-blob rounded-full bg-primary/20 blur-3xl"></div>
        <div className="animation-delay-2000 absolute right-0 top-0 h-32 w-32 animate-blob rounded-full bg-chart-2/20 blur-3xl"></div>
        <div className="animation-delay-4000 absolute bottom-0 left-20 h-32 w-32 animate-blob rounded-full bg-chart-1/20 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              IE
            </div>
            <span className="text-lg font-semibold">IELTS AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="#practice"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Practice
            </Link>
            <Link
              href="#about-ielts"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About IELTS
            </Link>
            <Link
              href="#about-us"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About Us
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Pricing
            </Link>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border/40 mt-2">
            <Link
              href="#practice"
              className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Practice
            </Link>
            <Link
              href="#about-ielts"
              className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              About IELTS
            </Link>
            <Link
              href="#about-us"
              className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="#pricing"
              className="block py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Button size="sm" className="w-full">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
