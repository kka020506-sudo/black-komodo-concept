import { InView, Parallax } from "@/components/motion";
import { Btn, PageHead } from "@/components/ui";
import { research as R } from "@/lib/site";

export const metadata = { title: "Specialist Research Service" };

export default function Page() {
  return (
    <>
      <PageHead index="05" label={R.offerTitle.replace(":", "")} lines={[R.h1[0], <span key="r" className="serif text-accent" style={{ fontSize: "0.86em" }}>{R.h1[1]}</span>]}>
        <p className="text-[22px] leading-[1.4] md:text-[26px] lg:col-span-7">{R.lead}</p>
      </PageHead>

      <Parallax src="research-room" alt="Readers at long tables in a large research library" className="h-[56vh] md:h-[80vh]" eager />

      <InView as="section" className="py-24 md:py-36" margin="-5% 0px">
        <ol className="wrap grid border-t border-line md:grid-cols-2">
          {R.items.map((it, i) => (
            <li key={i} className={`rise group flex gap-6 border-b border-line py-7 md:py-9 ${i % 2 === 0 ? "md:pe-10" : "md:border-s md:ps-10"}`} style={{ ["--i" as string]: i }}>
              <span className="display text-[44px] leading-[0.85] text-ink/20 transition-colors duration-300 group-hover:text-accent md:text-[64px]">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[20px] leading-[1.35] md:text-[22px]">{it}</span>
            </li>
          ))}
        </ol>
      </InView>

      <InView as="section" className="border-t border-line py-24 md:py-36">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="serif rise text-[30px] leading-[1.18] md:text-[46px] lg:col-span-8">{R.closing}</p>
          <div className="rise lg:col-span-3 lg:col-start-10" style={{ ["--i" as string]: 2 }}>
            <p className="text-ink/75">{R.access}</p>
            <div className="mt-5"><Btn href="/contact/" solid>{R.cta}</Btn></div>
          </div>
        </div>
      </InView>
    </>
  );
}
