import { InView, Lines, Marquee, ScrollWords } from "@/components/motion";
import { Btn, Bullets, PageHead } from "@/components/ui";
import { capabilities as C, mandates } from "@/lib/site";

export const metadata = { title: "Capabilities & Mandates" };

export default function Page() {
  return (
    <>
      <PageHead index="04" label="Mandates and frameworks" lines={[C.h1[0], <span key="m">&amp; <span className="serif text-accent" style={{ fontSize: "0.86em" }}>mandates</span></span>]}>
        <p className="text-[22px] leading-[1.4] md:text-[26px] lg:col-span-7">{C.lead}</p>
      </PageHead>

      <section>
        {mandates.map((m, i) => (
          <InView as="article" key={i} className="border-t border-line py-16 md:py-24">
            <div className="wrap grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-2">
                <p className="display rise text-[88px] leading-[0.8] text-accent md:text-[140px]">0{i + 1}</p>
              </div>
              <div className="lg:col-span-5">
                <p className="label rise text-muted">{m.kicker}</p>
                <Lines lines={[m.title]} className="display mt-4 text-[clamp(40px,4.6vw,76px)]" />
                <p className="rise mt-6 max-w-[48ch] text-[19px] text-ink/85" style={{ ["--i" as string]: 3 }}>{m.body}</p>
                {i === 1 && <p className="rise mt-6 text-ink/70" style={{ ["--i" as string]: 4 }}>{C.contactNote}</p>}
              </div>
              <Bullets items={m.items} className="text-[18px] lg:col-span-4 lg:col-start-9" />
            </div>
          </InView>
        ))}
        <div className="wrap flex flex-wrap gap-3 border-t border-line py-10">
          <Btn href="/information-and-papers/">Our performance</Btn>
          <Btn href="/contact/" solid>Get in touch</Btn>
        </div>
      </section>

      <section className="bg-ink py-24 text-[#0a0a0a] md:py-40">
        <div className="wrap">
          <p className="label">{C.perspectiveTitle}</p>
          <ScrollWords text={C.perspective[0]} accent={[]} className="display mt-8 text-[clamp(34px,5vw,84px)]" />
          <InView className="mt-16 grid gap-10 border-t border-black/20 pt-10 lg:grid-cols-2">
            <p className="rise text-[19px]">{C.perspective[1]}</p>
            <p className="rise text-[19px]" style={{ ["--i" as string]: 1 }}>{C.perspective[2]}</p>
          </InView>
        </div>
      </section>

      <InView as="section" className="py-24 md:py-36">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Lines lines={C.governanceTitle} className="display text-[clamp(44px,5.4vw,88px)]" />
            <p className="rise mt-8 max-w-[44ch] text-[19px] text-ink/85" style={{ ["--i" as string]: 2 }}>{C.governanceLead}</p>
          </div>
          <Bullets items={C.governance} className="text-[20px] lg:col-span-5 lg:col-start-8" />
        </div>
        <div className="wrap mt-20 grid gap-8 lg:grid-cols-12">
          <p className="serif rise text-[28px] leading-[1.2] md:text-[40px] lg:col-span-7">{C.custody}</p>
          <p className="rise text-ink/75 lg:col-span-4 lg:col-start-9" style={{ ["--i" as string]: 1 }}>{C.custody2}</p>
        </div>
      </InView>
      <Marquee items={C.banks} dur={55} className="border-y border-line py-6" />

      <InView as="section" className="py-24 md:py-36">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Lines lines={C.analyticalTitle} className="display text-[clamp(44px,5.4vw,88px)]" />
            <p className="rise mt-8 max-w-[44ch] text-[19px] text-ink/85" style={{ ["--i" as string]: 2 }}>{C.analyticalLead}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Bullets items={C.analytical} className="text-[20px]" />
            <p className="rise mt-8 text-ink/70" style={{ ["--i" as string]: 4 }}>{C.analyticalNote}</p>
          </div>
        </div>
      </InView>

      <InView as="section" className="border-t border-line py-24 md:py-36">
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12">
            <Lines lines={C.systemsTitle} className="display text-[clamp(44px,5.4vw,88px)] lg:col-span-7" />
            <p className="rise text-[19px] text-ink/85 lg:col-span-4 lg:col-start-9" style={{ ["--i" as string]: 2 }}>{C.systemsLead}</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {C.systems.map((s, i) => (
              <div key={i} className="rise group relative overflow-hidden border border-line bg-surface p-8 md:p-12" style={{ ["--i" as string]: i + 2 }}>
                <p className="display text-[clamp(72px,10vw,168px)] text-accent">{s.n}</p>
                <p className="mt-6 max-w-[24ch] text-[22px] leading-[1.25]">{s.t}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-12">
            <p className="label rise text-muted lg:col-span-4">{C.systemsListLead}</p>
            <Bullets items={C.systemsList} className="text-[19px] lg:col-span-8" />
          </div>
        </div>
      </InView>

      <InView as="section" className="border-t border-line py-24 md:py-40">
        <div className="wrap">
          <Lines lines={[C.human[0], <span key="r" className="serif text-accent" style={{ fontSize: "0.86em" }}>{C.human[1]}</span>]} className="display text-[clamp(52px,11vw,180px)]" />
          <p className="rise mt-8 text-[20px] text-ink/85" style={{ ["--d" as string]: "350ms" }}>{C.humanNote}</p>
        </div>
      </InView>
    </>
  );
}
