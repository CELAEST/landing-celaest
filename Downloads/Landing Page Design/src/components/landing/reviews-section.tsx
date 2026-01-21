'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

interface Review {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations('reviews');

  const reviews = t.raw('items') as Review[];
  // Duplicate for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const intervalId = setInterval(scroll, 20);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const stats = [
    { value: '4.9/5', label: t('stats.rating') },
    { value: '2,500+', label: t('stats.customers') },
    { value: '98%', label: t('stats.satisfaction') },
    { value: '50K+', label: t('stats.hoursSaved') },
  ];

  return (
    <section className="py-24 bg-brand-ice overflow-hidden">
      <div className="section-container mb-12">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-brand-deep mb-6">
            {t('title1')}
            <br />
            <span className="gradient-text">{t('title2')}</span>
          </h2>
          <p className="text-xl text-brand-slate-medium max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </div>

      {/* Scrolling Reviews */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6 scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedReviews.map((review, index) => (
          <article
            key={`${review.name}-${index}`}
            className="flex-shrink-0 w-[400px] bg-white border border-brand-soft rounded-2xl p-8 card-hover"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-brand-mint fill-brand-mint" />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-brand-deep mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-mint rounded-full flex items-center justify-center shadow-lg shadow-brand-mint/20">
                <span className="text-white font-bold">{review.avatar}</span>
              </div>
              <div>
                <div className="font-bold text-brand-deep">{review.name}</div>
                <div className="text-sm text-brand-slate-medium">{review.role}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="section-container mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-bold text-brand-mint mb-2">{stat.value}</div>
              <div className="text-sm text-brand-slate-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
