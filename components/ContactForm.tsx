"use client";
import { useEffect, useState } from "react";
import { contact } from "@/lib/site";

const field = "peer block w-full border-0 border-b border-ink/35 bg-transparent px-0 pb-3 pt-2 text-[20px] text-ink outline-none transition-colors duration-200 focus:border-accent";
const label = "label block text-muted";
const err = "mt-2 text-[14px] text-accent";

export default function ContactForm() {
  const [e, setE] = useState<{ first?: boolean; email?: boolean }>({});
  const [done, setDone] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    const paper = new URLSearchParams(window.location.search).get("paper");
    if (paper) setMsg(`I would like to request: ${paper}`);
  }, []);
  return (
    <form noValidate onSubmit={(ev) => {
      ev.preventDefault();
      const f = new FormData(ev.currentTarget);
      const errs = { first: !String(f.get("first") || "").trim(), email: !/^\S+@\S+\.\S+$/.test(String(f.get("email") || "")) };
      setE(errs); setDone(!errs.first && !errs.email);
      const bad = errs.first ? "first" : errs.email ? "email" : "";
      if (bad) (ev.currentTarget.elements.namedItem(bad) as HTMLElement).focus();
    }}>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="first">First name</label>
          <input id="first" name="first" autoComplete="given-name" className={field} aria-invalid={e.first || undefined} aria-describedby="first-e" />
          {e.first && <p id="first-e" className={err}>Write your first name.</p>}
        </div>
        <div>
          <label className={label} htmlFor="last">Last name</label>
          <input id="last" name="last" autoComplete="family-name" className={field} />
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" className={field} aria-invalid={e.email || undefined} aria-describedby="email-e" />
          {e.email && <p id="email-e" className={err}>Write an email address with an @.</p>}
        </div>
        <div className="md:col-span-2">
          <label className={label} htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={4} value={msg} onChange={(x) => setMsg(x.target.value)} className={field + " resize-y"} />
        </div>
      </div>
      <button type="submit" className="btn btn-solid mt-10">Send</button>
      <p role="status" className="mt-5 min-h-[28px] text-[15px] text-ink/85">{done ? contact.demo : ""}</p>
    </form>
  );
}
