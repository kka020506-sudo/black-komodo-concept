"use client";
import { motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { base } from "@/lib/base";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Adds .in once the block scrolls into view; the CSS classes .line, .rise and .wipe do the rest. */
export function InView({ children, className = "", as: Tag = "div", margin = "-12% 0px", style }: { children: ReactNode; className?: string; as?: "div" | "section" | "ul" | "ol" | "header" | "footer" | "article"; margin?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const T = Tag as any;
  return <T ref={ref} className={`${className} ${seen ? "in" : ""}`} style={style}>{children}</T>;
}

/* A headline set as masked lines. Each line rises out of its own mask, 90ms apart. */
export function Lines({ lines, className = "", as: Tag = "h2", delay = 0 }: { lines: ReactNode[]; className?: string; as?: "h1" | "h2" | "h3" | "p"; delay?: number }) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="line" style={{ ["--i" as string]: i, ["--d" as string]: `${delay}ms` }}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/* A photograph that drifts against the scroll inside its frame. */
export function Parallax({ src, alt, className = "", bw = true, amount = 8, eager = false }: { src: string; alt: string; className?: string; bw?: boolean; amount?: number; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={`${base}/img/${src}.jpg`} srcSet={`${base}/img/${src}-960.jpg 960w, ${base}/img/${src}.jpg 1920w`} sizes="100vw" alt={alt} loading={eager ? "eager" : "lazy"} decoding="async"
        className={`absolute inset-x-0 h-[124%] w-full object-cover ${bw ? "bw" : ""}`} style={{ y, top: "-12%" }} />
    </div>
  );
}

/* A statement whose words light up as it crosses the screen. */
export function ScrollWords({ text, className = "", accent = [] as string[] }: { text: string; className?: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const [n, setN] = useState(reduce ? words.length : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (!reduce) setN(Math.round(v * words.length)); });
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className={accent.includes(w.replace(/[.,]/g, "")) ? "text-accent" : ""} style={{ opacity: i < n ? 1 : 0.18, transition: "opacity .4s ease" }}>{w} </span>
      ))}
    </p>
  );
}

/* A pinned section whose panels travel sideways as the page scrolls. Below 1024px, or with reduced motion, the panels simply stack. */
export function HScroll({ children, count, head }: { children: ReactNode; count: number; head: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)");
    const f = () => setWide(m.matches);
    f(); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  const pin = wide && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((count - 1) / count) * 100}%`]);
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} style={pin ? { height: `${count * 90 + 60}vh` } : undefined}>
      {pin ? (
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-[130px] pb-10">
          <div className="wrap">{head}</div>
          <motion.div className="mt-10 flex flex-1 gap-6 ps-[max(40px,calc((100vw-1360px)/2))] xl:ps-[max(64px,calc((100vw-1360px)/2))]" style={{ x, width: `${count * 62}vw` }}>
            {children}
          </motion.div>
          <div className="wrap mt-8"><div className="h-px bg-line"><motion.div className="h-px origin-left bg-accent" style={{ scaleX: bar }} /></div></div>
        </div>
      ) : (
        <div className="wrap py-24">{head}<div className="mt-12 grid gap-5">{children}</div></div>
      )}
    </div>
  );
}

/* Counts up once, when it comes into view. */
export function Counter({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reduce) { setV(to); return; }
    const t0 = performance.now(), dur = 1800;
    let raf = 0;
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / dur); setV(Math.round(to * (1 - Math.pow(1 - p, 4)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, reduce]);
  return <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>{v.toLocaleString("en-US")}</span>;
}

export function Marquee({ items, dur = 40, className = "" }: { items: string[]; dur?: number; className?: string }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee" style={{ ["--dur" as string]: `${dur}s` }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="display px-8 text-[64px] md:text-[120px]">{t}</span>
                <span className="h-4 w-4 rounded-full bg-accent md:h-6 md:w-6" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
