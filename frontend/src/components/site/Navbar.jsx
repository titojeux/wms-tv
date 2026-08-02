import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import LiveBadge from "@/components/site/LiveBadge";

const NAV = [
  { to: "/", label: "Accueil", testid: "nav-home" },
  { to: "/programmes", label: "Programmes", testid: "nav-programs" },
  { to: "/a-propos", label: "À Propos", testid: "nav-about" },
  { to: "/contact", label: "Contact", testid: "nav-contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        scrolled
          ? "bg-[#030305]/85 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        <Link to="/" data-testid="brand-logo" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A524] to-[#B8860B] flex items-center justify-center shadow-[0_0_30px_rgba(245,165,36,0.35)] group-hover:scale-105 transition-transform duration-300">
            <Radio className="w-5 h-5 text-black" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">
              WMS<span className="text-[#F5A524]">.</span>TV
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mt-0.5">
              World Miracles Semences
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              data-testid={item.testid}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium tracking-wide transition-colors duration-200",
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 right-0 h-px bg-[#F5A524]" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LiveBadge />
        </div>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#030305]/95 backdrop-blur-xl" data-testid="mobile-menu">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`${item.testid}-mobile`}
                className={({ isActive }) =>
                  cn(
                    "text-base font-medium py-2 border-b border-white/5",
                    isActive ? "text-[#F5A524]" : "text-zinc-300"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-2">
              <LiveBadge />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
