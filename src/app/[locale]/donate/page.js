import { useTranslations } from "next-intl";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import IslamicPattern from "@/components/IslamicPattern";

export default function DonatePage() {
  const t = useTranslations("donate");

  const ways = [
    {
      title: t("way1Title"),
      desc: t("way1Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: t("way2Title"),
      desc: t("way2Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: t("way3Title"),
      desc: t("way3Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: t("way4Title"),
      desc: t("way4Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <>
      <HeroSection title={t("title")} subtitle={t("description")} />

      {/* Virtue of Giving */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading title={t("introTitle")} />
          <div className="space-y-4 text-base leading-relaxed text-stone-500">
            <p>{t("introP1")}</p>
            <p>{t("introP2")}</p>
          </div>
        </div>
      </section>

      {/* Ways to Support */}
      <section className="bg-emerald-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title={t("waysTitle")} />
          <div className="grid gap-6 sm:grid-cols-2">
            {ways.map((w, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${w.color}`}>
                  {w.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-charcoal">{w.title}</h3>
                <p className="text-sm leading-relaxed text-stone-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to contribute */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading title={t("howTitle")} />
          <p className="text-base leading-relaxed text-stone-500">{t("howP1")}</p>
        </div>
      </section>

      {/* Quranic Reminder */}
      <section className="relative overflow-hidden gradient-emerald py-20">
        <div className="absolute inset-0 text-white">
          <IslamicPattern className="h-full w-full" opacity={0.05} />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-2xl font-bold text-white">{t("reminderTitle")}</h2>
          <blockquote className="text-xl italic leading-relaxed text-emerald-100">
            {t("reminderP1")}
          </blockquote>
        </div>
      </section>
    </>
  );
}
