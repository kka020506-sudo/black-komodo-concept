import { InView, Lines, Parallax, ScrollWords } from "@/components/motion";
import { Btn, PageHead } from "@/components/ui";
import { management as M } from "@/lib/site";

export const metadata = { title: "Komodo Management" };

export default function Page() {
  return (
    <>
      <PageHead index="02" label="External asset manager" lines={[M.h1[0], <span key="m" className="serif text-accent" style={{ fontSize: "0.86em" }}>Management</span>]}>
        <p className="text-[22px] leading-[1.4] md:text-[26px] lg:col-span-6">{M.lead}</p>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-ink/75">{M.more}</p>
          <div className="mt-5"><Btn href="/information-and-papers/" solid>Know more</Btn></div>
        </div>
      </PageHead>

      <Parallax src="skyline-dusk" alt="Dubai's skyline at dusk across the creek" className="h-[60vh] md:h-[86vh]" eager />

      <section className="py-28 md:py-40">
        <div className="wrap">
          <ScrollWords text={M.since} accent={["since", "2020"]} className="display text-[clamp(40px,6.8vw,112px)]" />
        </div>
      </section>

      <InView as="section" className="border-t border-line py-24 md:py-36">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Lines lines={M.approachTitle} className="display text-[clamp(44px,5.4vw,88px)] lg:col-span-6" />
          <div className="space-y-6 text-[19px] text-ink/85 lg:col-span-5 lg:col-start-8">
            {M.approach.map((p, i) => <p key={i} className="rise" style={{ ["--i" as string]: i + 2 }}>{p}</p>)}
          </div>
        </div>
      </InView>

      {/* The three beliefs stack over one another as the page scrolls */}
      <section className="border-t border-line pt-24 pb-10 md:pt-36">
        <div className="wrap">
          <InView className="grid gap-8 lg:grid-cols-12">
            <p className="label rise text-accent lg:col-span-4">{M.beliefsIntro}</p>
            <p className="serif rise text-[28px] leading-[1.2] md:text-[38px] lg:col-span-8" style={{ ["--i" as string]: 1 }}>{M.patient}</p>
          </InView>
          <div className="mt-16 md:mt-24">
            {M.beliefs.map((b, i) => (
              <article key={i} className="sticky mb-6 flex min-h-[56vh] flex-col justify-between border border-line p-7 md:p-12" style={{ top: `${120 + i * 28}px`, background: i === 2 ? "#ff5a2c" : i === 1 ? "#1c1c1c" : "#141414", color: i === 2 ? "#0a0a0a" : undefined }}>
                <p className="label flex justify-between"><span>Belief</span><span>0{i + 1} / 03</span></p>
                <div>
                  <h2 className="display max-w-[16ch] text-[clamp(44px,7vw,116px)]">{b.t}</h2>
                  <p className="mt-6 max-w-[52ch] text-[19px] opacity-85">{b.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InView as="section" className="py-24 md:py-36">
        <div className="wrap"><p className="serif rise max-w-[24ch] text-[36px] leading-[1.12] md:text-[64px]">{M.focus}</p></div>
      </InView>
    </>
  );
}
