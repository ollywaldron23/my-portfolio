"use client";
import "./globals.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TypingIntro from "./components/TypingIntro";

const commands = ["home", "about me", "projects", "contact"];

export default function Home() {
  const [selectedCommand, setSelectedCommand] = useState(null);

  return (
    <main>
      <Navbar items={commands} selected={selectedCommand} onSelect={setSelectedCommand} />
      <TypingIntro />
    </main>
  );
}