import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Projects from "../src/app/components/Projects";
import { describe, it, expect, vi } from "vitest";

// Mock react-icons to simplify rendering
vi.mock("react-icons/fa", () => ({
  FaGithub: () => <span data-testid="icon-github" />,
  FaReact: () => <span data-testid="icon-react" />,
  FaNodeJs: () => <span data-testid="icon-nodejs" />,
  FaCss3Alt: () => <span data-testid="icon-css" />,
  FaHtml5: () => <span data-testid="icon-html" />,
  FaPython: () => <span data-testid="icon-python" />,
  FaDatabase: () => <span data-testid="icon-database" />,
  FaExternalLinkAlt: () => <span data-testid="icon-external" />,
}));
vi.mock("react-icons/si", () => ({
  SiMongodb: () => <span data-testid="icon-mongodb" />,
  SiExpress: () => <span data-testid="icon-express" />,
  SiPostgresql: () => <span data-testid="icon-postgresql" />,
  SiFlask: () => <span data-testid="icon-flask" />,
  SiVite: () => <span data-testid="icon-vite" />,
}));

describe("Projects Component", () => {
  it("renders project titles", () => {
    render(<Projects />);
    const titles = screen.getAllByText(/MakersBnB/);
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText(/Acebook/)).toBeInTheDocument();
    expect(screen.getByText(/BanksyMap/)).toBeInTheDocument();
  });

  it("shows details of first project by default", async () => {
    render(<Projects />);
    await waitFor(() =>
      expect(screen.getByText(/Property rental platform/)).toBeInTheDocument(),
    );
    expect(screen.getByText("12/05/2025 - 16/05/2025")).toBeInTheDocument();
  });

  it("switches to Acebook project when clicked", async () => {
    render(<Projects />);
    const acebookTab = screen.getByText(/Acebook/);
    fireEvent.click(acebookTab);

    await waitFor(() =>
      expect(screen.getByText(/Social media application/)).toBeInTheDocument(),
    );
    expect(screen.getByText("05/06/2025 - 16/06/2025")).toBeInTheDocument();
  });

  it("shows GitHub link if available", async () => {
    render(<Projects />);
    await waitFor(() =>
      expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
        "href",
        expect.stringContaining("github.com"),
      ),
    );
  });

  it("does not show demo link when empty", async () => {
    render(<Projects />);
    await waitFor(() =>
      expect(screen.queryByText(/Demo/)).not.toBeInTheDocument(),
    );
  });

  it("renders project images with lazy loading", async () => {
    render(<Projects />);
    await waitFor(() => {
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
      expect(images[0]).toHaveAttribute("loading", "lazy");
    });
  });
});
