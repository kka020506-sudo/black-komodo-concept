import Link from "next/link";
import type { ReactNode } from "react";
import { closing, footer, nav } from "@/lib/site";
import { InView, Lines } from "./motion";
import { Mark } from "./Nav";

export function Arrow() {
  return (
    <svg className="arrow" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Btn({ href, children, solid = false }: { href: string; children: ReactNode; solid?: boolean }) {
  return (
    <Link href={href} className={`btn ${solid ? "btn-solid" : ""}`}>
      {children}
      <Arrow />
    </Link>
  );
}

/* The top of every inner page: a label, then the page name set very large. */
export function PageHead({ index, label, lines, children }: { index: string; label: string; lines: ReactNode[]; children?: ReactNode }) {
  return (
    <InView as="header" className="wrap pt-[190px] pb-16 md:pt-[230px] md:pb-24" margin="0px">
      <p className="label rise flex items-center gap-4 text-muted"><span className="text-accent">{index}</span><span className="h-px w-10 bg-line" />{label}</p>
      <Lines as="h1" lines={lines} className="display mt-8 text-[clamp(56px,12.5vw,200px)]" delay={100} />
      {children && <div className="rise mt-10 grid gap-8 md:mt-14 lg:grid-cols-12" style={{ ["--d" as string]: "450ms" }}>{children}</div>}
    </InView>
  );
}

export function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((it, i) => (
        <li key={i} className="rise flex gap-4 border-t border-line py-4" style={{ ["--i" as string]: i }}>
          <span className="mt-[11px] h-[6px] w-[6px] shrink-0 rounded-full bg-accent" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function Closing() {
  return (
    <InView as="section" className="relative overflow-hidden border-t border-line py-28 md:py-44">
      <div className="wrap">
        <Lines lines={closing.title.map((l, i) => (i === 1 ? <span key={i} className="text-accent">{l}</span> : l))} className="display text-[clamp(52px,10.5vw,170px)]" />
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="rise max-w-[52ch] text-[19px] text-ink/85 lg:col-span-6" style={{ ["--d" as string]: "300ms" }}>{closing.body}</p>
          <div className="rise lg:col-span-6 lg:justify-self-end" style={{ ["--d" as string]: "400ms" }}><Btn href="/contact/" solid>{closing.cta}</Btn></div>
        </div>
      </div>
    </InView>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3"><Mark /><span className="display text-[26px]">Black Komodo Investments</span></div>
          <p className="serif mt-6 max-w-[30ch] text-[26px] leading-[1.2]">{footer.line}</p>
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {nav.map((n) => (
            <li key={n.href} className="border-t border-line"><Link href={n.href} className="flex min-h-[52px] items-center justify-between gap-4 text-[16px] transition-colors duration-200 hover:text-accent">{n.label}<Arrow /></Link></li>
          ))}
        </ul>
      </div>
      <div className="overflow-hidden" aria-hidden="true">
        <p className="display whitespace-nowrap text-center text-[19.5vw] leading-[0.8] text-ink/[0.07]">Black Komodo</p>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-line py-6 text-[14px] text-muted">
        <span>{footer.copy}</span>
        <span>{footer.address}</span>
        <span>Unofficial redesign concept · <Link href="/credits/" className="ulink text-ink">Photo credits</Link></span>
      </div>
    </footer>
  );
}
