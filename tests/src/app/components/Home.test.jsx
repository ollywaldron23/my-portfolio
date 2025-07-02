import { render, screen } from "@testing-library/react";
import Home from "../../../../src/app/components/Home";

describe("Home component", () => {
  test("renders TypingEffect with correct text and heading tag", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("|");

    const container = screen.getByRole("main");
    expect(container).toHaveClass("home-page");
  });
});
