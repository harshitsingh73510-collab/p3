/**
 * Copy for the pages that sit AROUND the film — /about and /contact.
 * Kept separate from lib/chapters.ts, which is strictly the film's own
 * content. Same rule applies here as everywhere else in NOIR: specific
 * beats generic, a number beats an adjective, restraint beats a pitch.
 */

export const FOUNDER = {
  name: "Anouk Verrier",
  role: "Founder & Nose",
  bio: [
    "Eleven years composing for other houses before she composed for no one else.",
    "She keeps three rules in the atelier and breaks the fourth constantly: never explain a fragrance in more words than it took to make it.",
  ],
};

export const ATELIER = {
  location: "Grasse, two streets back from the old perfumery quarter",
  detail:
    "A stone ground floor, windows painted shut against the sun, held at 18°C year-round so nothing in the room ages faster than it should.",
  founded: "2014",
};

export const SOURCING = [
  { material: "Rose de Mai", origin: "Grasse", note: "Picked before the heat, by hand, at dawn." },
  { material: "Bourbon Vanilla", origin: "Madagascar", note: "Cured for eight months until it turns to dusk." },
  { material: "Mysore Sandalwood", origin: "Karnataka", note: "Aged wood, bought only from growers we have used for over a decade." },
  { material: "Oud", origin: "Assam", note: "Rested four years before it is touched." },
];

export const ABOUT_PHILOSOPHY = [
  "We do not photograph what we make. A bottle can be lit; a memory cannot.",
  "Scent is architecture built from memory.",
  "The rarest things are never loud.",
];

export const CONTACT_COPY = {
  eyebrow: "Contact",
  line: "Write to us. We read every word.",
  sub: "Private enquiries, press, and stockist requests all reach the same small room in Grasse — there is no call centre to route you through.",
  cadence: "We reply within three working days, in the order enquiries arrive.",
};

export const SHOP_COPY = {
  eyebrow: "The Collection",
  line: "Not yet for sale. Soon, by invitation.",
  sub: "NOIR is not sold on shelves and, for now, not sold online either. When the collection opens, the people on this list will know first — before it is announced anywhere else.",
};

/** the one specific, real-sounding trust signal — not elaborate, just true-feeling */
export const TRUST_NOTE =
  "Every batch is assayed by hand before release and given a number, not a barcode. This one is NOIR-0119.";
