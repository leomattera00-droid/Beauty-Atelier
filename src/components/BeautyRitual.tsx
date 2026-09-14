import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { beautyRitualStages } from '@/data/services';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function BeautyRitual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const stages = container.querySelectorAll('[data-stage]');
    const triggers: ScrollTrigger[] = [];

    // Progress line
    const progressLine = container.querySelector('[data-progress-line]');
    if (progressLine) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 0.8,
        },
      });
      tl.fromTo(progressLine, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top' });
      triggers.push(tl.scrollTrigger!);
    }

    stages.forEach((stage) => {
      const number = stage.querySelector('[data-number]');
      const title = stage.querySelector('[data-title]');
      const text = stage.querySelector('[data-text]');
      const dot = stage.querySelector('[data-dot]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 75%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      const els = [dot, number, title, text].filter(Boolean);
      tl.fromTo(els,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: 'none' }
      );
      triggers.push(tl.scrollTrigger!);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [prefersReduced]);

  return (
    <section ref={containerRef} className="bg-porcelain py-24 md:py-40">
      <div className="container-editorial">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-32">
          <p className="kicker mb-6">The Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight max-w-2xl mx-auto">
            The Beauty Ritual
          </h2>
          <p className="font-sans text-sm font-light text-taupe mt-6 max-w-md mx-auto leading-relaxed">
            Five stages, one experience. From the moment you arrive to the care that follows you home.
          </p>
        </div>

        {/* Stages with progress line */}
        <div className="relative max-w-editorial mx-auto">
          {/* Vertical progress line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-sand -translate-x-1/2">
            <div
              data-progress-line
              className="absolute inset-0 bg-accent origin-top will-change-transform"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {beautyRitualStages.map((stage, index) => {
            const isRight = index % 2 === 0;

            return (
              <div
                key={stage.id}
                data-stage
                className="relative flex items-start mb-16 md:mb-24 last:mb-0"
              >
                {/* Dot on the line */}
                <div
                  data-dot
                  className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-porcelain z-10 mt-2"
                />

                {/* Content — alternating sides on desktop */}
                <div
                  className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                    isRight ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16'
                  }`}
                >
                  <span
                    data-number
                    className="font-serif text-5xl md:text-6xl text-sand block mb-3"
                  >
                    {stage.number}
                  </span>
                  <h3
                    data-title
                    className="font-serif text-2xl md:text-3xl text-charcoal mb-3 leading-tight"
                  >
                    {stage.title}
                  </h3>
                  <p
                    data-text
                    className="font-sans text-sm md:text-base font-light text-taupe leading-relaxed max-w-sm"
                    style={isRight ? { marginLeft: 'auto' } : undefined}
                  >
                    {stage.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
