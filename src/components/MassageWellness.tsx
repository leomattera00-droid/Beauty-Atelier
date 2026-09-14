import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { wellnessServices } from '@/data/services';
import { routes } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const wellnessImage =
  'https://images.pexels.com/photos/6628601/pexels-photo-6628601.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop';

export default function MassageWellness() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    // Background image slow drift
    const bgImage = container.querySelector('[data-bg-image]');
    if (bgImage) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
      tl.fromTo(bgImage, { yPercent: -10, scale: 1.15 }, { yPercent: 10, scale: 1, ease: 'none' });
      triggers.push(tl.scrollTrigger!);
    }

    // Header reveal
    const headerEls = container.querySelectorAll('[data-header-el]');
    if (headerEls.length > 0) {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 65%',
          end: 'top 40%',
          scrub: 1,
        },
      });
      tl2.fromTo(headerEls,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: 'none' }
      );
      triggers.push(tl2.scrollTrigger!);
    }

    // Service rows stagger in
    const rows = container.querySelectorAll('[data-wellness-row]');
    if (rows.length > 0) {
      rows.forEach((row) => {
        const tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 1,
          },
        });
        tl3.fromTo(row, { x: -30, opacity: 0 }, { x: 0, opacity: 1, ease: 'none' });
        triggers.push(tl3.scrollTrigger!);
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [prefersReduced]);

  return (
    <section ref={containerRef} className="relative bg-espresso text-porcelain overflow-hidden">
      {/* Background image with heavy dark overlay */}
      <div className="absolute inset-0">
        <img
          data-bg-image
          src={wellnessImage}
          alt="A soothing massage session in a warm indoor setting."
          className="h-full w-full object-cover will-change-transform opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso via-espresso/80 to-espresso" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-editorial py-24 md:py-40">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <p
            data-header-el
            className="font-sans text-xs uppercase tracking-editorial-wider text-accent-light mb-6"
          >
            Massage & Wellness
          </p>
          <h2
            data-header-el
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-porcelain leading-tight max-w-2xl mx-auto"
          >
            The body, heard.
          </h2>
          <p
            data-header-el
            className="font-sans text-sm md:text-base font-light text-porcelain/50 mt-6 max-w-md mx-auto leading-relaxed"
          >
            Slow, intentional touch. Warm oils, dimmed light, and the quiet permission to let go — completely.
          </p>
        </div>

        {/* Service rows */}
        <div className="max-w-editorial mx-auto">
          {wellnessServices.map((service) => (
            <div
              key={service.id}
              data-wellness-row
              className="group py-8 border-b border-porcelain/10 last:border-0"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                <h3 className="font-serif text-2xl md:text-3xl text-porcelain group-hover:text-accent-light transition-colors duration-800 ease-editorial shrink-0">
                  {service.name}
                </h3>
                <p className="font-sans text-sm font-light text-porcelain/50 leading-relaxed flex-1 max-w-lg">
                  {service.description}
                </p>
                <div className="flex items-center gap-6 shrink-0 mt-2 md:mt-0">
                  <span className="font-sans text-xs uppercase tracking-editorial-wide text-porcelain/40">
                    {service.duration}
                  </span>
                  <span className="font-sans text-sm text-porcelain/80">{service.price}</span>
                  <Link
                    to={`${routes.booking}?treatment=${service.id}`}
                    className="font-sans text-[10px] uppercase tracking-editorial-wide text-accent-light link-underline shrink-0"
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
