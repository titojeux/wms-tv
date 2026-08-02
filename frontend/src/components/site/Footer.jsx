import { Link } from "react-router-dom";
import { Facebook, Youtube, Instagram, Radio, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050507]" data-testid="site-footer">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#F5A524] to-[#B8860B] flex items-center justify-center">
              <Radio className="w-5 h-5 text-black" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <p className="font-display text-xl font-bold">
                WMS<span className="text-[#F5A524]">.</span>TV
              </p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 mt-1">
                World Miracles Semences
              </p>
            </div>
          </Link>
          <p className="mt-6 text-zinc-400 text-sm leading-relaxed max-w-md">
            La chaîne des semences de miracles. Nous diffusons 24h/24 la Parole
            de Dieu, la louange, l'enseignement et les miracles à travers
            l'Afrique et le monde.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              data-testid="social-facebook"
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              data-testid="social-youtube"
              href="#"
              aria-label="YouTube"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              data-testid="social-instagram"
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#F5A524]">
            Navigation
          </p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/" className="text-zinc-400 hover:text-white transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/programmes" className="text-zinc-400 hover:text-white transition-colors">
                Programmes
              </Link>
            </li>
            <li>
              <Link to="/a-propos" className="text-zinc-400 hover:text-white transition-colors">
                À Propos
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-zinc-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#F5A524]">
            Contact
          </p>
          <ul className="mt-5 space-y-3 text-sm text-zinc-400">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-500" />
              <a href="mailto:contact@wms-tv.online" className="hover:text-white transition-colors" data-testid="footer-email">
                contact@wms-tv.online
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-zinc-500" />
              <a href="https://wms-tv.online" className="hover:text-white transition-colors" data-testid="footer-domain">
                wms-tv.online
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} World Miracles Semences TV. Tous droits réservés.
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-600">
            Diffusion 24h / 24 · 7j / 7
          </p>
        </div>
      </div>
    </footer>
  );
}
