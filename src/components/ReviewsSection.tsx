import { Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Data Analyst, TechCorp',
      avatar: 'SC',
      rating: 5,
      text: 'The Python automation scripts saved our team 20+ hours per week. ROI achieved in just 3 days.'
    },
    {
      name: 'Michael Rodriguez',
      role: 'CFO, StartupX',
      avatar: 'MR',
      rating: 5,
      text: 'Best investment for our finance team. The Excel macros are production-grade quality.'
    },
    {
      name: 'Emily Watson',
      role: 'Operations Manager',
      avatar: 'EW',
      rating: 5,
      text: 'Incredible support and documentation. These are not just scripts, they are complete solutions.'
    },
    {
      name: 'David Kim',
      role: 'Senior Developer',
      avatar: 'DK',
      rating: 5,
      text: 'As a developer, I appreciate the code quality. Clean, well-documented, and actually works.'
    },
    {
      name: 'Lisa Martinez',
      role: 'Product Manager',
      avatar: 'LM',
      rating: 5,
      text: 'Game changer for our product team. Automated our entire reporting workflow seamlessly.'
    },
    {
      name: 'James Thompson',
      role: 'Business Analyst',
      avatar: 'JT',
      rating: 5,
      text: 'Professional-grade tools at a fraction of custom development cost. Highly recommended.'
    }
  ];

  // Duplicate reviews for infinite scroll effect
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

  return (
    <section className="py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6">
            Trusted by
            <br />
            <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">Professionals Worldwide</span>
          </h2>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">
            Don't just take our word for it. See what our customers have to say.
          </p>
        </div>
      </div>

      {/* Scrolling Reviews */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedReviews.map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            className="flex-shrink-0 w-[400px] bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:border-[#10B981]/30 transition-all hover:shadow-xl hover:shadow-[#10B981]/5"
          >
            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#10B981] fill-[#10B981]" />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-[#0F172A] mb-6 leading-relaxed">
              "{review.text}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center shadow-lg shadow-[#10B981]/20">
                <span className="text-white font-bold">{review.avatar}</span>
              </div>
              <div>
                <div className="font-bold text-[#0F172A]">{review.name}</div>
                <div className="text-sm text-[#475569]">{review.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Stats */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#10B981] mb-2">4.9/5</div>
            <div className="text-sm text-[#475569]">Average Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#10B981] mb-2">2,500+</div>
            <div className="text-sm text-[#475569]">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#10B981] mb-2">98%</div>
            <div className="text-sm text-[#475569]">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#10B981] mb-2">50K+</div>
            <div className="text-sm text-[#475569]">Hours Saved</div>
          </div>
        </div>
      </div>
    </section>
  );
}