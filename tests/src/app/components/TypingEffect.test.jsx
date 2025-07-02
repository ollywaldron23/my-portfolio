import { render, screen } from "@testing-library/react";
import TypingEffect from "../../../../src/app/components/TypingEffect";
import { vi } from "vitest";
import { act } from "react-dom/test-utils";

vi.useFakeTimers();

describe("TypingEffect", () => {
  const text = "Hello";

  afterEach(() => {
    vi.clearAllTimers();
  });

  test("renders with initial empty displayedText and blinking cursor", () => {
    render(<TypingEffect text={text} speed={100} />);
    const element = screen.getByText("|").parentElement;
    expect(element.textContent).toBe("|");
  });

  test("types out text one character at a time", () => {
    render(<TypingEffect text={text} speed={100} />);
    const element = screen.getByText("|").parentElement;

    expect(element.textContent).toBe("|");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(element.textContent).toBe("H|");

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(element.textContent).toBe("He|");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(element.textContent).toBe("Hel|");
  });

  test("uses the 'as' prop to change tag", () => {
    render(<TypingEffect text={text} speed={100} as="p" />);
    const element = screen.getByText("|").parentElement;
    expect(element.tagName.toLowerCase()).toBe("p");
  });

  test("applies passed className plus typing-text", () => {
    render(<TypingEffect text={text} speed={100} className="custom-class" />);
    const element = screen.getByText("|").parentElement;
    expect(element.classList.contains("typing-text")).toBe(true);
    expect(element.classList.contains("custom-class")).toBe(true);
  });
});
