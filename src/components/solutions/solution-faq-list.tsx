import React from "react";
import type { FAQItem } from "@/lib/structured-data";

interface SolutionFaqListProps {
  title1: string;
  title2: string;
  questionPrefix: string;
  faqs: FAQItem[];
}

/**
 * Editorial Q&A sections using legal-editorial.css numeral rules and clean whitespace.
 */
export function SolutionFaqList({ title1, title2, questionPrefix, faqs }: SolutionFaqListProps) {
  return (
    <section className="pt-8">
      <h2 className="sol-section-heading mb-10">
        <span>{title1} </span>
        <em>{title2}</em>
      </h2>

      <div>
        {faqs.map((faq, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <article
              key={faq.question}
              id={`faq-${num}`}
              className="legal-section-article scroll-mt-28"
            >
              <div className="legal-section-rule-wrap">
                <strong className="legal-section-num">{num}</strong>
                <span className="rule" />
                <span className="legal-section-tag">
                  {questionPrefix} {num}
                </span>
              </div>
              <h3 className="legal-section-title">{faq.question}</h3>
              <div className="legal-section-paragraphs">
                <p>{faq.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
