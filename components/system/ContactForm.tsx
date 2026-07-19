"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error" | "nokey";

/**
 * The only functional gap between a mood film and a mood film that generates
 * leads. Posts directly to Web3Forms (no backend needed) using an access key
 * read from an environment variable — never hardcoded, never committed.
 *
 * Two variants:
 *  - "waitlist": a single email field, for the Chapter 08 close.
 *  - "enquiry": name / email / a message, for the dedicated /contact page.
 *
 * Real states throughout — submitting, success, error — and an honest "not
 * yet configured" state instead of silently pretending to send when no key
 * is present. A honeypot field catches bots without a CAPTCHA.
 *
 * To go live: set NEXT_PUBLIC_WEB3FORMS_KEY in .env.local (see .env.local.example).
 */
export default function ContactForm({
  variant = "enquiry",
  subject = "New enquiry — NOIR",
}: {
  variant?: "waitlist" | "enquiry";
  subject?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  const configured = !!key && key.length > 10;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!configured) {
      if (!form.reportValidity()) return;
      setStatus("nokey");
      return;
    }

    setStatus("submitting");
    const data = new FormData(form);
    data.append("access_key", key!);
    data.append("subject", subject);
    data.append("from_name", "NOIR — A House of Invisible Luxury");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="reveal is-in">
        <p className="eyebrow" style={{ color: "var(--champagne)" }}>
          Received
        </p>
        <p className="lede mt-4 max-w-sm">
          {variant === "waitlist"
            ? "You will hear from us before anyone else does."
            : "Your note has reached us. We reply to every one, in the order they arrive — by hand, not by template."}
        </p>
      </div>
    );
  }

  if (variant === "waitlist") {
    return (
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />
        <input type="hidden" name="subject" value={subject} />
        <div className="flex w-full max-w-sm flex-col gap-4 sm:flex-row sm:items-end">
          <label className="flex-1 text-left">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              autoComplete="email"
              className="w-full border-0 border-b bg-transparent pb-3 text-sm outline-none"
              style={{
                borderColor: "rgba(227,196,137,0.3)",
                color: "var(--ivory)",
                fontFamily: "var(--font-sans)",
              }}
            />
          </label>
          <button
            type="submit"
            disabled={status === "submitting"}
            data-hover
            className="shrink-0 pb-3 text-[0.64rem] uppercase"
            style={{
              letterSpacing: "0.42em",
              color: "var(--champagne)",
              opacity: status === "submitting" ? 0.5 : 1,
            }}
          >
            {status === "submitting" ? "Sending…" : "Join the list →"}
          </button>
        </div>
        {status === "error" && (
          <p role="alert" className="text-xs" style={{ color: "var(--champagne)" }}>
            Something interrupted that. Please try again.
          </p>
        )}
        {status === "nokey" && (
          <p role="status" className="text-xs" style={{ color: "var(--smoke)" }}>
            Form not yet connected — demo mode.
          </p>
        )}
      </form>
    );
  }

  // enquiry variant
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7">
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />
      <input type="hidden" name="subject" value={subject} />

      <div className="grid gap-7 sm:grid-cols-2">
        <FormField id="name" label="Your name" required autoComplete="name" />
        <FormField id="email" label="Email" type="email" required autoComplete="email" />
      </div>

      <FormField
        id="message"
        label="Your enquiry"
        textarea
        required
        rows={5}
        placeholder="Tell us what brought you here."
      />

      {status === "error" && (
        <p role="alert" className="text-sm" style={{ color: "var(--champagne)" }}>
          <strong>That did not send.</strong> Please try again, or write to us
          directly.
        </p>
      )}
      {status === "nokey" && (
        <p role="status" className="text-sm" style={{ color: "var(--smoke)" }}>
          This form is not yet connected to delivery — demo mode.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          data-hover
          className="inline-flex items-center gap-4"
        >
          <span
            className="text-[0.64rem] uppercase"
            style={{
              letterSpacing: "0.42em",
              color: "var(--champagne)",
              opacity: status === "submitting" ? 0.5 : 1,
            }}
          >
            {status === "submitting" ? "Sending…" : "Send enquiry"}
          </span>
          <span style={{ color: "var(--champagne)" }}>→</span>
        </button>
      </div>
    </form>
  );
}

function FormField({
  id,
  label,
  type = "text",
  textarea = false,
  required = false,
  rows = 4,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  rows?: number;
  placeholder?: string;
  autoComplete?: string;
}) {
  const common = {
    id,
    name: id,
    required,
    placeholder,
    autoComplete,
    className:
      "w-full border-0 border-b bg-transparent py-3 text-base outline-none placeholder:text-[color:var(--smoke-dim)]",
    style: {
      borderColor: "rgba(227,196,137,0.26)",
      color: "var(--ivory)",
      fontFamily: "var(--font-sans)",
    } as React.CSSProperties,
  };
  return (
    <label className="flex flex-col gap-3">
      <span className="eyebrow" style={{ letterSpacing: "0.32em" }}>
        {label}
      </span>
      {textarea ? (
        <textarea rows={rows} {...common} />
      ) : (
        <input type={type} {...common} />
      )}
    </label>
  );
}
