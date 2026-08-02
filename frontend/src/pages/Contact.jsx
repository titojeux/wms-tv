import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MapPin, Send, Phone, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Veuillez remplir les champs obligatoires.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message envoyé ! Nous vous répondrons rapidement.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast.error("Erreur lors de l'envoi. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 30% 20%, rgba(245,165,36,0.12), transparent 60%)",
          }}
        />
        <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-28">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#F5A524]">
            Contact
          </p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl font-bold tracking-tight leading-[0.95] max-w-3xl">
            Parlons ensemble<span className="text-[#F5A524]">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            Une requête de prière, une suggestion, un partenariat ou simplement
            un mot d'encouragement ? Écrivez-nous, l'équipe WMS TV vous répondra.
          </p>
        </div>
      </section>

      <section className="relative border-t border-white/5">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info */}
          <div className="lg:col-span-5 space-y-4">
            <InfoCard
              icon={Mail}
              label="Email"
              value="contact@wms-tv.online"
              href="mailto:contact@wms-tv.online"
              testid="contact-info-email"
            />
            <InfoCard
              icon={Globe}
              label="Site officiel"
              value="wms-tv.online"
              href="https://wms-tv.online"
              testid="contact-info-domain"
            />
            <InfoCard
              icon={Phone}
              label="Requêtes de prière"
              value="+243 000 000 000"
              href="tel:+243000000000"
              testid="contact-info-phone"
            />
            <InfoCard
              icon={MapPin}
              label="Studios"
              value="Kinshasa · République Démocratique du Congo"
              testid="contact-info-location"
            />
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0A0A0E] p-8 sm:p-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  Nom complet *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  data-testid="contact-name"
                  placeholder="Jean Kabongo"
                  className="mt-2 bg-black/40 border-white/10 h-12 text-white placeholder:text-zinc-600 focus-visible:ring-[#F5A524]"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  data-testid="contact-email"
                  placeholder="vous@exemple.com"
                  className="mt-2 bg-black/40 border-white/10 h-12 text-white placeholder:text-zinc-600 focus-visible:ring-[#F5A524]"
                />
              </div>
            </div>
            <div className="mt-5">
              <Label htmlFor="subject" className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                Sujet
              </Label>
              <Input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={onChange}
                data-testid="contact-subject"
                placeholder="Partenariat, prière, suggestion…"
                className="mt-2 bg-black/40 border-white/10 h-12 text-white placeholder:text-zinc-600 focus-visible:ring-[#F5A524]"
              />
            </div>
            <div className="mt-5">
              <Label htmlFor="message" className="text-xs tracking-[0.2em] uppercase text-zinc-400">
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={onChange}
                data-testid="contact-message"
                rows={6}
                placeholder="Écrivez votre message…"
                className="mt-2 bg-black/40 border-white/10 text-white placeholder:text-zinc-600 focus-visible:ring-[#F5A524] resize-none"
              />
            </div>
            <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-xs text-zinc-500">
                En envoyant ce message, vous acceptez d'être contacté par l'équipe WMS TV.
              </p>
              <Button
                type="submit"
                disabled={loading}
                data-testid="contact-submit"
                className="rounded-full h-12 px-7 bg-[#F5A524] text-black hover:bg-[#F5A524]/90 font-semibold"
              >
                {loading ? "Envoi..." : (
                  <>
                    Envoyer <Send className="w-4 h-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, href, testid }) {
  const content = (
    <div
      data-testid={testid}
      className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-colors flex items-start gap-4"
    >
      <div className="w-11 h-11 rounded-xl bg-[#F5A524]/10 border border-[#F5A524]/25 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#F5A524]" />
      </div>
      <div>
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">{label}</p>
        <p className="font-display text-lg font-semibold mt-1 leading-tight">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}
