import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Tag, Info, AlertCircle } from 'lucide-react';
import Seo, { serviceJsonLd } from '@/components/Seo';
import { getTreatmentBySlug, getCategoryForTreatment, getEnabledCategories } from '@/data/services';
import { routes, motion as motionConfig } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function TreatmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const treatment = slug ? getTreatmentBySlug(slug) : undefined;
  const category = slug ? getCategoryForTreatment(slug) : undefined;

  if (!treatment || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory pt-20">
        <div className="text-center px-6">
          <p className="kicker mb-6">Not Found</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
            Treatment not found
          </h1>
          <p className="font-sans text-sm font-light text-taupe mb-8">
            The treatment you're looking for doesn't exist or has been removed.
          </p>
          <Link to={routes.treatments} className="btn-primary">
            View All Treatments
          </Link>
        </div>
      </div>
    );
  }

  // Find next treatment in the same category
  const treatmentsInCategory = category.treatments;
  const currentIndex = treatmentsInCategory.findIndex((t) => t.slug === treatment.slug);
  const nextTreatment = treatmentsInCategory[(currentIndex + 1) % treatmentsInCategory.length];

  const image = treatment.image || category.image;
  const imageAlt = treatment.imageAlt || category.imageAlt;

  const fadeIn = prefersReduced
    ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <Seo
        title={`${treatment.name} — ${category.name}`}
        description={treatment.shortDescription}
        image={image}
        path={`/trattamenti/${treatment.slug}`}
        structuredData={serviceJsonLd({
          name: treatment.name,
          description: treatment.description,
          duration: treatment.duration,
          price: treatment.price,
          category: category.name,
        })}
      />
      <div className="container-editorial py-16 md:py-24">
        {/* Back link */}
        <button
          onClick={() => navigate(routes.treatments)}
          className="group flex items-center gap-2 font-sans text-xs uppercase tracking-editorial-wide text-taupe hover:text-charcoal transition-colors duration-600 mb-12"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-600" />
          All Treatments
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image */}
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ duration: motionConfig.duration.slow, ease: motionConfig.ease.out }}
            className="relative overflow-hidden aspect-[4/5] lg:sticky lg:top-32"
          >
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ duration: motionConfig.duration.slow, ease: motionConfig.ease.out, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="kicker block mb-4">{category.name}</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6">
                {treatment.name}
              </h1>
              <p className="font-sans text-base md:text-lg font-light text-taupe leading-relaxed">
                {treatment.description}
              </p>
            </div>

            {/* Quick facts */}
            <div className="flex flex-wrap gap-6 py-6 border-y border-sand/50">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-metallic" />
                <span className="font-sans text-sm text-charcoal">{treatment.duration}</span>
              </div>
              {treatment.price && (
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-metallic" />
                  <span className="font-sans text-sm text-charcoal">{treatment.price}</span>
                </div>
              )}
            </div>

            {/* Prep info */}
            {treatment.prepInfo && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Info size={16} className="text-metallic" />
                  <h3 className="font-sans text-xs uppercase tracking-editorial-wider text-metallic">
                    Preparation
                  </h3>
                </div>
                <p className="font-sans text-sm font-light text-taupe leading-relaxed">
                  {treatment.prepInfo}
                </p>
              </div>
            )}

            {/* Contraindications */}
            {treatment.contraindications && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-metallic" />
                  <h3 className="font-sans text-xs uppercase tracking-editorial-wider text-metallic">
                    Contraindications
                  </h3>
                </div>
                <p className="font-sans text-sm font-light text-taupe leading-relaxed">
                  {treatment.contraindications}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="pt-4">
              <Link
                to={`${routes.booking}?treatment=${treatment.slug}`}
                className="btn-primary"
              >
                Book this treatment
              </Link>
            </div>

            {/* Next treatment */}
            {nextTreatment && nextTreatment.slug !== treatment.slug && (
              <Link
                to={`${routes.treatments}/${nextTreatment.slug}`}
                className="group flex items-center justify-between py-6 border-t border-sand/50 mt-4"
              >
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic mb-1">
                    Next in {category.name}
                  </p>
                  <p className="font-serif text-xl text-charcoal group-hover:text-accent transition-colors duration-600">
                    {nextTreatment.name}
                  </p>
                </div>
                <ArrowRight size={20} className="text-taupe group-hover:text-accent group-hover:translate-x-1 transition-all duration-600" />
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
