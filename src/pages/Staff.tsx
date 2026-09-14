import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Seo from '@/components/Seo';
import { staffMembers } from '@/data/staff';
import { routes } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Staff() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];
    const portraits = container.querySelectorAll('[data-portrait]');

    portraits.forEach((portrait) => {
      const image = portrait.querySelector('[data-image]');
      const text = portrait.querySelector('[data-text]');

      if (image) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: portrait,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
        tl.fromTo(image, { scale: 1.15, yPercent: -5 }, { scale: 1, yPercent: 5, ease: 'none' });
        triggers.push(tl.scrollTrigger!);
      }

      if (text) {
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: portrait,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        });
        tl2.fromTo(text.children,
          { y: 40, opacity: 0 },
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
    <div ref={containerRef} className="min-h-screen pt-20 bg-ivory">
      <Seo
        title="Our Specialists"
        description="Meet the hands and minds behind each treatment — a small, dedicated team of aestheticians and therapists at ATELIER ÉCLAT, Milano."
        path="/staff"
      />
      <div className="container-editorial py-16 md:py-24">
        {/* Page header */}
        <div className="text-center mb-20 md:mb-32">
          <p className="kicker mb-6">The Atelier</p>
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">Our Specialists</h1>
          <p className="font-sans text-base font-light text-taupe max-w-md mx-auto leading-relaxed">
            Meet the hands and minds behind each treatment — a small, dedicated team of aestheticians and therapists with decades of combined expertise.
          </p>
        </div>

        {/* Editorial portraits */}
        <div className="space-y-32 md:space-y-48">
          {staffMembers.map((member, index) => {
            const isReversed = index % 2 === 1;

            return (
              <section
                key={member.id}
                data-portrait
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Portrait image */}
                <div
                  className={`relative overflow-hidden aspect-[3/4] ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <img
                    data-image
                    src={member.image}
                    alt={member.imageAlt}
                    className="h-full w-full object-cover will-change-transform"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-espresso/0 hover:bg-espresso/10 transition-all duration-800 ease-editorial" />
                </div>

                {/* Text content */}
                <div
                  data-text
                  className={`flex flex-col gap-5 ${isReversed ? 'lg:order-1' : ''} lg:px-8`}
                >
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic bg-beige/40 px-3 py-1"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
                    {member.name}
                  </h2>

                  <p className="font-sans text-sm uppercase tracking-editorial-wide text-accent">
                    {member.role}
                  </p>

                  <blockquote className="font-serif text-xl md:text-2xl text-taupe italic leading-relaxed border-l-2 border-accent pl-5 mt-2">
                    {member.philosophy}
                  </blockquote>

                  <div className="mt-4">
                    <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic mb-3">
                      Treatments Performed
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.treatments.map((t) => (
                        <span
                          key={t}
                          className="font-sans text-xs font-light text-taupe border border-sand/50 px-3 py-1.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      to={`${routes.booking}?treatment=${member.treatments[0].toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                      className="btn-primary"
                    >
                      Book with {member.name.split(' ')[0]}
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
