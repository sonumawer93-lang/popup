import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="container-page flex items-center justify-between h-14 sm:h-16">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -ml-2 rounded-full hover:bg-surface-2"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link to="/" className="font-display text-[19px] tracking-tight">
            Lumen<span className="text-muted-foreground"> &amp; Co.</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {["Shop", "Colors", "Finishes", "Inspiration", "Support"].map((l) => (
            <Link key={l} to="/product" className="btn-ghost text-[14px]">
              {l}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/product" aria-label="Search" className="w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-surface-2">
            <Search className="w-[18px] h-[18px]" />
          </Link>
          <Link to="/product" aria-label="Cart" className="w-11 h-11 inline-flex items-center justify-center rounded-full hover:bg-surface-2 relative">
            <ShoppingBag className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent" />
          </Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-[60] bg-background flex flex-col overscroll-contain">
          <div className="container-page flex items-center justify-between h-14 shrink-0 border-b border-border">
            <span className="font-display text-[19px]">Lumen &amp; Co.</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-11 h-11 -mr-2 inline-flex items-center justify-center rounded-full hover:bg-surface-2"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="container-page mt-2 flex-1 overflow-y-auto flex flex-col">
            {["Shop", "Colors", "Finishes", "Inspiration", "Support"].map((l) => (
              <Link
                key={l}
                to="/product"
                onClick={() => setOpen(false)}
                className="py-5 text-2xl font-display border-b border-border"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-2">
      <div className="container-page py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-xl">Lumen &amp; Co.</div>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Premium architectural paint, crafted in small batches for considered homes.
          </p>
        </div>
        {[
          { h: "Shop", items: ["Interior", "Exterior", "Primers", "Wood Finishes"] },
          { h: "Company", items: ["About", "Sustainability", "Stockists", "Press"] },
          { h: "Support", items: ["Color Consultations", "Delivery", "Returns", "Contact"] },
        ].map((col) => (
          <div key={col.h}>
            <div className="eyebrow">{col.h}</div>
            <ul className="mt-4 space-y-3 text-[14.5px]">
              {col.items.map((i) => (
                <li key={i}><Link to="/product" className="hover:text-muted-foreground">{i}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page py-6 hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
        <p>© 2026 Lumen &amp; Co. All rights reserved.</p>
        <p>Designed in Copenhagen. Made in small batches.</p>
      </div>
    </footer>
  );
}
