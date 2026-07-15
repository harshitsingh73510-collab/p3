import Reveal from "@/components/Reveal";

/** A quiet chapter marker — number + title, letterspaced, museum-plate small. */
export default function ChapterMark({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <Reveal className="mb-14 flex items-center gap-5">
      <span className="eyebrow">{index}</span>
      <span className="hairline h-8" />
      <span className="eyebrow" style={{ color: "var(--ivory-dim)" }}>
        {title}
      </span>
    </Reveal>
  );
}
