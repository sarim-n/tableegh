import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ContentCard from "@/components/ContentCard";
import EventCard from "@/components/EventCard";
import IslamicPattern from "@/components/IslamicPattern";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const isUrdu = locale === "ur";

  const featuredResources = await prisma.resource.findMany({
    take: 3,
    orderBy: { date: "desc" },
  });
  
  const upcomingEvents = await prisma.event.findMany({
    take: 3,
    orderBy: { date: "asc" },
  });

  const principles = [
    {
      title: t("principle1Title"),
      desc: t("principle1Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
    },
    {
      title: t("principle2Title"),
      desc: t("principle2Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: t("principle3Title"),
      desc: t("principle3Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
    },
    {
      title: t("principle4Title"),
      desc: t("principle4Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: t("principle5Title"),
      desc: t("principle5Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      ),
    },
    {
      title: t("principle6Title"),
      desc: t("principle6Desc"),
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: "150+", label: t("statsCountries") },
    { value: "80M+", label: t("statsMembers") },
    { value: "10K+", label: t("statsMosques") },
    { value: "98+", label: t("statsYears") },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaText={t("heroCta")}
        ctaHref="/about"
      />

      {/* Six Principles */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 text-emerald-800">
          <IslamicPattern className="h-full w-full" opacity={0.03} />
        </div>
        <div className="relative mx-auto max-w-7xl px-6">
          <SectionHeading title={t("principlesTitle")} subtitle={t("principlesSubtitle")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100 animate-fade-in-up stagger-${i + 1}`}
              >
                <div className="mb-4 inline-flex rounded-xl bg-emerald-50 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                  {p.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-charcoal">{p.title}</h3>
                <p className="text-sm leading-relaxed text-stone-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="gradient-emerald py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title={t("statsTitle")} light />
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-scale-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-4xl font-bold text-white sm:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-emerald-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title={t("featuredTitle")} subtitle={t("featuredSubtitle")} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredResources.map((r) => (
              <ContentCard
                key={r.id}
                title={isUrdu ? r.titleUr : r.titleEn}
                description={isUrdu ? r.descriptionUr : r.descriptionEn}
                type={r.type}
                category={r.category}
                author={r.author}
                date={r.date}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 px-6 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white"
            >
              {t("viewAll")}
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-emerald-50/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title={t("eventsTitle")} subtitle={t("eventsSubtitle")} />
          <div className="grid gap-6 lg:grid-cols-2">
            {upcomingEvents.map((e) => (
              <EventCard
                key={e.id}
                title={isUrdu ? e.titleUr : e.titleEn}
                date={e.date}
                endDate={e.endDate}
                time={e.time}
                location={isUrdu ? e.locationUr : e.locationEn}
                category={e.category}
                description={isUrdu ? e.descriptionUr : e.descriptionEn}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 px-6 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-600 hover:text-white"
            >
              {t("viewAll")}
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
