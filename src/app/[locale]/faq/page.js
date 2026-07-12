import { useTranslations, useLocale } from "next-intl";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import AccordionItem from "@/components/AccordionItem";
import { faqs } from "@/data/faq";

export default function FaqPage() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const isUrdu = locale === "ur";

  const generalFaqs = faqs.filter((f) => f.category === "general");
  const practiceFaqs = faqs.filter((f) => f.category === "practice");

  return (
    <>
      <HeroSection title={t("title")} subtitle={t("description")} />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          {/* General Questions */}
          <SectionHeading title={t("generalTitle")} />
          <div className="mb-16 rounded-2xl border border-stone-200/80 bg-white px-6 shadow-sm sm:px-8">
            {generalFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                question={isUrdu ? faq.questionUr : faq.questionEn}
                answer={isUrdu ? faq.answerUr : faq.answerEn}
              />
            ))}
          </div>

          {/* Practice & Participation */}
          <SectionHeading title={t("practiceTitle")} />
          <div className="rounded-2xl border border-stone-200/80 bg-white px-6 shadow-sm sm:px-8">
            {practiceFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                question={isUrdu ? faq.questionUr : faq.questionEn}
                answer={isUrdu ? faq.answerUr : faq.answerEn}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
