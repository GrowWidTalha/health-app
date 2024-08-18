/**
 * v0 by Vercel.
 * @see https://v0.dev/t/THGIceafCC9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function CopyInput({ text }: { text: string}) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex items-center w-full max-w-md">
      <Input type="text" placeholder="Copy this link" className="flex-1 pr-16" readOnly value={text} />
      <Button
        variant={copied ? "secondary" : "default"}
        onClick={handleCopy}
        className={`ml-2 transition-transform ${copied ? "scale-110" : ""}`}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}