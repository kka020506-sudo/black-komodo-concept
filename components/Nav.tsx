"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { footer, nav } from "@/lib/site";

export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 7.5v13M10 14.5l8-7M12.8 12l6 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function Nav() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);
  const ease = [0.77, 0, 0.175, 1] as const;
  return (
    <>
      <header className={`fixed inset-x-0 top-[32px] z-40 transition-colors duration-300 ${open ? "text-[#0a0a0a]" : "bg-bg text-ink"}`}>
        <div className="wrap flex h-[72px] items-center justify-between">
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:bg-white focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
          <Link href="/" className="flex items-center gap-3" aria-label="Black Komodo Investments, home">
            <Mark />
            <span className="display text-[24px] tracking-[0.02em]">Black Komodo</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/contact/" className="ulink hidden px-2 py-3 text-[15px] font-medium sm:block">Get in touch</Link>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu"
              className="flex h-12 items-center gap-3 rounded-full border border-current px-5 text-[15px] font-medium transition-transform duration-150 active:scale-[.97]">
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span className="absolute inset-x-0 top-0 h-[1.5px] bg-current transition-transform duration-300" style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }} />
                <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-current transition-transform duration-300" style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }} />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div id="menu" key="menu" className="fixed inset-0 z-30 overflow-y-auto bg-accent text-[#0a0a0a]"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}>
            <nav className="wrap flex min-h-full flex-col justify-between pt-[130px] pb-10" aria-label="Main">
              <ul>
                {nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden border-b border-black/20">
                    <motion.div initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: [0.23, 1, 0.32, 1] }}>
                      <Link href={n.href} aria-current={path === n.href ? "page" : undefined}
                        className="group flex items-baseline gap-4 py-2 md:py-3">
                        <span className="w-8 text-[13px] font-medium">0{i + 1}</span>
                        <span className="display text-[40px] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3 md:text-[72px]">{n.label}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <p className="mt-10 flex flex-wrap justify-between gap-2 text-[14px] font-medium">
                <span>{footer.address}</span><span>Dubai, since 2020</span>
              </p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
