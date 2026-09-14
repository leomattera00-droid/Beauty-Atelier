import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getSignatureTreatments } from '@/data/services';
import { routes } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function SignatureTreatments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const signatures = getSignatureTreatments();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll('[data-panel]');
    const triggers: ScrollTrigger[] = [];

    panels.forEach((panel) => {
      const image = panel.querySelector('[data-image]');
      const kicker = panel.querySelector('[data-kicker]');
      const title = panel.querySelector('[data-title]');
      const desc = panel.querySelector('[data-desc]');
      const meta = panel.querySelector('[data-meta]');
      const cta = panel.querySelector('[data-cta]');

      // Slow image scale + parallax
      if (image) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
        tl.fromTo(image, { scale: 1.25, yPercent: -6 }, { scale: 1, yPercent: 6, ease: 'none' });
        triggers.push(tl.scrollTrigger!);
      }

      // Progressive text reveal — kicker → title → desc → meta → CTA
      const textEls = [kicker, title, desc, meta, cta].filter(Boolean);
      if (textEls.length > 0) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1,
          },
        });
        tl2.fromTo(textEls,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, ease: 'none' }
        );
        triggers.push(tl2.scrollTrigger!);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [prefersReduced]);

  return (
    <section ref={containerRef} className="bg-ivory">
      {/* Section intro */}
      <div className="container-editorial py-20 md:py-32 text-center">
        <p className="kicker mb-6">Signature</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight max-w-2xl mx-auto">
          The treatments that define us
        </h2>
      </div>

      {/* Campaign panels */}
      {signatures.map(({ treatment, category }, index) => {
        const isReversed = index % 2 === 1;
        const image = treatment.image || category.image;
        const imageAlt = treatment.imageAlt || category.imageAlt;

        return (
          <section
            key={treatment.id}
            data-panel
            className="min-h-[90vh] flex items-center py-20 md:py-32"
          >
            <div className="container-editorial">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[5/4] lg:[direction:ltr]">
                  <img
                    data-image
                    src={image}
                    alt={imageAlt}
                    className="h-full w-full object-cover will-change-transform"
                  />
                </div>

                {/* Text */}
                <div className="lg:[direction:ltr] flex flex-col gap-5 px-0 lg:px-8">
                  <span data-kicker className="kicker">
                    {category.name}
                  </span>
                  <h3
                    data-title
                    className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight"
                  >
                    {treatment.name}
                  </h3>
                  <p
                    data-desc
                    className="font-sans text-base md:text-lg font-light text-taupe leading-relaxed max-w-md"
                  >
                    {treatment.shortDescription}
                  </p>
                  <div data-meta className="flex items-center gap-6 pt-2">
                    <span className="font-sans text-xs uppercase tracking-editorial-wide text-metallic">
                      {treatment.duration}
                    </span>
                    {treatment.price && (
                      <span className="font-sans text-sm text-charcoal">
                        {treatment.price}
                      </span>
                    )}
                  </div>
                  <div data-cta className="pt-4">
                    <Link
                      to={`${routes.treatments}/${treatment.slug}`}
                      className="btn-primary"
                    >
                      Discover
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </section>
  );
}
