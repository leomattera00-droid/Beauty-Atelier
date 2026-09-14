import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { motion as motionConfig } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface PlaceholderPageProps {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export default function PlaceholderPage({ kicker, title, description, children }: PlaceholderPageProps) {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory pt-20">
      <div className="container-editorial text-center py-20">
        {prefersReduced ? (
          <>
            <p className="kicker mb-6">{kicker}</p>
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">{title}</h1>
            <p className="font-sans text-base font-light text-taupe max-w-md mx-auto leading-relaxed">
              {description}
            </p>
            {children}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionConfig.duration.slow, ease: motionConfig.ease.out }}
          >
            <p className="kicker mb-6">{kicker}</p>
            <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">{title}</h1>
            <p className="font-sans text-base font-light text-taupe max-w-md mx-auto leading-relaxed">
              {description}
            </p>
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}
