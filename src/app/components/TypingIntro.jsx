import { useState, useEffect } from "react";

export default function TypingIntro() {
  const fullText = "I'm Olly Waldron, welcome to my portfolio!";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <h1 className="typing-text">
      {displayedText}
      <span className="blinking-cursor">|</span>
    </h1>
  );
}