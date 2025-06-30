import { useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaHtml5,
  FaGithub,
  FaPython,
  FaDatabase,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiFlask,
  SiVite,
} from "react-icons/si";

const projects = [
  {
    title: "MakersBnB",
    description:
      "An Airbnb clone built with Python, Flask, and PostgreSQL. Users can list properties, make booking requests, and manage availability.",
    github: "https://github.com/peternieuwkoop/makersbnb-python-seed-hunor",
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
      "A Facebook-style social media app using the MERN stack and Vite. Users can post, like, prod friends, and search for new friends. It features user authentication, real-time updates, and a responsive design.",
    github: "https://github.com/meg-atkinson/acebook-team-water",
    demo: "",
    date: "05/06/2025 - 16/06/2025",
    images: ["/acebook1.png", "/acebook2.png", "/acebook3.png"],
    tech: [<FaReact />, <SiExpress />, <FaNodeJs />, <SiMongodb />, <SiVite />],
  },
  {
    title: "BanksyMap",
    description:
      "A full-stack map app built with the MERN stack and Vite. It displays Banksy artworks in London on a custom map interface. Users can view details about each artwork, filter by themes and other criteria, report new artworks, track bookmarks and visits, and comment on pieces. The app features user authentication, a responsive design, and a modern UI.",
    github: "https://github.com/Nx-Makomva/banksy-map",
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
];

export default function Projects() {
  const [selected, setSelected] = useState(0);

  const project = projects[selected];

  return (
    <div className="projects-container">
      {/* Left Side: Project Titles */}
      <div className="project-list">
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
      <div className="project-detail">
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
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <FaExternalLinkAlt /> Demo
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
