import React from "react";

export default function AboutMe() {
  return (
    <div className="about-container" role="region" aria-label="About Me">
      <div className="about-image-container">
        <img className="about-image" src="/olly.jpeg" alt="Olly Waldron" />
        <div className="image-tooltip">
          <span className="arrow">→</span> Not my usual attire
        </div>
      </div>
      <div className="about-text-container">
        <p>
          Hi, I'm Oliver Waldron — but most people call me Olly. I'm an aspiring
          software engineer who enjoys building practical, user-focused web
          applications. I'm driven by a love of learning and a curiosity for how
          things work.
        </p>
        <p>
          I recently completed the 14-week Makers software engineering bootcamp,
          where I trained in full-stack development and agile practices. Before
          this, I spent five years in finance — a background that taught me how
          to work under pressure and communicate clearly.
        </p>
        <p>
          My current toolkit includes JavaScript, React, Node.js, and Python,
          and I'm always keen to explore new technologies. Outside of coding,
          you'll usually find me walking my sausage dog, Milo, or squeezing in a
          round of golf.
        </p>
      </div>
    </div>
  );
}
