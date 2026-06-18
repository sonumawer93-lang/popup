import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Truck, ShieldCheck, BadgeCheck, RotateCcw, Star } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { shades, categories, finishes } from "@/lib/paint-data";
import heroRoom from "@/assets/hero-room.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen & Co. — Premium Architectural Paint" },
      { name: "description", content: "Considered color, crafted in small batches. Premium interior and exterior paint with master-grade finishes." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="container-page pt-8 sm:pt-14 pb-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-6 fade-up">
            <span className="eyebrow">New · Spring Collection 2026</span>
            <h1 className="mt-4 text-[44px] leading-[1.02] sm:text-6xl lg:text-[76px] lg:leading-[0.96]">
              Color, considered.
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted-foreground">
              Premium architectural paint, mixed in small batches and matched to the
              light of real rooms. Built to live with for years, not seasons.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/product" className="btn-primary">
                Shop Colors <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/product" className="btn-secondary">Order free swatches</Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-1">
                {shades.slice(0,5).map(s => (
                  <span key={s.id} className="w-6 h-6 rounded-full border-2 border-background" style={{ background: s.hex }} />
                ))}
              </div>
              <span>248 colors. One uncompromising standard.</span>
            </div>
          </div>

          <div className="lg:col-span-6 fade-up">
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-card">
              <img src={heroRoom} alt="Sunlit living room painted in warm terracotta" width={1600} height={1200} className="w-full h-[420px] sm:h-[520px] lg:h-[620px] object-cover" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto card-surface px-4 py-3 sm:px-5 sm:py-4 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full shrink-0" style={{ background: "#B5704F" }} />
                <div className="min-w-0">
                  <div className="text-[13px] text-muted-foreground">Featured</div>
                  <div className="font-medium truncate">Terra Clay · LM-31 · Matte</div>
                </div>
                <Link to="/product" aria-label="View" className="ml-auto w-10 h-10 rounded-full bg-foreground text-background inline-flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page pt-14 pb-6">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <span className="eyebrow">Shop by category</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">For every surface.</h2>
          </div>
          <Link to="/product" className="hidden sm:inline-flex btn-ghost">All categories <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((c, i) => (
            <Link key={c.id} to="/product" className="group card-surface p-5 hover:shadow-card transition-shadow">
              <div className="h-20 sm:h-24 rounded-xl mb-4" style={{ background: ["#A8B49A","#4F6A78","#EFE9DC","#B5704F","#6B7253"][i] }} />
              <div className="font-medium">{c.name}</div>
              <div className="text-[13px] text-muted-foreground mt-0.5">{c.desc}</div>
              <div className="mt-3 text-[12px] text-muted-foreground">{c.count} products</div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST-SELLING COLORS */}
      <section className="container-page pt-16">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <span className="eyebrow">Best-sellers</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">Colors loved most.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {shades.map((s) => (
            <Link key={s.id} to="/product" className="group card-surface overflow-hidden">
              <div className="aspect-[5/6] w-full" style={{ background: s.hex }} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">{s.name}</div>
                  <span className="text-[11px] text-muted-foreground">{s.code}</span>
                </div>
                <div className="mt-1 text-[13px] text-muted-foreground">From $58 · 1L</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="container-page pt-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <span className="eyebrow">Why Lumen</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">A paint you can live with.</h2>
            <p className="mt-4 text-muted-foreground max-w-sm">
              Every formula is developed with master decorators and tested in
              real rooms — not just on color cards.
            </p>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { h: "Master-grade pigment", p: "Up to 42% pigment load for depth that doesn't fade." },
              { h: "True one-coat coverage", p: "Engineered to recoat in 2 hours — no patchiness." },
              { h: "Near-zero VOC", p: "Low-odor, child-safe formulation. Sleep in the same night." },
              { h: "Washable finish", p: "Class 1 scrub rating across matte, satin and gloss." },
            ].map((b) => (
              <div key={b.h} className="card-surface p-6">
                <div className="font-medium">{b.h}</div>
                <p className="mt-2 text-[14.5px] text-muted-foreground leading-relaxed">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="container-page pt-16">
        <div className="card-surface p-5 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: Truck, h: "Free delivery", p: "On orders over $120" },
            { i: ShieldCheck, h: "Secure checkout", p: "PCI-DSS encrypted" },
            { i: BadgeCheck, h: "Authentic guaranteed", p: "Mixed at our workshop" },
            { i: RotateCcw, h: "60-day returns", p: "On unopened cans" },
          ].map(({ i: Icon, h, p }) => (
            <div key={h} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-2 inline-flex items-center justify-center shrink-0">
                <Icon className="w-[18px] h-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-[14.5px]">{h}</div>
                <div className="text-[13px] text-muted-foreground">{p}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINISH COMPARISON */}
      <section className="container-page pt-20">
        <div className="mb-6">
          <span className="eyebrow">Finishes</span>
          <h2 className="mt-2 text-3xl sm:text-4xl">Find your light.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {finishes.map((f, i) => (
            <div key={f.id} className="card-surface overflow-hidden">
              <div className="aspect-[4/3] relative" style={{ background: "#A8B49A" }}>
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,${0.05 + i * 0.12}) 0%, rgba(255,255,255,0) 60%)`,
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{f.name}</div>
                  <span className="chip">{f.sheen}</span>
                </div>
                <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">{f.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSPIRATION */}
      <section className="container-page pt-20">
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            <span className="eyebrow">Inspiration</span>
            <h2 className="mt-2 text-3xl sm:text-4xl">Painted in real homes.</h2>
          </div>
          <Link to="/product" className="btn-ghost">View gallery <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[
            { src: gallery1, name: "Ink Charcoal", code: "LM-90" },
            { src: gallery2, name: "Terra Clay", code: "LM-31" },
            { src: gallery3, name: "Linen Veil", code: "LM-01" },
          ].map((g, i) => (
            <figure key={i} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}>
              <img src={g.src} alt={g.name} loading="lazy" width={1000} height={1200} className="w-full h-72 sm:h-96 object-cover" />
              <figcaption className="absolute bottom-3 left-3 chip">
                <span className="w-3 h-3 rounded-full" style={{ background: g.code === "LM-90" ? "#2C2C2E" : g.code === "LM-31" ? "#B5704F" : "#EFE9DC" }} />
                {g.name} · {g.code}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-page pt-20">
        <div className="mb-6">
          <span className="eyebrow">Reviews</span>
          <h2 className="mt-2 text-3xl sm:text-4xl">4.9 from 12,400 painters.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
          {[
            { n: "Amara K.", r: "London", t: "The depth of Ink Charcoal is unreal — one coat and the room felt finished." },
            { n: "Daniel R.", r: "Brooklyn", t: "Genuinely zero odor. We slept in the bedroom the night we painted." },
            { n: "Lina M.", r: "Copenhagen", t: "Better coverage than the studio brands I've used for ten years." },
          ].map((q) => (
            <figure key={q.n} className="card-surface p-6">
              <div className="flex gap-0.5 text-foreground">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="mt-3 text-[15px] leading-relaxed">"{q.t}"</blockquote>
              <figcaption className="mt-4 text-[13px] text-muted-foreground">{q.n} · {q.r}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="container-page pt-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 sm:p-14 lg:p-20 relative overflow-hidden">
          <div className="max-w-xl">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Color confidence</span>
            <h2 className="mt-3 text-3xl sm:text-5xl text-primary-foreground">
              Five swatches.<br />On us.
            </h2>
            <p className="mt-4 text-[15px] sm:text-[17px] opacity-80 max-w-md">
              See the color on your wall before you commit. Real paint, real light, delivered in 48 hours.
            </p>
            <Link to="/product" className="mt-7 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-background text-foreground font-medium">
              Order free swatches <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div aria-hidden className="absolute -right-10 -bottom-10 sm:right-10 sm:bottom-10 flex gap-2 sm:gap-3 opacity-90">
            {["#EFE9DC","#A8B49A","#B5704F","#4F6A78","#2C2C2E"].map((c) => (
              <span key={c} className="w-14 h-20 sm:w-20 sm:h-28 rounded-2xl" style={{ background: c }} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
