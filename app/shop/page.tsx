import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/system/ContactForm";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";
import SubNav from "@/components/system/SubNav";
import { SHOP_COPY } from "@/lib/site";
import { FRAGRANCES } from "@/lib/chapters";

export const metadata: Metadata = {
  title: "Shop — NOIR",
  description: "The collection is not yet for sale.",
};

/**
 * The commerce placeholder. Deliberately NOT a product grid — this page's
 * only job is to hold the URL and the intent ("shop is a real destination,
 * coming") until a real commerce stack sits behind it. No cart, no prices,
 * no add-to-bag. Just the collection named, and a way to be told first.
 */
export default function Shop() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(120% 85% at 50% 30%, #17161c 0%, #0e0d13 34%, #08080b 66%, #050505 100%)",
      }}
    >
      <Grain />
      <Cursor />
      <SubNav active="shop" />

      <div className="relative z-[2] mx-auto flex min-h-[86svh] max-w-3xl flex-col justify-center px-6 py-16 text-center">
        <Reveal>
          <p className="eyebrow mb-8">{SHOP_COPY.eyebrow}</p>
          <p
            className="display text-ivory"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4.6rem)" }}
            data-text
          >
            {SHOP_COPY.line}
          </p>
          <p className="lede mx-auto mt-8 max-w-md">{SHOP_COPY.sub}</p>
        </Reveal>

        <Reveal delay={140} className="mt-14">
          <ContactForm variant="waitlist" subject="NOIR — Shop waitlist" />
        </Reveal>

        <Reveal delay={220} className="mt-20">
          <p className="eyebrow mb-6">In the meantime</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {FRAGRANCES.map((f) => (
              <Link
                key={f.slug}
                href={`/work/${f.slug}`}
                data-hover
                className="text-sm"
                style={{ color: "var(--ivory-dim)" }}
              >
                {f.name}
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
