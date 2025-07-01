"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Page() {
  const [selected, setSelected] = useState("home");

  return (
    <>
      <Navbar selected={selected} onSelect={setSelected} />

      <main>
        {selected === "home" && <Home />}
        {selected === "about me" && <AboutMe />}
        {selected === "projects" && <Projects />}
        {selected === "contact" && <Contact />}
      </main>
    </>
  );
}
