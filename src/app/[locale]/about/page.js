import { useTranslations } from "next-intl";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import IslamicPattern from "@/components/IslamicPattern";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <>
      <HeroSection title={t("title")} subtitle={t("description")} />

      {/* History */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 text-emerald-800">
          <IslamicPattern className="h-full w-full" opacity={0.03} />
        </div>
        <div className="relative mx-auto max-w-4xl px-6">
          <SectionHeading title={t("historyTitle")} />
          <div className="space-y-6 text-base leading-relaxed text-stone-500">
            <p>{t("historyP1")}</p>
            <p>{t("historyP2")}</p>
            <p>{t("historyP3")}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-emerald-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-charcoal">{t("missionTitle")}</h3>
              <p className="leading-relaxed text-stone-500">{t("missionP1")}</p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex rounded-xl bg-gold-500/10 p-3 text-gold-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-charcoal">{t("visionTitle")}</h3>
              <p className="leading-relaxed text-stone-500">{t("visionP1")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading title={t("methodTitle")} />
          <div className="rounded-2xl gradient-emerald p-8 text-white shadow-lg sm:p-12">
            <p className="text-lg leading-relaxed text-emerald-50">{t("methodP1")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
