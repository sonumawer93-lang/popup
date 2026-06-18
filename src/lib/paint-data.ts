export type Shade = {
  id: string;
  name: string;
  code: string;
  hex: string;
  family: "neutral" | "green" | "blue" | "earth" | "warm" | "deep";
};

export const shades: Shade[] = [
  { id: "linen-veil", name: "Linen Veil", code: "LM-01", hex: "#EFE9DC", family: "neutral" },
  { id: "morning-mist", name: "Morning Mist", code: "LM-04", hex: "#D9D7CE", family: "neutral" },
  { id: "sage-quiet", name: "Sage Quiet", code: "LM-12", hex: "#A8B49A", family: "green" },
  { id: "olive-grove", name: "Olive Grove", code: "LM-14", hex: "#6B7253", family: "green" },
  { id: "harbor-blue", name: "Harbor Blue", code: "LM-21", hex: "#4F6A78", family: "blue" },
  { id: "terra-clay", name: "Terra Clay", code: "LM-31", hex: "#B5704F", family: "earth" },
  { id: "warm-ochre", name: "Warm Ochre", code: "LM-33", hex: "#C49A5A", family: "warm" },
  { id: "ink-charcoal", name: "Ink Charcoal", code: "LM-90", hex: "#2C2C2E", family: "deep" },
];

export const categories = [
  { id: "interior", name: "Interior Paint", desc: "Walls & ceilings", count: 86 },
  { id: "exterior", name: "Exterior Paint", desc: "Weather-resistant", count: 42 },
  { id: "primers", name: "Primers", desc: "Surface preparation", count: 18 },
  { id: "waterproof", name: "Waterproof Coatings", desc: "Sealants & barriers", count: 14 },
  { id: "wood", name: "Wood Finishes", desc: "Stains & varnishes", count: 24 },
];

export const finishes = [
  { id: "matte", name: "Matte", sheen: "2–5%", note: "Soft, contemporary. Hides imperfections." },
  { id: "eggshell", name: "Eggshell", sheen: "10–15%", note: "Subtle warmth. Living spaces." },
  { id: "satin", name: "Satin", sheen: "20–35%", note: "Gentle glow. Kitchens & halls." },
  { id: "gloss", name: "Gloss", sheen: "70–85%", note: "High shine. Trim & doors." },
];
