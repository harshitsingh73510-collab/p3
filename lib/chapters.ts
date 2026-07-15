/**
 * The film's chapters. Content lives here so pacing/copy is editable in one
 * place. This is a gallery, not a catalogue — every line is meant to be quotable.
 */

export type Fragrance = {
  slug: string;
  index: string;
  name: string;
  memory: string; // the emotional environment, not the product
  note: string; // one whispered descriptor
  atmosphere: "rain" | "forest" | "fire" | "dusk";
  words: [string, string, string]; // three olfactory movements
  image: string; // the environment itself — never the product
};

export const FRAGRANCES: Fragrance[] = [
  {
    slug: "rain",
    index: "I",
    name: "Pluie",
    memory: "The first minute of rain on warm stone.",
    note: "Petrichor, cold iron, crushed violet leaf.",
    atmosphere: "rain",
    words: ["Wet slate", "Ozone", "Green shadow"],
    image: "/media/atmosphere-rain.webp",
  },
  {
    slug: "forest",
    index: "II",
    name: "Sillage Vert",
    memory: "Light falling through a canopy at ten in the morning.",
    note: "Cedar sap, dry moss, sun on bark.",
    atmosphere: "forest",
    words: ["Resin", "Moss", "Warm dust"],
    image: "/media/atmosphere-forest.webp",
  },
  {
    slug: "fire",
    index: "III",
    name: "Braise",
    memory: "The last hour of a fire, when only embers remain.",
    note: "Smoked amber, oud, a thread of leather.",
    atmosphere: "fire",
    words: ["Ember", "Oud", "Skin"],
    image: "/media/atmosphere-fire.webp",
  },
];

export type Ingredient = {
  name: string;
  origin: string;
  line: string;
};

export const INGREDIENTS: Ingredient[] = [
  { name: "Rose de Mai", origin: "Grasse", line: "Picked before the heat, by hand, at dawn." },
  { name: "Bourbon Vanilla", origin: "Madagascar", line: "Cured for eight months until it turns to dusk." },
  { name: "Mysore Sandalwood", origin: "Karnataka", line: "Aged wood. Patience made into warmth." },
  { name: "Grey Amber", origin: "The tide line", line: "Given by the sea, never taken." },
  { name: "Oud", origin: "Assam", line: "The scar a tree makes to survive. We keep the scar." },
];

export type Quote = { line: string; sub?: string };

export const BELIEF: Quote[] = [
  { line: "Scent is architecture built from memory." },
  { line: "Luxury is invisible." },
  { line: "The rarest things are never loud." },
];
