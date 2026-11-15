import PapersList from "@/components/PapersList";
import { PageHead } from "@/components/ui";

export const metadata = { title: "Information and Papers" };

export default function Page() {
  return (
    <>
      <PageHead index="03" label="Latest documents and research papers" lines={["Information", <span key="p">and <span className="serif text-accent" style={{ fontSize: "0.86em" }}>papers</span></span>]} />
      <PapersList />
      <div className="h-24" />
    </>
  );
}
