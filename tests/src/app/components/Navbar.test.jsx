import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../../../../src/app/components/Navbar";
import { vi } from "vitest";

describe("Navbar", () => {
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    localStorage.clear();

    window.matchMedia = vi.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    });

    document.documentElement.removeAttribute("data-theme");
  });

  afterAll(() => {
    window.matchMedia = originalMatchMedia;
  });

  test("defaults to light mode if no localStorage or prefers-color-scheme dark", () => {
    render(<Navbar selected="home" onSelect={() => {}} />);
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();

    const button = screen.getByRole("button", {
      name: /toggle light\/dark mode/i,
    });
    // Moon icon shows when light mode (not dark)
    expect(button.querySelector("svg")).toBeTruthy();
  });

  test("sets dark mode if localStorage theme is dark", () => {
    localStorage.setItem("theme", "dark");

    render(<Navbar selected="home" onSelect={() => {}} />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    const button = screen.getByRole("button", {
      name: /toggle light\/dark mode/i,
    });
    // Sun icon shows when dark mode active
    expect(button.querySelector("svg")).toBeTruthy();
  });

  test("sets dark mode if no localStorage but prefers-color-scheme is dark", () => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(<Navbar selected="home" onSelect={() => {}} />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  test("toggles theme on button click", () => {
    render(<Navbar selected="home" onSelect={() => {}} />);
    const button = screen.getByRole("button", {
      name: /toggle light\/dark mode/i,
    });

    // Initial: light mode
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();

    // Click to dark mode
    fireEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");

    // Click to light mode
    fireEvent.click(button);
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
    expect(localStorage.getItem("theme")).toBe("light");
  });

  test("renders nav items and highlights selected", () => {
    const onSelect = vi.fn();
    render(<Navbar selected="projects" onSelect={onSelect} />);

    const homeItem = screen.getByText("home");
    const projectsItem = screen.getByText("projects");

    expect(homeItem).toHaveStyle("font-weight: normal");
    expect(projectsItem).toHaveStyle("font-weight: bold");

    fireEvent.click(homeItem);
    expect(onSelect).toHaveBeenCalledWith("home");
  });

  test("renders social icons with correct links and aria labels", () => {
    render(<Navbar selected="home" onSelect={() => {}} />);

    const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
    const githubLink = screen.getByRole("link", { name: /github/i });

    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://uk.linkedin.com/in/olly-waldron-044b23223",
    );
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/ollywaldron23",
    );
  });
});
