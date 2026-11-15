import FlowField from "@/components/FlowField";
import { HScroll, InView, Lines, Marquee, Parallax, ScrollWords } from "@/components/motion";
import { Btn } from "@/components/ui";
import { footer, home as H, mandates, tagline } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Hero: the Komodo dragon in black and white, contour lines moving behind the type */}
      <InView as="section" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[150px] pb-10 md:pb-14" margin="0px">
        <FlowField className="absolute inset-0 h-full w-full" />
        <div className="wipe absolute inset-y-0 end-0 w-full md:w-[58%]" style={{ ["--d" as string]: "200ms" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/komodo.jpg" srcSet="/img/komodo-960.jpg 960w, /img/komodo.jpg 1920w" sizes="(max-width: 767px) 100vw, 58vw" alt="A Komodo dragon walking out of the dark" className="bw h-full w-full object-cover object-[60%_30%] opacity-35 md:opacity-80" style={{ maskImage: "linear-gradient(to right, transparent, #000 45%), linear-gradient(to top, transparent, #000 40%)", maskComposite: "intersect", WebkitMaskComposite: "source-in" }} />
        </div>
        <div className="wrap relative">
          <p className="label rise flex flex-wrap items-center gap-x-4 gap-y-1 text-ink/80">
            {tagline.map((t, i) => (<span key={t} className="flex items-center gap-4">{i > 0 && <span className="h-1 w-1 rounded-full bg-accent" />}{t}.</span>))}
          </p>
          <Lines as="h1" delay={150} className="display mt-6 text-[clamp(58px,13vw,216px)]"
            lines={[H.h1[0] + " " + H.h1[1], <span key="a">{H.h1[2]} <span className="serif text-accent" style={{ fontSize: "0.86em" }}>intelligence.</span></span>]} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="rise max-w-[40ch] text-[20px] leading-[1.45] md:text-[23px] lg:col-span-5" style={{ ["--d" as string]: "500ms" }}>{H.lead}</p>
            <p className="rise max-w-[52ch] text-[16px] text-ink/75 lg:col-span-4" style={{ ["--d" as string]: "580ms" }}>{H.body}</p>
            <div className="rise lg:col-span-3 lg:justify-self-end" style={{ ["--d" as string]: "660ms" }}><Btn href="/komodo-management/" solid>Learn more</Btn></div>
          </div>
        </div>
      </InView>

      <Marquee items={tagline} className="border-y border-line py-6 md:py-8" />

      {/* Why: the firm's thesis, lit word by word */}
      <section className="py-28 md:py-44">
        <div className="wrap">
          <InView><p className="label rise flex items-center gap-4 text-muted"><span className="text-accent">01</span><span className="h-px w-10 bg-line" />Black Komodo Investments</p></InView>
          <h2 className="sr-only">{H.why}</h2>
          <ScrollWords text={H.why} accent={["building", "value", "to", "last"]} className="display mt-10 text-[clamp(44px,8.6vw,140px)]" />
          <InView className="mt-20 grid gap-10 border-t border-line pt-10 md:mt-28 lg:grid-cols-12">
            <p className="serif rise text-[34px] leading-[1.1] md:text-[52px] lg:col-span-6">{H.chase[0]}<br /><span className="text-ink/60">{H.chase[1]}</span></p>
            <p className="rise text-[19px] text-ink/85 lg:col-span-4 lg:col-start-9" style={{ ["--i" as string]: 2 }}>{H.decades}</p>
          </InView>
        </div>
      </section>

      {/* A full-bleed frame of Dubai that drifts as it passes */}
      <section className="relative">
        <Parallax src="skyline-night" alt="Dubai's skyline at night, reflected in the water" className="h-[70vh] md:h-[92vh]" amount={10} />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <InView className="wrap flex flex-wrap items-end justify-between gap-6 pb-10 md:pb-14">
            <Lines as="p" lines={["Since", "2020"]} className="display text-[clamp(64px,13vw,200px)]" />
            <p className="label rise max-w-[30ch] text-ink" style={{ ["--d" as string]: "300ms" }}>{footer.address}</p>
          </InView>
        </div>
      </section>

      {/* What we do: pinned, the three mandates travel sideways */}
      <section className="border-b border-line">
        <HScroll count={mandates.length + 1} head={
          <InView className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="label rise flex items-center gap-4 text-muted"><span className="text-accent">02</span><span className="h-px w-10 bg-line" />Mandates</p>
              <Lines lines={[H.whatTitle]} className="display mt-5 text-[clamp(52px,7vw,112px)]" />
            </div>
            <p className="rise max-w-[62ch] text-[17px] text-ink/85 lg:col-span-6 lg:col-start-7" style={{ ["--d" as string]: "200ms" }}>{H.what}</p>
          </InView>
        }>
          {mandates.map((m, i) => (
            <article key={i} className="flex min-h-[340px] flex-1 flex-col justify-between border border-line bg-surface p-7 md:p-10">
              <div className="flex items-start justify-between gap-6">
                <p className="label text-accent">{m.kicker}</p>
                <p className="display text-[64px] leading-[0.8] text-ink/15 md:text-[110px]">0{i + 1}</p>
              </div>
              <div>
                <h3 className="display max-w-[14ch] text-[40px] md:text-[clamp(40px,3.6vw,64px)]">{m.title}</h3>
                <p className="mt-5 max-w-[46ch] text-ink/85">{m.body}</p>
              </div>
            </article>
          ))}
          <article className="flex min-h-[340px] flex-1 flex-col justify-between bg-accent p-7 text-[#0a0a0a] md:p-10">
            <p className="label">Next</p>
            <div>
              <p className="display max-w-[12ch] text-[40px] md:text-[clamp(40px,3.6vw,64px)]">The record, and the conversation.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/information-and-papers/" className="btn !border-[#0a0a0a] !text-[#0a0a0a] hover:!text-[#0a0a0a]">Our performance</a>
                <a href="/contact/" className="btn !border-[#0a0a0a] !bg-[#0a0a0a] !text-ink hover:!text-[#0a0a0a]">Get in touch</a>
              </div>
            </div>
          </article>
        </HScroll>
      </section>
    </>
  );
}
