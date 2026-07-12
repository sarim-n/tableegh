import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: nav("home") },
    { href: "/about", label: nav("about") },
    { href: "/events", label: nav("events") },
    { href: "/resources", label: nav("resources") },
    { href: "/contact", label: nav("contact") },
    { href: "/faq", label: nav("faq") },
    { href: "/donate", label: nav("donate") },
  ];

  return (
    <footer className="relative overflow-hidden bg-emerald-950 text-white">
      {/* Decorative top edge */}
      <div className="h-1 w-full bg-gradient-to-r from-gold-600 via-emerald-400 to-gold-600" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* About column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-800">
                <svg className="h-6 w-6 text-emerald-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-3.35 2.07-6.22 5-7.41C8.39 5.86 8 7.39 8 9c0 4.41 3.59 8 8 8 .69 0 1.35-.09 1.99-.24C16.53 18.72 14.39 20 12 20z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">{nav("siteName")}</span>
            </div>
            <p className="text-sm leading-relaxed text-emerald-200/70">
              {t("aboutText")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-200/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-emerald-200/70">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {t("email")}
              </li>
              <li className="flex items-start gap-2 text-sm text-emerald-200/70">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Nizamuddin Markaz, Delhi, India
              </li>
            </ul>
          </div>

          {/* Social / Quranic verse */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Inspiration
            </h3>
            <blockquote className="border-s-2 border-gold-600 ps-4 text-sm italic leading-relaxed text-emerald-200/70">
              &ldquo;Let there arise from you a group inviting to all that is good, enjoining what is right, and forbidding what is wrong.&rdquo;
              <footer className="mt-2 text-xs text-gold-400 not-italic">
                — Quran 3:104
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-800 pt-8 sm:flex-row">
          <p className="text-xs text-emerald-200/50">
            {t("copyright", { year })}
          </p>
          <p className="text-xs text-emerald-200/50">
            {t("madeWith")} ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
