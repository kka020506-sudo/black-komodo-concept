"use client";
import { useEffect, useRef } from "react";

/* The hero's ground: slow contour lines, like scales or a chart of long cycles, that swell near the pointer. */
export default function FlowField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true, t = 0;
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * d; c.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ptr.x += (ptr.tx - ptr.x) * 0.06; ptr.y += (ptr.ty - ptr.y) * 0.06;
      const rows = Math.round(h / 22), step = 14;
      for (let r = 0; r < rows; r++) {
        const y0 = (r + 0.5) * (h / rows);
        ctx.beginPath();
        for (let x = -step; x <= w + step; x += step) {
          const n = Math.sin(x * 0.004 + r * 0.35 + t * 0.6) * 14 + Math.sin(x * 0.011 - r * 0.2 + t * 0.9) * 7 + Math.sin((x + r * 40) * 0.0017 + t * 0.3) * 22;
          const dx = x - ptr.x, dy = y0 - ptr.y;
          const bump = Math.exp(-(dx * dx + dy * dy) / 26000) * -34;
          const y = y0 + n + bump;
          if (x === -step) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const hot = r % 9 === 4;
        ctx.strokeStyle = hot ? "rgba(255,90,44,0.55)" : `rgba(242,240,235,${0.05 + 0.09 * Math.abs(Math.sin(r * 0.5))})`;
        ctx.lineWidth = hot ? 1.2 : 1;
        ctx.stroke();
      }
    };
    const loop = () => { t += 0.006; draw(); if (visible) raf = requestAnimationFrame(loop); };
    size(); draw();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible && !reduce) raf = requestAnimationFrame(loop); });
    io.observe(c);
    const move = (e: PointerEvent) => { const b = c.getBoundingClientRect(); ptr.tx = e.clientX - b.left; ptr.ty = e.clientY - b.top; };
    const onSize = () => { size(); draw(); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", onSize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("pointermove", move); window.removeEventListener("resize", onSize); };
  }, []);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
