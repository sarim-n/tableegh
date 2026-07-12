"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import HeroSection from "@/components/HeroSection";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";

export default function EventsPage() {
  const t = useTranslations("events");
  const locale = useLocale();
  const isUrdu = locale === "ur";
  const [filter, setFilter] = useState("all");

  const categories = [
    { key: "all", label: t("filterAll") },
    { key: "ijtema", label: t("filterIjtema") },
    { key: "bayan", label: t("filterBayan") },
    { key: "mashwara", label: t("filterMashwara") },
    { key: "gasht", label: t("filterGasht") },
  ];

  const filteredEvents =
    filter === "all" ? events : events.filter((e) => e.category === filter);

  return (
    <>
      <HeroSection title={t("title")} subtitle={t("description")} />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  filter === cat.key
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-stone-500 border border-stone-200 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Events grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredEvents.map((e) => (
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
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <p className="mt-4 text-stone-500">{t("noEvents")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
