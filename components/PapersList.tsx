"use client";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useState } from "react";
import { papers } from "@/lib/site";
import { InView } from "./motion";

/* The papers, grouped as on the firm's site. On a mouse, a paper's cover follows the pointer over its row. */
export default function PapersList() {
  const [hover, setHover] = useState<{ t: string; g: string; n: string } | null>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0), my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 26 }), y = useSpring(my, { stiffness: 220, damping: 26 });
  let n = 0;
  return (
    <div onPointerMove={(e) => { if (e.pointerType === "mouse") { mx.set(e.clientX + 28); my.set(e.clientY - 150); } }} onPointerLeave={() => setHover(null)}>
      {papers.map((g, gi) => (
        <InView as="section" key={g.group} className="wrap grid gap-6 border-t border-line py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label rise text-accent">0{gi + 1}</p>
            <h2 className="display rise mt-4 max-w-[12ch] text-[40px] md:text-[56px]" style={{ ["--i" as string]: 1 }}>{g.group}</h2>
          </div>
          <ul className="lg:col-span-8">
            {g.items.map((t, i) => {
              const num = String(++n).padStart(2, "0");
              return (
                <li key={t} className="rise" style={{ ["--i" as string]: i + 1 }}>
                  <Link href={`/contact/?paper=${encodeURIComponent(t)}`} onPointerEnter={(e) => e.pointerType === "mouse" && setHover({ t, g: g.group, n: num })}
                    className="group relative flex items-center gap-5 border-b border-line py-5 md:py-6" aria-label={`Request ${t}`}>
                    <span className="w-8 text-[13px] font-medium text-muted transition-colors duration-200 group-hover:text-accent">{num}</span>
                    <span className="flex-1 text-[20px] leading-[1.25] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-2 md:text-[26px]">{t}</span>
                    <span className="label hidden text-muted transition-colors duration-200 group-hover:text-ink sm:block">Request</span>
                    <span className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </InView>
      ))}
      {!reduce && (
        <motion.div className="pointer-events-none fixed left-0 top-0 z-20 hidden h-[300px] w-[220px] lg:block" style={{ x, y }} aria-hidden="true">
          <motion.div className="flex h-full w-full origin-bottom-left flex-col justify-between bg-ink p-5 text-[#0a0a0a] shadow-2xl"
            initial={false} animate={hover ? { opacity: 1, scale: 1, rotate: -3 } : { opacity: 0, scale: 0.94, rotate: 0 }} transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}>
            <span className="label flex justify-between"><span>BKI</span><span className="text-accent">{hover?.n}</span></span>
            <span className="display text-[30px] leading-[0.95]">{hover?.t}</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.12em]">{hover?.g}</span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
