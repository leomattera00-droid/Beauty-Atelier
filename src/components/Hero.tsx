import { useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { brand, booking, routes, imagery, motion as motionConfig } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SilkCanvas = lazy(() => import('@/components/SilkCanvas'));

export default function Hero() {
  const prefersReduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: motionConfig.duration.slow, ease: motionConfig.ease.out, delay },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={prefersReduced ? { opacity: 1 } : { scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.4, ease: motionConfig.ease.out }}
      >
        <img
          src={imagery.hero.src}
          alt={imagery.hero.alt}
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/40 via-espresso/20 to-espresso/60" />
      </motion.div>

      {/* WebGL silk overlay — lazy-loaded, skipped on low-power/reduced-motion */}
      {!prefersReduced && (
        <div className="absolute inset-0 z-[1] opacity-40 mix-blend-soft-light">
          <Suspense fallback={null}>
            <SilkCanvas />
          </Suspense>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-sans text-xs uppercase tracking-editorial-wider text-porcelain/70 mb-6"
        >
          Milano · Est. 2019
        </motion.p>

        <motion.h1
          custom={0.5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-porcelain tracking-editorial-wide mb-4"
        >
          {brand.name}
        </motion.h1>

        <motion.p
          custom={0.8}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-xl md:text-2xl text-porcelain/90 italic mb-3"
        >
          {brand.tagline}
        </motion.p>

        <motion.p
          custom={1.0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-sans text-xs uppercase tracking-editorial-wider text-porcelain/60 mb-12"
        >
          {brand.supportingLine}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to={routes.treatments} className="btn-primary">
            {booking.exploreCtaLabel}
          </Link>
          <Link
            to={routes.booking}
            className="btn-secondary border-porcelain/40 text-porcelain hover:bg-porcelain hover:text-charcoal hover:border-porcelain"
          >
            {booking.ctaLabel}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!prefersReduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-sans text-[10px] uppercase tracking-editorial-wider text-porcelain/50">
              Scroll
            </span>
            <ArrowDown size={16} className="text-porcelain/50" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
