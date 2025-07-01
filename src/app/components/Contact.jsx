import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form["bot-field"]) {
    console.warn("Bot detected! Submission blocked."); // Prevent bot submissions
    return;
    }

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

      // Name length check
    if (form.name.length > 40) {
      alert("I dont think that's your real name. Please shorten it to 40 characters or less.");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Message length check
    if (form.message.length > 500) {
      alert("Please shorten your message.");
      return;
    }
    // Check for suspicious content (links, scripts, etc.)
    const suspiciousPattern = /(http|www\.|<script|<\/)/i;
    if (suspiciousPattern.test(form.message)) {
      alert("Suspicious content detected in your message. Please remove links or scripts.");
      return;
    }

    emailjs
      .send(
        "service_n4ahd3h",      // service
        "template_3cm6dan",  // template
        {
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        "CUIw6rRtDqYpDCrzb"       // public
      )
      .then(() => {
        alert("Thanks for your message!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("Failed to send:", err);
        alert("Oops! Something went wrong. Please try again.");
      });
  };

  return (
    <div className="contact-container">
      <p>Please reach out at my links above, or via the form below.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <input
          type="text"
          name="bot-field"
          style={{ display: "none" }}
          onChange={handleChange}
          value={form["bot-field"] || ""} // Hidden field to catch bots
          autoComplete="off"
        />
        <label>
          name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          message
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">send message</button>
      </form>
    </div>
  );
}