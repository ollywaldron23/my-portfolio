import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "../components/Contact";
import emailjs from "@emailjs/browser";

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}));

// Mock alert and console.warn
global.alert = vi.fn();
console.warn = vi.fn();

describe("Contact Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows alert if fields are empty", () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    expect(global.alert).toHaveBeenCalledWith("Please fill in all fields.");
  });

  it("blocks submission if bot-field is filled", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: "message", value: "Hello there" },
    });
    const botField = screen.getByDisplayValue(""); // hidden field
    fireEvent.change(botField, {
      target: { name: "bot-field", value: "botstuff" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(console.warn).toHaveBeenCalledWith("Bot detected! Submission blocked.");
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  it("shows alert if name exceeds 40 characters", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "a".repeat(41) },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: "message", value: "Hello" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(global.alert).toHaveBeenCalledWith(
      "I dont think that's your real name. Please shorten it to 40 characters or less."
    );
  });

  it("shows alert for invalid email format", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: "message", value: "Hello" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(global.alert).toHaveBeenCalledWith("Please enter a valid email address.");
  });

  it("shows alert if message contains suspicious content", () => {
    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: "message", value: "<script>alert('xss')</script>" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(global.alert).toHaveBeenCalledWith(
      "Suspicious content detected in your message. Please remove links or scripts."
    );
  });

  it("sends message on valid submission", async () => {
    emailjs.send.mockResolvedValueOnce();

    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: "message", value: "This is a safe message." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalled();
      expect(global.alert).toHaveBeenCalledWith("Thanks for your message!");
    });

    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByLabelText(/email/i)).toHaveValue("");
    expect(screen.getByLabelText(/message/i)).toHaveValue("");
  });

  it("handles emailjs failure", async () => {
    emailjs.send.mockRejectedValueOnce(new Error("Network error"));

    render(<Contact />);
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { name: "name", value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { name: "message", value: "Hello" },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        "Oops! Something went wrong. Please try again."
      );
    });
  });
});
