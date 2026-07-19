import Link from "next/link";

/**
 * The lightest possible cross-page wayfinding. Used ONLY on /about, /contact,
 * /shop and /work/[slug] — never on / (the film has no navigation bar by
 * design, and nothing here should touch it). A wordmark home-link on the
 * left, three mono words on the right. Floating text, no bar, no background —
 * the same restraint as Chrome's wordmark on the homepage.
 */
export default function SubNav({ active }: { active?: "shop" | "about" | "contact" }) {
  const links: { href: string; label: string; key: "shop" | "about" | "contact" }[] = [
    { href: "/shop", label: "Shop", key: "shop" },
    { href: "/about", label: "About", key: "about" },
    { href: "/contact", label: "Contact", key: "contact" },
  ];

  return (
    <nav
      aria-label="Site"
      className="relative z-[20] flex items-center justify-between px-6 pt-8 md:px-12 md:pt-10"
    >
      <Link
        href="/"
        data-hover
        className="text-sm"
        style={{ letterSpacing: "0.5em", color: "var(--ivory)" }}
      >
        NOIR
      </Link>
      <div className="flex items-center gap-8">
        {links.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            data-hover
            aria-current={active === l.key ? "page" : undefined}
            className="text-[0.6rem] uppercase"
            style={{
              letterSpacing: "0.36em",
              color: active === l.key ? "var(--champagne)" : "var(--smoke)",
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
