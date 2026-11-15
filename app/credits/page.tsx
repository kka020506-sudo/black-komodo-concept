import { PageHead } from "@/components/ui";
import credits from "@/lib/credits.json";

export const metadata = { title: "Photograph credits" };

export default function Page() {
  return (
    <>
      <PageHead index="—" label="Stand-in photographs from Wikimedia Commons" lines={["Photo", "credits"]} />
      <ul className="wrap mb-24 border-t border-line">
        {credits.map((c) => (
          <li key={c.file} className="flex flex-wrap justify-between gap-x-8 gap-y-1 border-b border-line py-4">
            <a className="ulink" href={c.page} rel="noreferrer">{c.file}</a>
            <span className="text-muted">{c.by} · {c.licence}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
