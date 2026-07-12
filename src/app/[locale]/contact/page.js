"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <HeroSection title={t("title")} subtitle={t("description")} />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-charcoal">{t("formTitle")}</h2>

              {submitted ? (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-3 text-emerald-700">{t("successMessage")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-charcoal">
                      {t("nameLabel")}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder={t("namePlaceholder")}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-charcoal placeholder:text-stone-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-charcoal">
                      {t("emailLabel")}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder={t("emailPlaceholder")}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-charcoal placeholder:text-stone-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-charcoal">
                      {t("subjectLabel")}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      placeholder={t("subjectPlaceholder")}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-charcoal placeholder:text-stone-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-charcoal">
                      {t("messageLabel")}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      placeholder={t("messagePlaceholder")}
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-charcoal placeholder:text-stone-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 focus:bg-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl gradient-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:opacity-95"
                  >
                    {t("sendButton")}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              {/* Find a Markaz */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-charcoal">{t("locationTitle")}</h3>
                <p className="text-sm leading-relaxed text-stone-500">{t("locationDesc")}</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-stone-500">
                    <span className="shrink-0 rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">HQ</span>
                    <span>Nizamuddin Markaz, Basti Nizamuddin, New Delhi, India</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-stone-500">
                    <span className="shrink-0 rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">PK</span>
                    <span>Raiwind Markaz, Raiwind Road, Lahore, Pakistan</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-stone-500">
                    <span className="shrink-0 rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">UK</span>
                    <span>Dewsbury Markaz, South Street, Dewsbury, UK</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
                <h3 className="mb-4 text-xl font-bold text-charcoal">{t("socialTitle")}</h3>
                <div className="flex gap-3">
                  {["Facebook", "YouTube", "Twitter"].map((platform) => (
                    <span
                      key={platform}
                      className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-500 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
