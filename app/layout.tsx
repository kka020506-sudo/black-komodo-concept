import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: { default: "Black Komodo Investments: disciplined capital, adaptive intelligence (redesign concept)", template: "%s | Black Komodo Investments (concept)" },
  description: "Unofficial redesign concept for Black Komodo Investments: long-term investment management and specialist research from Dubai.",
  robots: { index: false, follow: false },
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg` },
};
export const viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="fixed inset-x-0 top-0 z-50 flex h-[32px] items-center bg-ink text-[#0a0a0a]">
          <p className="wrap text-[12px] font-medium">
            <span className="md:hidden">Unofficial redesign concept</span>
            <span className="hidden md:inline">Unofficial redesign concept. Not published by or affiliated with Black Komodo Investments.</span>
          </p>
        </div>
        <Nav />
        {children}
      </body>
    </html>
  );
}
