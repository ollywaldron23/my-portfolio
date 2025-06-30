import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to form handling backend
    console.log("Form submitted:", form);
    alert("Thanks for your message!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-container">
      <p>Please reach out at my links above, or via the form below.</p>

      <form onSubmit={handleSubmit} className="contact-form">
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