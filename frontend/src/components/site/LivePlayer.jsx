import { useRef, useState } from "react";
import { Maximize2, Volume2, RefreshCw, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import LiveBadge from "@/components/site/LiveBadge";

const STREAM_URL =
  "https://restream.munokolive.com/2bf9618b-c89b-4852-9b55-27fbc152365e.html";

export default function LivePlayer() {
  const wrapperRef = useRef(null);
  const iframeRef = useRef(null);
  const [iframeKey, setIframeKey] = useState(0);

  const openFullscreen = async () => {
    const el = wrapperRef.current;
    if (!el) return;
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        await el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        await el.msRequestFullscreen();
      } else {
        throw new Error("no-fs");
      }
    } catch (err) {
      // Preview/embedded environments (like Emergent preview) block fullscreen
      // via permissions-policy. On the production domain (wms-tv.online) it works.
      toast.info("Plein écran indisponible ici. Ouverture du player dans un nouvel onglet…");
      window.open(STREAM_URL, "_blank", "noopener,noreferrer");
    }
  };

  const reload = () => {
    setIframeKey((k) => k + 1);
    toast.success("Flux rechargé.");
  };

  return (
    <div className="relative" data-testid="live-player-wrapper">
      {/* Ambient live glow */}
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(225,29,72,0.25), transparent 65%), radial-gradient(60% 60% at 20% 80%, rgba(245,165,36,0.18), transparent 60%)",
        }}
      />
      <div
        ref={wrapperRef}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-black live-glow"
      >
        {/* Top bar overlay */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <LiveBadge />
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              data-testid="player-reload-btn"
              onClick={reload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white text-xs hover:bg-black/80 transition-colors"
              aria-label="Recharger"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recharger</span>
            </button>
            <button
              data-testid="player-fullscreen-btn"
              onClick={openFullscreen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white text-xs hover:bg-black/80 transition-colors"
              aria-label="Plein écran"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Plein écran</span>
            </button>
            <a
              data-testid="player-open-new-tab"
              href={STREAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white text-xs hover:bg-black/80 transition-colors"
              aria-label="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Nouvel onglet
            </a>
          </div>
        </div>

        <div className="relative w-full aspect-video bg-black">
          <iframe
            key={iframeKey}
            ref={iframeRef}
            id="wms-player-frame"
            data-testid="live-player-iframe"
            title="World Miracles Semences TV - Live Stream"
            src={STREAM_URL}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            scrolling="no"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture; accelerometer; gyroscope"
            allowFullScreen
          />
        </div>

        {/* Bottom now-playing bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-10 pb-4 px-5 flex items-center justify-between pointer-events-none">
          <div className="text-white">
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#F5A524]">
              En cours
            </p>
            <p className="font-display text-lg sm:text-xl font-semibold leading-tight mt-0.5">
              World Miracles Semences TV
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400">
                Diffusion
              </p>
              <p className="text-sm font-mono text-white flex items-center gap-1.5 justify-end">
                <Volume2 className="w-3.5 h-3.5" /> 24 / 7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
