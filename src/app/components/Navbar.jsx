import { FaLinkedin, FaGithub, FaMoon, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

const Navbar = ({ selected, onSelect }) => {
  const [isDark, setIsDark] = useState(false);

  const navItems = ["home", "about me", "projects", "contact"];

  // On mount, check if user prefers dark mode or saved mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <nav className="navbar">
      {/* Left: Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle light/dark mode"
      >
        {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>

      {/* Center: Navigation Items */}
      <ul className="navbar-items">
        {navItems.map((item) => (
          <li
            key={item}
            tabIndex={0}
            style={{ fontWeight: selected === item ? "bold" : "normal" }}
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Right: Social Icons */}
      <div className="navbar-icons">
        <a
          href="https://uk.linkedin.com/in/olly-waldron-044b23223"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>

        <a
          href="https://github.com/ollywaldron23"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
