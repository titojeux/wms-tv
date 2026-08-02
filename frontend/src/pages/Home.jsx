import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Radio, Users, Globe2, HeartHandshake } from "lucide-react";
import LivePlayer from "@/components/site/LivePlayer";
import { Button } from "@/components/ui/button";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HIGHLIGHTS = [
  { icon: Radio, label: "Diffusion", value: "24 / 7", accent: "text-[#F5A524]" },
  { icon: Globe2, label: "Portée", value: "Mondiale" },
  { icon: Users, label: "Auditoire", value: "+1M" },
  { icon: HeartHandshake, label: "Mission", value: "Semer la foi" },
];

const DAYS_ORDER = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function Home() {
  const [today, setToday] = useState([]);

  useEffect(() => {
    const jsDay = new Date().getDay(); // 0=Sun ... 6=Sat
    const map = { 0: "Dimanche", 1: "Lundi", 2: "Mardi", 3: "Mercredi", 4: "Jeudi", 5: "Vendredi", 6: "Samedi" };
    const currentDay = map[jsDay];
    axios
      .get(`${API}/programs`, { params: { day: currentDay } })
      .then((r) => setToday(r.data.slice(0, 4)))
      .catch(() => setToday([]));
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/4722576/pexels-photo-4722576.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0))",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 80% 10%, rgba(245,165,36,0.10), transparent 60%), radial-gradient(50% 40% at 10% 30%, rgba(225,29,72,0.08), transparent 60%)",
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                <Sparkles className="w-3.5 h-3.5 text-[#F5A524]" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-300">
                  Chaîne Chrétienne Internationale
                </span>
              </div>

              <h1
                data-testid="hero-title"
                className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight"
              >
                World<br />
                <span className="italic text-[#F5A524]">Miracles</span><br />
                Semences <span className="text-zinc-500">TV</span>
              </h1>

              <p className="mt-6 text-zinc-400 text-base sm:text-lg leading-relaxed max-w-lg">
                La chaîne des semences de miracles. Nous diffusons 24h/24 la
                Parole de Dieu, l'enseignement, la louange et les manifestations
                de sa puissance à travers l'Afrique et le monde.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  data-testid="cta-watch-live"
                  className="rounded-full h-12 px-7 bg-[#F5A524] text-black hover:bg-[#F5A524]/90 font-semibold text-sm tracking-wide"
                >
                  <a href="#player">
                    Regarder en direct
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  data-testid="cta-programs"
                  className="rounded-full h-12 px-7 bg-transparent border-white/15 text-white hover:bg-white/5 hover:text-white font-semibold text-sm tracking-wide"
                >
                  <Link to="/programmes">Voir la grille</Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {HIGHLIGHTS.map(({ icon: Icon, label, value, accent }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                    data-testid={`highlight-${label.toLowerCase()}`}
                  >
                    <Icon className={`w-4 h-4 ${accent || "text-zinc-400"}`} />
                    <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                      {label}
                    </p>
                    <p className="text-base font-semibold mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2" id="player">
              <LivePlayer />
              <p className="mt-4 text-xs text-zinc-500 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#F5A524]" />
                Flux officiel · restream.munokolive.com
              </p>
            </div>
          </div>
        </div>

        {/* LIVE TICKER */}
        <div className="border-y border-white/5 bg-white/[0.015] overflow-hidden">
          <div className="marquee-track flex gap-14 whitespace-nowrap py-4 will-change-transform">
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-14">
                {[
                  "24/7 en direct",
                  "Réveil de Feu · 06h",
                  "Culte Dominical · 09h",
                  "Semences de Vie",
                  "Nuit de Délivrance",
                  "Kids Miracles",
                  "Femmes de Grâce",
                  "Business & Royaume",
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm text-zinc-400">
                    <span className="text-[#F5A524]">✦</span>
                    <span className="tracking-wide">{t}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUJOURD'HUI */}
      <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-32">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#F5A524]">
              Aujourd'hui à l'antenne
            </p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
              Ce qui vous attend
            </h2>
          </div>
          <Link
            to="/programmes"
            data-testid="link-full-schedule"
            className="text-sm font-semibold text-zinc-300 hover:text-white inline-flex items-center gap-1.5 group"
          >
            Grille complète
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" data-testid="today-programs">
          {today.length === 0
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#0A0A0E] border border-white/5 min-h-[180px] animate-pulse"
                />
              ))
            : today.map((p) => (
                <article
                  key={p.id}
                  data-testid={`today-program-${p.id}`}
                  className="group relative p-6 rounded-2xl bg-[#0A0A0E] border border-white/5 hover:border-white/15 hover:bg-[#0F0F14] transition-colors duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#F5A524]/20" />
                  <div className="relative">
                    <p className="font-mono text-2xl font-bold text-[#F5A524]">{p.time}</p>
                    {p.category && (
                      <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-zinc-500">
                        {p.category}
                      </p>
                    )}
                    <h3 className="font-display mt-3 text-xl font-semibold leading-tight">
                      {p.title}
                    </h3>
                    {p.host && (
                      <p className="mt-2 text-sm text-zinc-400">Avec {p.host}</p>
                    )}
                  </div>
                </article>
              ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="relative border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1499209974431-9dddcece7f88?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwxfHx3b3JzaGlwJTIwaGFuZHMlMjBzaWxob3VldHRlJTIwc3VucmlzZXxlbnwwfHx8fDE3ODQ1NTcxODd8MA&ixlib=rb-4.1.0&q=85")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#F5A524]">
                  Notre vision
                </p>
                <p className="font-display text-3xl font-bold mt-2 leading-tight">
                  Semer, arroser, moissonner.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#F5A524]">
              À propos
            </p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
              Une chaîne qui plante des <span className="italic text-[#F5A524]">semences</span> dans le cœur des nations.
            </h2>
            <p className="mt-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
              World Miracles Semences TV est une chaîne chrétienne dédiée à la
              propagation de la Parole de Dieu et à la manifestation des
              miracles. Notre engagement : édifier le corps de Christ, réveiller
              les nations et semer des graines d'espérance à travers des
              programmes puissants, authentiques et accessibles à tous.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">Fondation</p>
                <p className="font-display text-3xl font-bold mt-1">2021</p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">Langues</p>
                <p className="font-display text-lg font-semibold mt-1">FR · LN · EN</p>
              </div>
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">Portée</p>
                <p className="font-display text-lg font-semibold mt-1">Mondiale</p>
              </div>
            </div>

            <div className="mt-8">
              <Button
                asChild
                data-testid="cta-about-more"
                variant="outline"
                className="rounded-full h-11 px-6 border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white"
              >
                <Link to="/a-propos">Découvrir notre histoire</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
