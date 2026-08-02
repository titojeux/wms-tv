import { Sparkles, Target, Compass, Heart, Radio, Globe2 } from "lucide-react";

const PILLARS = [
  {
    icon: Target,
    title: "Notre Mission",
    text: "Diffuser l'Évangile du Royaume avec puissance, semer des semences de foi et faire connaître Jésus-Christ aux nations à travers un média de qualité.",
  },
  {
    icon: Compass,
    title: "Notre Vision",
    text: "Devenir une plateforme de référence de la télévision chrétienne francophone, disponible sur tous les écrans, en direct 24h/24, partout dans le monde.",
  },
  {
    icon: Heart,
    title: "Nos Valeurs",
    text: "L'intégrité biblique, l'excellence dans la production, l'unité du corps de Christ, la compassion envers l'humanité et la fidélité à l'appel divin.",
  },
];

const STATS = [
  { label: "Année de lancement", value: "2021" },
  { label: "Diffusion", value: "24 / 7" },
  { label: "Langues", value: "3+" },
  { label: "Continents touchés", value: "5" },
];

export default function APropos() {
  return (
    <div data-testid="apropos-page">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 70% 20%, rgba(245,165,36,0.12), transparent 60%), radial-gradient(50% 40% at 20% 80%, rgba(225,29,72,0.06), transparent 60%)",
          }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#F5A524]" />
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-300">
              À propos de WMS TV
            </span>
          </div>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] max-w-4xl">
            L'histoire d'une chaîne qui sème dans les <span className="italic text-[#F5A524]">nations</span>.
          </h1>
          <p className="mt-6 max-w-3xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            World Miracles Semences TV (WMS TV) est née d'une conviction : le
            monde a besoin d'entendre une parole vivante, authentique et
            porteuse d'espérance. Depuis son lancement, WMS TV est une antenne
            dédiée à la Parole de Dieu, aux miracles et à la formation d'une
            génération enracinée dans la foi.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                data-testid={`pillar-${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5A524]/10 border border-[#F5A524]/25 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#F5A524]" />
                </div>
                <h3 className="font-display mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-zinc-400 leading-relaxed text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="relative border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#F5A524]">
              Notre histoire
            </p>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
              Une semence plantée, une moisson qui se lève.
            </h2>
            <div className="mt-8 space-y-6 text-zinc-400 leading-relaxed text-base sm:text-lg">
              <p>
                World Miracles Semences TV a été lancée avec une seule ambition :
                offrir une plateforme de diffusion continue de la Parole de Dieu,
                accessible gratuitement à tous, partout, à toute heure. Ce qui a
                commencé comme une petite retransmission locale est devenu un
                média chrétien international, suivi par des dizaines de milliers
                de foyers.
              </p>
              <p>
                Nos programmes couvrent l'ensemble de la vie chrétienne :
                enseignements bibliques profonds, cultes en direct, veillées de
                prière, émissions pour la famille, la jeunesse, les femmes, les
                entrepreneurs chrétiens, la musique gospel et les témoignages de
                miracles vécus par nos téléspectateurs.
              </p>
              <p>
                WMS TV, c'est bien plus qu'une chaîne : c'est un canal
                prophétique, un lieu de rendez-vous quotidien avec Dieu et une
                famille qui s'étend jour après jour.
              </p>
            </div>
          </div>

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
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10">
                  <Radio className="w-3.5 h-3.5 text-[#F5A524]" />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-zinc-200">
                    Depuis 2021
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="p-5 rounded-xl border border-white/5 bg-white/[0.02]" data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">{s.label}</p>
                  <p className="font-display text-2xl font-bold mt-1">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="relative border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 md:py-32 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5A524]/10 border border-[#F5A524]/25 mb-6">
            <Globe2 className="w-6 h-6 text-[#F5A524]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
            Une antenne, <span className="italic text-[#F5A524]">une génération</span>, un monde à toucher.
          </h2>
          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Que vous soyez en Afrique, en Europe, en Amérique ou en Asie, WMS TV
            est disponible en direct sur wms-tv.online. Rejoignez cette
            aventure divine et devenez, vous aussi, une semence dans les mains
            de Dieu.
          </p>
        </div>
      </section>
    </div>
  );
}
