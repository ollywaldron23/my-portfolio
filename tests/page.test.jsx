// tests/page.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Page from "../src/app/page";

vi.mock("../src/app/components/Navbar", () => ({
  default: ({ selected, onSelect }) => (
    <nav>
      {["home", "about me", "projects", "contact"].map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          aria-pressed={selected === item}
        >
          {item}
        </button>
      ))}
    </nav>
  ),
}));

vi.mock("../src/app/components/Home", () => ({
  default: () => <div>Home Component</div>,
}));
vi.mock("../src/app/components/AboutMe", () => ({
  default: () => <div>About Me Component</div>,
}));
vi.mock("../src/app/components/Projects", () => ({
  default: () => <div>Projects Component</div>,
}));
vi.mock("../src/app/components/Contact", () => ({
  default: () => <div>Contact Component</div>,
}));

describe("Page Component", () => {
  it("shows Home component by default", () => {
    render(<Page />);
    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });

  it("shows About Me component when About Me button is clicked", () => {
    render(<Page />);
    fireEvent.click(screen.getByRole("button", { name: /about me/i }));
    expect(screen.getByText("About Me Component")).toBeInTheDocument();
  });

  it("shows Projects component when Projects button is clicked", () => {
    render(<Page />);
    fireEvent.click(screen.getByRole("button", { name: /projects/i }));
    expect(screen.getByText("Projects Component")).toBeInTheDocument();
  });

  it("shows Contact component when Contact button is clicked", () => {
    render(<Page />);
    fireEvent.click(screen.getByRole("button", { name: /contact/i }));
    expect(screen.getByText("Contact Component")).toBeInTheDocument();
  });
});
