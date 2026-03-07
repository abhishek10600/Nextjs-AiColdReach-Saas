"use client";

import { useEffect, useState } from "react";

interface TypingDMProps {
  text: string;
  speed?: number;
}

export default function TypingDM({ text, speed = 15 }: TypingDMProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setDone(false);

    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="whitespace-pre-wrap leading-relaxed text-sm text-gray-700">
      {displayedText}

      {!done && (
        <span className="animate-pulse ml-1 text-muted-foreground">▍</span>
      )}
    </p>
  );
}
