"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FOUNDER, PROJECT_TYPES } from "@/lib/content";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

export const WHATSAPP_URL = `https://wa.me/${FOUNDER.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hi Vorel Labs, I'd like to talk about a project."
)}`;

const field =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-silver-light placeholder:text-silver-dim outline-none transition-colors focus:border-black/40";

export default function Contact() {
  const [type, setType] = useState(PROJECT_TYPES[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto" | "error">("idle");

  // If NEXT_PUBLIC_FORM_ENDPOINT is set (Formspree, Web3Forms, …) enquiries are
  // submitted there and reach your inbox. Otherwise fall back to the visitor's
  // email app so nothing is silently lost.
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("website")) return; // honeypot: bots fill this, humans never see it
    d.set("projectType", type);
    const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (!endpoint) {
      const body = [
        `Name: ${d.get("name")}`,
        `Email: ${d.get("email")}`,
        `Company: ${d.get("company") || "-"}`,
        `Project type: ${type}`,
        `Budget: ${d.get("budget") || "-"}`,
        `Timeline: ${d.get("timeline") || "-"}`,
        "",
        `${d.get("message")}`,
      ].join("\n");
      window.location.href = `mailto:${FOUNDER.email}?subject=${encodeURIComponent(
        `${type} enquiry — Vorel Labs`
      )}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: d,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-divide relative py-28 md:py-40">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tightest text-silver-light">
              Let&rsquo;s build something{" "}
              <span className="text-metal">worth remembering.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-silver">
              Tell us what you&rsquo;re building. We reply personally, usually
              within a day.
            </p>

            <div className="mt-10 space-y-4">
              <Magnetic>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-lift inline-flex items-center gap-2 rounded-full bg-silver-light px-7 py-3.5 text-sm font-medium text-base transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Chat on WhatsApp →
                </a>
              </Magnetic>
              <dl className="space-y-3 pt-4 text-[15px]">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-silver-dim">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${FOUNDER.email}`}
                      className="text-silver-light hover:underline"
                    >
                      {FOUNDER.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-silver-dim">
                    Phone
                  </dt>
                  <dd>
                    <a
                      href={`tel:${FOUNDER.phone.replace(/\s/g, "")}`}
                      className="text-silver-light hover:underline"
                    >
                      {FOUNDER.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-silver-dim">
                    Based in
                  </dt>
                  <dd className="text-silver">{FOUNDER.location} · Remote worldwide</dd>
                </div>
              </dl>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="shadow-soft relative space-y-5 rounded-2xl border border-black/10 bg-white p-7 md:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[12px] uppercase tracking-[0.2em] text-silver-dim">
                  Name
                </span>
                <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[12px] uppercase tracking-[0.2em] text-silver-dim">
                  Email
                </span>
                <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-[12px] uppercase tracking-[0.2em] text-silver-dim">
                Company or project <span className="normal-case tracking-normal">(optional)</span>
              </span>
              <input name="company" autoComplete="organization" className={field} placeholder="Company or project name" />
            </label>

            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <fieldset>
              <legend className="mb-2 text-[12px] uppercase tracking-[0.2em] text-silver-dim">
                Project type
              </legend>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={type === t}
                    onClick={() => setType(t)}
                    className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                      type === t
                        ? "border-black bg-black text-white"
                        : "border-black/15 text-silver hover:border-black/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[12px] uppercase tracking-[0.2em] text-silver-dim">
                  Budget range
                </span>
                <select name="budget" defaultValue="" className={field}>
                  <option value="">Not sure yet</option>
                  <option>Under ₹15,000</option>
                  <option>₹15,000 – ₹30,000</option>
                  <option>₹30,000 – ₹1,00,000</option>
                  <option>₹1,00,000+</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-[12px] uppercase tracking-[0.2em] text-silver-dim">
                  Timeline
                </span>
                <select name="timeline" defaultValue="" className={field}>
                  <option value="">Flexible</option>
                  <option>Within 2 weeks</option>
                  <option>1 month</option>
                  <option>2–3 months</option>
                  <option>3+ months</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-[12px] uppercase tracking-[0.2em] text-silver-dim">
                Message
              </span>
              <textarea name="message" required rows={5} className={`${field} resize-none`} placeholder="What are you building, and by when?" />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-silver-light px-7 py-3.5 text-sm font-medium text-base transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </button>
            <p role="status" aria-live="polite" className="min-h-[1.25rem] text-center text-[13px] text-silver-dim">
              {status === "sent" && "Thanks — your enquiry is in. We'll reply personally, usually within a day."}
              {status === "mailto" && "Opening your email app — just press send. Prefer instant? Use WhatsApp."}
              {status === "error" && "That didn't go through. Please try again, or message us on WhatsApp."}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
