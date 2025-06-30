import { useState, useEffect } from "react";

export default function TypingEffect({ text, speed = 100, as = "h1", className = "" }) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  const Tag = as; // allows dynamic tag, e.g. h1, p, span

  return (
    <Tag className={`${className} typing-text`}>
      {displayedText}
      <span className="blinking-cursor">|</span>
    </Tag>
  );
}