import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Seo from '@/components/Seo';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface InteriorScene {
  image: string;
  alt: string;
  caption: string;
  subcaption: string;
  /** Layout hint for the overlapping composition. */
  span: 'wide' | 'tall' | 'standard';
  offset: 'left' | 'right' | 'center';
}

const scenes: InteriorScene[] = [
  {
    image: 'https://images.pexels.com/photos/7195804/pexels-photo-7195804.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    alt: 'White beauty couch with lamp between decorated brick wall and window in a stylish light salon with sunshine.',
    caption: 'The Treatment Rooms',
    subcaption: 'Three private rooms, each calibrated for a different ritual — facial, body, and wellness. Warm light, clean lines, and the hush of a space designed to slow time.',
    span: 'wide',
    offset: 'center',
  },
  {
    image: 'https://images.pexels.com/photos/18859076/pexels-photo-18859076.jpeg?auto=compress&cs=tinysrgb&w=900&h=1350&fit=crop',
    alt: 'A cozy hotel interior featuring an elegant wooden desk with a warm ambiance.',
    caption: 'Reception',
    subcaption: 'A welcome, not a desk. Tea is poured. Coats are taken. The city is left at the door.',
    span: 'tall',
    offset: 'right',
  },
  {
    image: 'https://images.pexels.com/photos/13068360/pexels-photo-13068360.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    alt: 'Sleek and contemporary beauty salon interior featuring black tables and white chairs with natural lighting.',
    caption: 'The Manicure Station',
    subcaption: 'A long marble counter, soft task lighting, and a view of nothing but calm. Designed for the quiet focus that nail work demands.',
    span: 'standard',
    offset: 'left',
  },
  {
    image: 'https://images.pexels.com/photos/13068380/pexels-photo-13068380.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    alt: 'Sleek modern nail salon interior with stylish design and treatment station.',
    caption: 'The Beauty Bar',
    subcaption: 'Mirrors framed in brushed brass. Adjustable lighting that reads true in daylight. A station built for precision — and for the luxury of being looked after.',
    span: 'standard',
    offset: 'right',
  },
  {
    image: 'https://images.pexels.com/photos/6560308/pexels-photo-6560308.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    alt: 'A tranquil massage room with natural light and neatly arranged furnishings for relaxation.',
    caption: 'The Wellness Room',
    subcaption: 'The deepest room in the atelier — furthest from the street, closest to stillness. Heated table, dimmed light, and the scent of warm oil.',
    span: 'wide',
    offset: 'center',
  },
  {
    image: 'https://images.pexels.com/photos/4974566/pexels-photo-4974566.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    alt: 'Chic and modern beauty salon interior featuring stylish decor, mirrors, and professional equipment.',
    caption: 'Textures & Light',
    subcaption: 'Brushed brass, warm ivory plaster, linen drapes, and oak floors. Every material chosen for how it feels — not just how it photographs.',
    span: 'standard',
    offset: 'left',
  },
];

export default function Interiors() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];
    const images = container.querySelectorAll('[data-scene-image]');

    images.forEach((img) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
      tl.fromTo(img, { scale: 1.2, yPercent: -8 }, { scale: 1, yPercent: 8, ease: 'none' });
      triggers.push(tl.scrollTrigger!);
    });

    const captions = container.querySelectorAll('[data-caption]');
    captions.forEach((cap) => {
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: cap,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });
      tl2.fromTo(cap.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: 'none' }
      );
      triggers.push(tl2.scrollTrigger!);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [prefersReduced]);

  return (
    <div ref={containerRef} className="min-h-screen pt-20 bg-ivory">
      <Seo
        title="Interiors — A Space for Stillness"
        description="Warm ivory walls, soft light, and the hush of a room designed to slow time. Explore the atelier's interior at ATELIER ÉCLAT, Milano."
        path="/interni"
      />
      {/* Page header */}
      <div className="container-editorial py-16 md:py-24 text-center">
        <p className="kicker mb-6">A Space for Stillness</p>
        <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">Interiors</h1>
        <p className="font-sans text-base font-light text-taupe max-w-md mx-auto leading-relaxed">
          Warm ivory walls, soft light, and the hush of a room designed to slow time. What will it feel like when you walk through the door?
        </p>
      </div>

      {/* Immersive overlapping image composition */}
      <div className="container-editorial pb-24 md:pb-32">
        <div className="space-y-16 md:space-y-24">
          {scenes.map((scene, i) => {
            const isWide = scene.span === 'wide';
            const isTall = scene.span === 'tall';

            return (
              <div
                key={i}
                className={`relative flex flex-col ${
                  scene.offset === 'right'
                    ? 'lg:flex-row lg:items-end'
                    : scene.offset === 'left'
                      ? 'lg:flex-row-reverse lg:items-end'
                      : 'items-center'
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${
                    isWide
                      ? 'w-full aspect-[16/10]'
                      : isTall
                        ? 'w-full lg:w-2/5 aspect-[3/4] lg:-mr-12'
                        : 'w-full lg:w-3/5 aspect-[4/3]'
                  }`}
                >
                  <img
                    data-scene-image
                    src={scene.image}
                    alt={scene.alt}
                    className="h-full w-full object-cover will-change-transform"
                  />
                </div>

                {/* Caption — overlapping the image on desktop */}
                <div
                  data-caption
                  className={`relative bg-ivory p-6 md:p-10 max-w-md ${
                    scene.offset === 'right'
                      ? 'lg:-ml-16 lg:mb-8'
                      : scene.offset === 'left'
                        ? 'lg:-mr-16 lg:mb-8'
                        : '-mt-12 md:-mt-16 mx-auto'
                  }`}
                >
                  <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-accent mb-3">
                    {String(i + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-3 leading-tight">
                    {scene.caption}
                  </h2>
                  <p className="font-sans text-sm font-light text-taupe leading-relaxed">
                    {scene.subcaption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
