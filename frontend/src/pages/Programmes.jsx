import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Clock, Radio } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const DAY_SHORT = { Lundi: "Lun", Mardi: "Mar", Mercredi: "Mer", Jeudi: "Jeu", Vendredi: "Ven", Samedi: "Sam", Dimanche: "Dim" };

export default function Programmes() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const todayName = useMemo(() => {
    const map = { 0: "Dimanche", 1: "Lundi", 2: "Mardi", 3: "Mercredi", 4: "Jeudi", 5: "Vendredi", 6: "Samedi" };
    return map[new Date().getDay()];
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/programs`)
      .then((r) => setPrograms(r.data))
      .finally(() => setLoading(false));
  }, []);

  const byDay = useMemo(() => {
    const g = {};
    DAYS.forEach((d) => (g[d] = []));
    programs.forEach((p) => {
      if (g[p.day]) g[p.day].push(p);
    });
    return g;
  }, [programs]);

  return (
    <div data-testid="programmes-page" className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          aria-hidden
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1781635925002-125f9308a8e1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMGdvbGQlMjBsaWdodCUyMGRhcmslMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTc4NDU1NzE4N3ww&ixlib=rb-4.1.0&q=85")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-28">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#F5A524]">
            Grille des Programmes
          </p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl font-bold tracking-tight leading-[0.95]">
            La semaine sur <span className="italic text-[#F5A524]">WMS TV</span>
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            Découvrez les émissions phares, les cultes, les enseignements et les
            veillées qui rythment votre semaine sur World Miracles Semences TV.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24">
        <Tabs defaultValue={todayName} className="w-full" data-testid="programs-tabs">
          <TabsList className="w-full h-auto bg-transparent p-1.5 border border-white/10 rounded-full grid grid-cols-7 gap-1">
            {DAYS.map((d) => (
              <TabsTrigger
                key={d}
                value={d}
                data-testid={`tab-${d.toLowerCase()}`}
                className="rounded-full text-xs sm:text-sm font-semibold tracking-wide data-[state=active]:bg-[#F5A524] data-[state=active]:text-black text-zinc-400 hover:text-white transition-colors py-2.5"
              >
                <span className="hidden sm:inline">{d}</span>
                <span className="sm:hidden">{DAY_SHORT[d]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {DAYS.map((d) => (
            <TabsContent key={d} value={d} className="mt-10 focus-visible:outline-none">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-9 h-9 rounded-lg bg-[#F5A524]/10 border border-[#F5A524]/30 flex items-center justify-center">
                  <Radio className="w-4 h-4 text-[#F5A524]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">Journée</p>
                  <p className="font-display text-2xl font-semibold leading-none">{d}</p>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#0A0A0E] border border-white/5 min-h-[200px] animate-pulse" />
                  ))}
                </div>
              ) : byDay[d].length === 0 ? (
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] text-zinc-500 text-sm" data-testid={`empty-${d.toLowerCase()}`}>
                  Aucun programme prévu ce jour.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid={`programs-${d.toLowerCase()}`}>
                  {byDay[d].map((p) => (
                    <article
                      key={p.id}
                      data-testid={`program-card-${p.id}`}
                      className="group relative p-6 rounded-2xl bg-[#0A0A0E] border border-white/5 hover:border-white/15 hover:-translate-y-1 transition-transform duration-300 overflow-hidden"
                    >
                      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#F5A524]/10" />
                      <div className="relative">
                        <div className="flex items-baseline justify-between">
                          <p className="font-mono text-2xl font-bold text-[#F5A524]" data-testid={`program-time-${p.id}`}>
                            {p.time}
                          </p>
                          {p.end_time && (
                            <p className="text-xs text-zinc-500 font-mono">→ {p.end_time}</p>
                          )}
                        </div>
                        {p.category && (
                          <p className="mt-3 inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-zinc-400 border border-white/10 rounded-full px-2.5 py-1">
                            {p.category}
                          </p>
                        )}
                        <h3 className="font-display mt-4 text-xl font-semibold leading-tight" data-testid={`program-title-${p.id}`}>
                          {p.title}
                        </h3>
                        {p.host && (
                          <p className="mt-2 text-sm text-zinc-400">Avec {p.host}</p>
                        )}
                        {p.description && (
                          <p className="mt-3 text-sm text-zinc-500 leading-relaxed line-clamp-2">
                            {p.description}
                          </p>
                        )}
                        <div className="mt-5 flex items-center gap-1.5 text-xs text-zinc-600">
                          <Clock className="w-3.5 h-3.5" />
                          {p.time}
                          {p.end_time ? ` – ${p.end_time}` : ""}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
