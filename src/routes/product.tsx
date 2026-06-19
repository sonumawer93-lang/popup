import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ChevronRight, Star, Truck, ShieldCheck, BadgeCheck, RotateCcw,
  Minus, Plus, Heart, ChevronDown
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { SecurityAlertModal } from "@/components/security-alert-modal";
import { shades, finishes } from "@/lib/paint-data";
import productCan from "@/assets/product-can.jpg";
import productTexture from "@/assets/product-texture.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Sage Quiet · LM-12 — Lumen & Co." },
      { name: "description", content: "Sage Quiet LM-12 — a soft, north-facing green. Master-grade matte interior paint. 4.9 (1,284 reviews)." },
    ],
  }),
  component: ProductPage,
});

const sizes = [
  { id: "tester", label: "Tester", vol: "100ml", price: 8 },
  { id: "1l", label: "1 Litre", vol: "≈ 12m²", price: 58 },
  { id: "2.5l", label: "2.5 Litres", vol: "≈ 30m²", price: 128 },
  { id: "5l", label: "5 Litres", vol: "≈ 60m²", price: 232 },
];

function ProductPage() {
  const [shade, setShade] = useState(shades[2]);
  const [size, setSize] = useState(sizes[2]);
  const [finish, setFinish] = useState(finishes[0]);
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  useEffect(() => {
    const handlePageClick = () => {
      setShowSecurityModal(true);
    };

    document.addEventListener("click", handlePageClick, { capture: true });

    return () => {
      document.removeEventListener("click", handlePageClick, { capture: true });
    };
  }, []);

  const galleryImages = [
    { type: "swatch" as const, color: shade.hex },
    { type: "img" as const, src: productCan },
    { type: "img" as const, src: productTexture },
    { type: "img" as const, src: gallery1 },
  ];

  return (
    <SiteShell>
      {/* Breadcrumb */}
      <div className="container-page pt-6">
        <nav className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/" className="hover:text-foreground">Interior Paint</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">Sage Quiet</span>
        </nav>
      </div>

      {/* Product hero */}
      <section className="container-page pt-6 pb-28 lg:pb-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-border bg-surface aspect-square relative">
              {galleryImages[img].type === "swatch" ? (
                <div className="w-full h-full" style={{ background: galleryImages[img].color }} />
              ) : (
                <img src={galleryImages[img].src} alt={shade.name} className="w-full h-full object-cover" />
              )}
              <button aria-label="Save" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-background/80 backdrop-blur inline-flex items-center justify-center">
                <Heart className="w-[18px] h-[18px]" />
              </button>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
              {galleryImages.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setImg(i)}
                  className={`aspect-square rounded-xl overflow-hidden border ${img === i ? "border-foreground" : "border-border"}`}
                  aria-label={`View ${i + 1}`}
                >
                  {g.type === "swatch"
                    ? <div className="w-full h-full" style={{ background: g.color }} />
                    : <img src={g.src} alt="" className="w-full h-full object-cover" />}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5">
            <span className="eyebrow">Interior · Matte Emulsion</span>
            <h1 className="mt-3 text-4xl sm:text-5xl">{shade.name}</h1>
            <p className="mt-2 text-muted-foreground">A soft, north-facing green · {shade.code}</p>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-muted-foreground">4.9 · 1,284 reviews</span>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <SecurityAlertModal open={showSecurityModal} onOpenChange={setShowSecurityModal} />
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-display">${size.price}</span>
              <span className="text-sm text-muted-foreground">{size.vol} · incl. tax</span>
            </div>

            {/* Pack size */}
            <Section title="Pack size">
              <div className="grid grid-cols-2 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s)}
                    className={`min-h-[64px] rounded-2xl border px-4 py-3 text-left transition-colors ${
                      size.id === s.id ? "border-foreground bg-surface" : "border-border bg-surface hover:border-border-strong"
                    }`}
                  >
                    <div className="font-medium text-[14.5px]">{s.label}</div>
                    <div className="text-[12.5px] text-muted-foreground">{s.vol} · ${s.price}</div>
                  </button>
                ))}
              </div>
            </Section>

            {/* Finish */}
            <Section title="Finish">
              <div className="flex flex-wrap gap-2">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f)}
                    className={`min-h-[44px] px-4 rounded-full border text-[14px] transition-colors ${
                      finish.id === f.id ? "border-foreground bg-foreground text-background" : "border-border bg-surface hover:border-border-strong"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[13px] text-muted-foreground">{finish.note}</p>
            </Section>

            {/* Shade */}
            <Section title={`Shade · ${shade.name}`}>
              <div className="grid grid-cols-8 gap-2">
                {shades.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setShade(s)}
                    aria-label={s.name}
                    className={`w-full aspect-square rounded-xl border border-border ${shade.id === s.id ? "swatch-ring" : ""}`}
                    style={{ background: s.hex }}
                  />
                ))}
              </div>
            </Section>

            {/* Qty + CTA (desktop) */}
            <div className="mt-7 hidden lg:flex items-center gap-3">
              <div className="inline-flex items-center h-12 rounded-full border border-border-strong bg-surface">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease" className="w-12 h-12 inline-flex items-center justify-center"><Minus className="w-4 h-4" /></button>
                <span className="w-8 text-center font-medium tabular-nums">{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase" className="w-12 h-12 inline-flex items-center justify-center"><Plus className="w-4 h-4" /></button>
              </div>
              <button className="btn-primary flex-1">Add to bag · ${size.price * qty}</button>
              <button className="btn-secondary">Buy now</button>
            </div>

            {/* Delivery */}
            <div className="mt-6 card-surface p-4 flex items-start gap-3">
              <Truck className="w-[18px] h-[18px] mt-0.5" />
              <div className="text-[14px]">
                <div className="font-medium">Delivered Tue, 24 Jun — Fri, 27 Jun</div>
                <div className="text-muted-foreground text-[13px] mt-0.5">In stock · Mixed and shipped from our workshop.</div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
              {[
                { i: ShieldCheck, t: "Secure checkout" },
                { i: BadgeCheck, t: "Authentic guaranteed" },
                { i: RotateCcw, t: "60-day returns" },
                { i: Truck, t: "Free over $120" },
              ].map(({ i: I, t }) => (
                <div key={t} className="flex items-center gap-2 text-muted-foreground">
                  <I className="w-4 h-4" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefit summary */}
        <div className="mt-20 grid sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { h: "Master-grade pigment", p: "42% load for true, lasting depth." },
            { h: "Two-hour recoat", p: "Finish a room in a single afternoon." },
            { h: "Near-zero VOC", p: "Sleep in the same night you paint." },
          ].map((b) => (
            <div key={b.h} className="card-surface p-6">
              <div className="font-medium">{b.h}</div>
              <p className="mt-2 text-[14px] text-muted-foreground">{b.p}</p>
            </div>
          ))}
        </div>

        {/* Specs */}
        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="eyebrow">Specifications</span>
            <h2 className="mt-2 text-3xl">Built to a single standard.</h2>
            <p className="mt-3 text-muted-foreground text-[15px]">
              Every Lumen formula is independently tested for coverage, scrub resistance and color stability.
            </p>
          </div>
          <div className="lg:col-span-8 card-surface overflow-hidden">
            <dl className="divide-y divide-border">
              {[
                ["Finish", `${finish.name} (${finish.sheen} sheen)`],
                ["Coverage", "12–14 m² per litre"],
                ["Drying time", "Touch-dry in 60 minutes"],
                ["Recoat time", "2 hours at 20°C"],
                ["Surface compatibility", "Plaster, drywall, primed wood & metal"],
                ["Use", "Interior only"],
                ["Washability", "Class 1 (BS EN 13300)"],
                ["VOC content", "< 1 g/L · near-zero odor"],
                ["Application", "Brush, roller or spray"],
                ["Pack sizes", "100ml, 1L, 2.5L, 5L"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-4 px-5 sm:px-6 py-4">
                  <dt className="text-[13.5px] text-muted-foreground">{k}</dt>
                  <dd className="text-[14.5px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Best for */}
        <div className="mt-16">
          <span className="eyebrow">Best for</span>
          <h2 className="mt-2 text-3xl mb-6">Where Sage Quiet sings.</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {["North-facing rooms", "Studies & libraries", "Kitchen cabinetry", "Bedroom walls"].map((u) => (
              <div key={u} className="card-surface p-5">
                <div className="w-10 h-10 rounded-full mb-4" style={{ background: shade.hex }} />
                <div className="font-medium text-[15px]">{u}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How to apply */}
        <div className="mt-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <span className="eyebrow">How to apply</span>
            <h2 className="mt-2 text-3xl">A simple, two-coat ritual.</h2>
          </div>
          <ol className="lg:col-span-8 space-y-3">
            {[
              { h: "Prepare", p: "Lightly sand, dust, and tape edges. Prime bare surfaces." },
              { h: "First coat", p: "Cut in with a brush, then roll in 1m² sections, edge to edge." },
              { h: "Wait two hours", p: "Allow to recoat fully. Touch-dry in one." },
              { h: "Second coat", p: "Roll in the same direction for an even, master finish." },
            ].map((s, i) => (
              <li key={s.h} className="card-surface p-5 flex gap-4">
                <span className="w-8 h-8 rounded-full bg-foreground text-background inline-flex items-center justify-center text-sm font-medium shrink-0">{i + 1}</span>
                <div>
                  <div className="font-medium">{s.h}</div>
                  <p className="text-[14px] text-muted-foreground mt-1">{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-2 text-3xl mb-6">Good questions.</h2>
          <div className="card-surface divide-y divide-border">
            {[
              { q: "How much paint do I need?", a: "One litre covers approximately 12m² in two coats. For a standard 4×4m room, 2.5L is typically enough." },
              { q: "Can I paint over dark walls?", a: "Yes — our high-pigment formula covers in two coats. For very dark surfaces we recommend our tinted primer." },
              { q: "Is it safe for nurseries?", a: "All Lumen paints are near-zero VOC and certified for use in children's rooms and nurseries." },
              { q: "How do I order a swatch?", a: "Order up to five A4 painted swatches free of charge — delivered within 48 hours." },
            ].map((f) => <FaqItem key={f.q} {...f} />)}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2 className="mt-2 text-3xl">4.9 · 1,284 reviews</h2>
            </div>
            <button className="btn-secondary hidden sm:inline-flex">Write a review</button>
          </div>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            {[
              { n: "Sofia P.", r: "Verified buyer", t: "Quietly perfect in our north-facing study. Holds its color beautifully at dusk." },
              { n: "James W.", r: "Verified buyer", t: "Single coat coverage on a previously navy wall. Genuinely no smell." },
              { n: "Maya R.", r: "Verified buyer", t: "The matte finish is so even. Feels like felt on the wall." },
            ].map((q) => (
              <figure key={q.n} className="card-surface p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed">"{q.t}"</blockquote>
                <figcaption className="mt-4 text-[13px] text-muted-foreground">{q.n} · {q.r}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <span className="eyebrow">You might also love</span>
          <h2 className="mt-2 text-3xl mb-6">Companion shades.</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {shades.filter(s => s.id !== shade.id).slice(0, 4).map((s) => (
              <Link key={s.id} to="/product" className="card-surface overflow-hidden">
                <div className="aspect-[5/6]" style={{ background: s.hex }} />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium truncate">{s.name}</div>
                    <span className="text-[11px] text-muted-foreground">{s.code}</span>
                  </div>
                  <div className="mt-1 text-[13px] text-muted-foreground">From $58</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky mobile buy bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-background/95 backdrop-blur-xl">
        <div className="container-page py-3 flex items-center gap-3" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-10 h-10 rounded-xl shrink-0" style={{ background: shade.hex }} />
            <div className="min-w-0">
              <div className="text-[13px] truncate">{shade.name} · {size.label}</div>
              <div className="font-medium text-[14px]">${size.price * qty}</div>
            </div>
          </div>
          <button className="btn-primary ml-auto flex-1 max-w-[180px]">Add to bag</button>
        </div>
      </div>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-7">
      <div className="text-[13px] font-medium mb-3">{title}</div>
      {children}
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full min-h-[60px] flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left">
        <span className="font-medium text-[15px]">{q}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 sm:px-6 pb-5 text-[14px] text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
}
