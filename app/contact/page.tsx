import ContactForm from "@/components/ContactForm";
import { PageHead } from "@/components/ui";
import { contact as K, footer } from "@/lib/site";

export const metadata = { title: "Contact" };

export default function Page() {
  return (
    <>
      <PageHead index="07" label="Contact" lines={[K.h1[0], <span key="u" className="serif text-accent" style={{ fontSize: "0.86em" }}>{K.h1[1]}</span>]}>
        <p className="text-[22px] leading-[1.4] md:text-[26px] lg:col-span-7">{K.lead}</p>
      </PageHead>
      <section className="border-t border-line py-16 md:py-24">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <aside className="space-y-10 lg:col-span-4">
            <div>
              <p className="label text-muted">Email</p>
              <p className="mt-3 break-all text-[22px]">{K.email}</p>
            </div>
            <div>
              <p className="label text-muted">Office</p>
              <p className="serif mt-3 text-[30px] leading-[1.15]">{footer.address}</p>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6"><ContactForm /></div>
        </div>
      </section>
    </>
  );
}
