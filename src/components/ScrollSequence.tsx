import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imagery } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('[data-chapter]');
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section) => {
      const image = section.querySelector('[data-image]');
      const text = section.querySelector('[data-text]');
      const kicker = section.querySelector('[data-kicker]');
      const title = section.querySelector('[data-title]');
      const body = section.querySelector('[data-body]');

      // Slow image scaling — subtle zoom out as section enters, zoom in as it leaves
      if (image) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
        tl.fromTo(image, { scale: 1.2 }, { scale: 1, ease: 'none' });
        triggers.push(tl.scrollTrigger!);
      }

      // Parallax on image container
      if (image) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
        tl2.fromTo(image, { yPercent: -8 }, { yPercent: 8, ease: 'none' });
        triggers.push(tl2.scrollTrigger!);
      }

      // Text entrance — typography rises and fades in
      const textEls = [kicker, title, body].filter(Boolean);
      if (textEls.length > 0 && text) {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        });
        tl3.fromTo(textEls,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, ease: 'none' }
        );
        triggers.push(tl3.scrollTrigger!);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className="bg-ivory">
      {/* Intro whitespace — generous editorial breathing room */}
      <div className="h-[20vh] md:h-[30vh]" />

      {imagery.scrollSequence.map((item, index) => {
        const isReversed = index % 2 === 1;

        return (
          <section
            key={index}
            data-chapter
            className="min-h-screen flex items-center py-20 md:py-32"
          >
            <div className="container-editorial">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] lg:[direction:ltr]">
                  <img
                    data-image
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover will-change-transform"
                  />
                </div>

                {/* Text */}
                <div
                  data-text
                  className="lg:[direction:ltr] flex flex-col gap-5"
                >
                  <span
                    data-kicker
                    className="kicker"
                  >
                    {item.kicker}
                  </span>
                  <h2
                    data-title
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight"
                  >
                    {item.title}
                  </h2>
                  <p
                    data-body
                    className="font-sans text-base md:text-lg font-light text-taupe leading-relaxed max-w-md"
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Closing whitespace */}
      <div className="h-[20vh] md:h-[30vh]" />
    </div>
  );
}
