import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { getEnabledCategories, type ServiceCategory } from '@/data/services';
import { routes } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ServiceExplorer() {
  const categories = getEnabledCategories();
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = usePrefersReducedMotion();
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const activeCategory: ServiceCategory = categories[activeIndex];

  const animateIn = useCallback(() => {
    if (prefersReduced || !contentRef.current) return;

    const tl = gsap.timeline();
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' }, 0);
    }
    if (textRef.current) {
      tl.fromTo(textRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' }, 0.2);
    }
    if (rowsRef.current) {
      tl.fromTo(rowsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, 0.5);
    }
  }, [prefersReduced]);

  useEffect(() => {
    animateIn();
  }, [activeIndex, animateIn]);

  const selectCategory = useCallback((index: number) => {
    if (index === activeIndex || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (prefersReduced || !contentRef.current) {
      setActiveIndex(index);
      isAnimatingRef.current = false;
      return;
    }

    gsap.to(contentRef.current, {
      opacity: 0,
      y: 15,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setActiveIndex(index);
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
        isAnimatingRef.current = false;
      },
    });
  }, [activeIndex, prefersReduced]);

  // Mobile swipe
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 50) return;
    if (delta < 0 && activeIndex < categories.length - 1) {
      selectCategory(activeIndex + 1);
    } else if (delta > 0 && activeIndex > 0) {
      selectCategory(activeIndex - 1);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <div className="container-editorial py-16 md:py-24">
        {/* Page header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="kicker mb-6">Face / Skin / Body / Rituals</p>
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">Treatments</h1>
          <p className="font-sans text-base font-light text-taupe max-w-md mx-auto leading-relaxed">
            A curated menu of bespoke facials, body rituals, and wellness experiences — each designed around your skin's unique needs and the luxury of unhurried time.
          </p>
        </div>

        {/* Mobile category strip */}
        <div className="md:hidden mb-12 overflow-x-auto -mx-6 px-6 pb-2">
          <div className="flex gap-6 min-w-max">
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => selectCategory(i)}
                className={`font-sans text-xs uppercase tracking-editorial-wide whitespace-nowrap pb-2 border-b transition-all duration-600 ${
                  i === activeIndex
                    ? 'text-accent border-accent'
                    : 'text-taupe border-transparent'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop two-panel layout */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-12 lg:gap-20">
          {/* Left: category selector */}
          <div className="hidden md:block">
            <ul className="space-y-1">
              {categories.map((cat, i) => (
                <li key={cat.id}>
                  <button
                    onClick={() => selectCategory(i)}
                    className={`w-full text-left py-3 font-sans text-sm uppercase tracking-editorial-wide transition-all duration-600 ease-editorial border-l-2 pl-4 ${
                      i === activeIndex
                        ? 'text-charcoal border-accent'
                        : 'text-taupe border-transparent hover:text-charcoal hover:border-sand'
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: visual area */}
          <div
            ref={contentRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="min-h-[60vh]"
          >
            {/* Image */}
            <div className="relative overflow-hidden aspect-[16/10] mb-10 md:mb-14">
              <img
                ref={imageRef}
                src={activeCategory.image}
                alt={activeCategory.imageAlt}
                className="h-full w-full object-cover will-change-transform"
              />
            </div>

            {/* Category title + description */}
            <div ref={textRef} className="mb-12">
              <span className="kicker block mb-4">{activeCategory.name}</span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal leading-tight mb-5">
                {activeCategory.name}
              </h2>
              <p className="font-sans text-base font-light text-taupe leading-relaxed max-w-xl">
                {activeCategory.description}
              </p>
            </div>

            {/* Treatment rows */}
            <div ref={rowsRef} className="divide-y divide-sand/50">
              {activeCategory.treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="group py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
                >
                  <div className="flex-1">
                    <Link
                      to={`${routes.treatments}/${treatment.slug}`}
                      className="font-serif text-xl md:text-2xl text-charcoal hover:text-accent transition-colors duration-600"
                    >
                      {treatment.name}
                    </Link>
                    <p className="font-sans text-sm font-light text-taupe mt-1 max-w-md">
                      {treatment.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                    <span className="font-sans text-xs uppercase tracking-editorial-wide text-taupe">
                      {treatment.duration}
                    </span>
                    {treatment.price && (
                      <span className="font-sans text-sm text-charcoal">
                        {treatment.price}
                      </span>
                    )}
                    <Link
                      to={`${routes.booking}?treatment=${treatment.slug}`}
                      className="font-sans text-[10px] uppercase tracking-editorial-wide text-accent link-underline shrink-0"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
