"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import HeroSection from "@/components/HeroSection";
import ContentCard from "@/components/ContentCard";

export default function ResourcesPage() {
  const t = useTranslations("resources");
  const locale = useLocale();
  const isUrdu = locale === "ur";
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const types = [
    { key: "all", label: t("filterAll") },
    { key: "article", label: t("filterArticles") },
    { key: "audio", label: t("filterAudio") },
    { key: "video", label: t("filterVideo") },
    { key: "book", label: t("filterBooks") },
  ];

  const filteredResources = resources
    .filter((r) => filter === "all" || r.type === filter)
    .filter((r) => {
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      const title = isUrdu ? r.titleUr : r.titleEn;
      const desc = isUrdu ? r.descriptionUr : r.descriptionEn;
      return (
        title.toLowerCase().includes(s) ||
        (desc && desc.toLowerCase().includes(s)) ||
        (r.author && r.author.toLowerCase().includes(s))
      );
    });

  return (
    <>
      <HeroSection title={t("title")} subtitle={t("description")} />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6">
          {/* Search bar */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-md">
              <svg className="absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-full border border-stone-200 bg-white py-3 ps-12 pe-4 text-sm text-charcoal placeholder:text-stone-400 outline-none transition-all focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {types.map((type) => (
              <button
                key={type.key}
                onClick={() => setFilter(type.key)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  filter === type.key
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-stone-500 border border-stone-200 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Resources grid */}
          {loading ? (
            <div className="py-12 text-center text-stone-500">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![rect(0,0,0,0)]">Loading...</span>
              </div>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map((r) => (
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
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <p className="mt-4 text-stone-500">{t("noResults")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
