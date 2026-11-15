import { Closing, Footer } from "@/components/ui";

/* Re-mounts on every navigation, so each page fades up into place. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <main id="main">{children}</main>
      <Closing />
      <Footer />
    </div>
  );
}
