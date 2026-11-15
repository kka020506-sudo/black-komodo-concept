import { Counter, InView, Lines, Parallax } from "@/components/motion";
import { PageHead } from "@/components/ui";
import { sustainability as S } from "@/lib/site";

export const metadata = { title: "Komodo Sustainability" };

export default function Page() {
  return (
    <>
      <PageHead index="06" label={S.title} lines={[S.h1[0], <span key="s" className="serif text-accent" style={{ fontSize: "0.86em" }}>{S.h1[1]}</span>]}>
        <p className="text-[22px] leading-[1.4] md:text-[26px] lg:col-span-6">{S.body[0]}</p>
        <p className="text-ink/80 lg:col-span-4 lg:col-start-9">{S.body[1]}</p>
      </PageHead>

      <InView as="section" className="border-t border-line py-20 md:py-28">
        <div className="wrap flex flex-wrap items-end justify-between gap-6">
          <p className="display text-[clamp(72px,17vw,280px)] text-accent"><Counter to={300000} /></p>
          <p className="label rise max-w-[26ch] pb-4 text-ink">Bees sponsored and protected a year, globally</p>
        </div>
      </InView>

      <section>
        <div className="wrap"><p className="label border-t border-line pt-6 text-muted">{S.projectsTitle}</p></div>
        {S.projects.map((p, i) => (
          <InView as="article" key={i} className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-12 lg:items-end">
            <div className={`wipe lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`}>
              <Parallax src={p.img} alt={p.alt} bw={false} className="aspect-[4/3]" amount={6} />
            </div>
            <div className={`lg:col-span-4 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9"}`}>
              <p className="label rise text-accent">0{i + 1}</p>
              <Lines lines={[p.t]} className="display mt-4 text-[clamp(40px,4.4vw,72px)]" delay={150} />
              <p className="rise mt-6 text-[19px] text-ink/85" style={{ ["--d" as string]: "400ms" }}>{p.d}</p>
            </div>
          </InView>
        ))}
      </section>
    </>
  );
}
