"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { STORE } from "@/lib/menu";

type Field = "name" | "email" | "message";

/**
 * The live contact form posts to Shopify. Here the message opens the
 * customer's email client addressed to info@modessae.com with everything
 * pre-filled, so nothing is lost and no backend is needed.
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (values.message.trim().length < 10) next.message = "Please add a few more words so we can help.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Message from ${values.name.trim()}`);
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}${values.phone ? "\n" + values.phone : ""}`,
    );
    window.location.href = `mailto:${STORE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field = (name: Field | "phone", label: string, type = "text", required = true) => (
    <div className="grid gap-2">
      <label htmlFor={`contact-${name}`} className="label">
        {label}
        {!required && <span className="ml-2 normal-case tracking-normal text-ink-mute">(optional)</span>}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        value={values[name]}
        onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
        aria-invalid={name !== "phone" && errors[name] ? true : undefined}
        aria-describedby={name !== "phone" && errors[name] ? `contact-${name}-error` : undefined}
        className="h-12 border border-line bg-paper px-4 outline-none transition-colors focus:border-ink"
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : name === "phone" ? "tel" : undefined}
      />
      {name !== "phone" && errors[name] && (
        <p id={`contact-${name}-error`} className="text-sm text-sale">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 bg-paper-dim p-6 lg:p-8">
      {field("name", "Name")}
      {field("email", "Email", "email")}
      {field("phone", "Phone number", "tel", false)}
      <div className="grid gap-2">
        <label htmlFor="contact-message" className="label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className="border border-line bg-paper px-4 py-3 outline-none transition-colors focus:border-ink"
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-sale">
            {errors.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary">
          Send
          <span className="btn-icon">
            <ArrowRight size={14} weight="bold" />
          </span>
        </button>
        <p className="text-sm text-ink-mute" aria-live="polite">
          {sent ? "Your email client has opened with your message ready to send." : "Opens in your email app."}
        </p>
      </div>
    </form>
  );
}
