import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import MediaSlot from "@/components/MediaSlot";
import ContactForm from "@/components/system/ContactForm";
import Cursor from "@/components/system/Cursor";
import Grain from "@/components/system/Grain";
import SubNav from "@/components/system/SubNav";
import { CONTACT_COPY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — NOIR",
  description: "Private enquiries, press, and stockist requests.",
};

export default function Contact() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(120% 85% at 50% 18%, #17161c 0%, #0e0d13 34%, #08080b 66%, #050505 100%)",
      }}
    >
      <Grain />
      <Cursor />
      <SubNav active="contact" />

      <div className="relative z-[2] mx-auto max-w-5xl px-6 pb-32 pt-10">
        <section className="grid gap-14 pt-10 md:grid-cols-[1.1fr_0.9fr] md:items-start md:gap-20 md:pt-20">
          <div>
            <Reveal>
              <p className="eyebrow mb-8">{CONTACT_COPY.eyebrow}</p>
              <p
                className="display text-ivory"
                style={{ fontSize: "clamp(2.2rem, 5.6vw, 4.4rem)", maxWidth: "14ch" }}
                data-text
              >
                {CONTACT_COPY.line}
              </p>
              <p className="lede mt-8 max-w-md">{CONTACT_COPY.sub}</p>
              <p className="mt-6 text-sm" style={{ color: "var(--smoke)" }}>
                {CONTACT_COPY.cadence}
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-16">
              <ContactForm variant="enquiry" subject="New enquiry — NOIR" />
            </Reveal>
          </div>

          <Reveal delay={80}>
            <MediaSlot
              src="/media/contact-atelier.webp"
              label="The atelier, at rest"
              caption="Grasse, after hours"
              ratio="4 / 5"
            />
          </Reveal>
        </section>

        <footer
          className="mt-32 flex flex-col gap-2 border-t pt-8 text-[0.6rem] uppercase sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: "rgba(227,196,137,0.2)",
            letterSpacing: "0.3em",
            color: "var(--smoke)",
          }}
        >
          <span>NOIR — Grasse · Paris</span>
          <span>Private enquiries by invitation</span>
        </footer>
      </div>
    </main>
  );
}
