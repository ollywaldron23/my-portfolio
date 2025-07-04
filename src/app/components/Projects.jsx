import { useState, useEffect } from "react";

import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaPython,
  FaDatabase,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiFlask,
  SiVite,
  SiOpenai,
  SiVitest,
} from "react-icons/si";

const projects = [
  {
    title: "MakersBnB",
    description:
      "Property rental platform using Python and Flask with PostgreSQL database. Built user authentication, property listings with image uploads, booking request system, and availability calendar management in a team environment.",
    github: "https://github.com/ollywaldron23/makersbnb-python",
    demo: "", // no demo link for this one
    date: "12/05/2025 - 16/05/2025",
    images: [
      "/makersbnb1.png",
      "/makersbnb2.png",
      "/makersbnb3.png",
      "/makersbnb4.png",
    ],
    tech: [<FaPython />, <SiFlask />, <SiPostgresql />, <FaDatabase />],
  },
  {
    title: "Acebook",
    description:
      "Social media application using the MERN stack with Vite. Features user authentication, real-time news feed, post creation with likes, friend search and connections, and responsive design. Built collaboratively with focus on user experience.",
    github: "https://github.com/ollywaldron23/acebook-team-water",
    demo: "",
    date: "05/06/2025 - 16/06/2025",
    images: [
      "/acebook1.png",
      "/acebook2.png",
      "/acebook3.png",
      "/acebook4.png",
    ],
    tech: [<FaReact />, <SiExpress />, <FaNodeJs />, <SiMongodb />, <SiVite />],
  },
  {
    title: "BanksyMap",
    description:
      "Interactive map displaying Banksy street art locations across London. Built with MERN stack featuring custom map interface, advanced filtering by themes and criteria, user authentication, bookmark tracking, and community artwork submissions with comments.",
    github: "https://github.com/ollywaldron23/banksy-map",
    demo: "", // no demo yet
    date: "19/06/2025 - 30/06/2025",
    images: [
      "/banksymap1.png",
      "/banksymap2.png",
      "/banksymap3.png",
      "/banksymap4.png",
    ],
    tech: [<FaReact />, <SiExpress />, <FaNodeJs />, <SiMongodb />, <SiVite />],
  },
  {
    title: "PitchFork",
    description:
      "PitchFork is a small creative web app that uses OpenAI to provide instant feedback on user-submitted ideas, simulating responses from two opposing personas—an encouraging Angel and a critical Devil. Built with React and styled for interactivity, it allows users to toggle between serious and joke modes for either constructive or humorous reviews. The interface reacts dynamically based on user input and hover behavior, creating a playful but functional way to test ideas. The project is fully tested with Vitest and Testing Library, ensuring stability across interactions.",
    github: "https://github.com/ollywaldron23/PitchFork",
    demo: "", // no demo yet
    date: "02/07/2025 - 04/07/2025",
    images: [
      "/pitchfork1.png",
      "/pitchfork2.png",
      "/pitchfork3.png",
      "/pitchfork4.png",
    ],
    tech: [<FaReact />, <SiVite />, <SiOpenai />, <SiVitest />],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 300); // trigger fade-in after 300ms
  }, []);

  const project = projects[selected];

  return (
    <div className="projects-container">
      {/* Left Side: Project Titles */}
      <div className={`project-list ${!loaded ? "fade-in" : ""}`}>
        {projects.map((p, i) => (
          <div
            key={i}
            className={`project-item ${selected === i ? "active" : ""}`}
            onClick={() => setSelected(i)}
          >
            {p.title}
          </div>
        ))}
      </div>

      {/* Right Side: Project Detail */}
      <div className={`project-detail ${!loaded ? "fade-in" : ""}`}>
        <h2>{project.title}</h2>
        <p className="project-date">{project.date}</p>
        <p>{project.description}</p>

        {/* Images gallery */}
        {project.images.length > 0 && (
          <div className="project-images">
            {project.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {/* Links */}
        <div className="project-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <FaGithub /> GitHub
            </a>
          )}
        </div>

        {/* Tech stack */}
        <div className="tech-stack">
          {project.tech.map((icon, i) => (
            <span key={i} className="tech-icon">
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
