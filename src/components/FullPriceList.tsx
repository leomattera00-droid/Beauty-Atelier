import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { serviceCategories, type ServiceCategory, type Treatment } from '@/data/services';
import { routes } from '@/config/brand';

/* ─────────────────────── Filter Definitions ──────────────── */

interface FilterDef {
  id: string;
  label: string;
  /** Category slugs that match this filter. */
  matchSlugs: string[];
}

const filters: FilterDef[] = [
  { id: 'all', label: 'All', matchSlugs: [] },
  { id: 'face', label: 'Face', matchSlugs: ['face'] },
  { id: 'body', label: 'Body', matchSlugs: ['body'] },
  { id: 'massage', label: 'Massage', matchSlugs: ['body'] },
  { id: 'lashes', label: 'Lashes', matchSlugs: ['lashes-brows'] },
  { id: 'brows', label: 'Brows', matchSlugs: ['lashes-brows'] },
  { id: 'nails', label: 'Nails', matchSlugs: ['nails'] },
  { id: 'epilation', label: 'Epilation', matchSlugs: ['epilation'] },
  { id: 'hair', label: 'Hair', matchSlugs: ['hair'] },
  { id: 'makeup', label: 'Makeup', matchSlugs: ['beauty'] },
];

/* ─────────────────────── Helpers ──────────────────────────── */

interface FlatRow {
  treatment: Treatment;
  category: ServiceCategory;
}

function flattenTreatments(): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const cat of serviceCategories) {
    if (!cat.enabled) continue;
    for (const t of cat.treatments) {
      rows.push({ treatment: t, category: cat });
    }
  }
  return rows;
}

/* ─────────────────────── Component ─────────────────────────── */

export default function FullPriceList() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['all']);
  const allRows = useMemo(() => flattenTreatments(), []);

  const filteredRows = useMemo(() => {
    if (activeFilters.includes('all')) return allRows;

    const matchSlugs = new Set<string>();
    for (const f of filters) {
      if (activeFilters.includes(f.id)) {
        f.matchSlugs.forEach((s) => matchSlugs.add(s));
      }
    }

    // Special case: "massage" filter shows only massage-related body treatments
    if (activeFilters.includes('massage') && !activeFilters.includes('body')) {
      return allRows.filter(
        (row) =>
          matchSlugs.has(row.category.slug) &&
          (row.treatment.slug.includes('massage') ||
            row.treatment.slug.includes('tissue') ||
            row.treatment.slug.includes('wellness') ||
            row.treatment.slug.includes('back-neck') ||
            row.treatment.slug.includes('aromatherapy') ||
            row.treatment.slug.includes('lymphatic') ||
            row.treatment.slug.includes('body-ritual'))
      );
    }

    // Special case: "lashes" vs "brows" — split lashes-brows category
    if (activeFilters.includes('lashes') && !activeFilters.includes('brows')) {
      return allRows.filter(
        (row) =>
          row.category.slug === 'lashes-brows' &&
          row.treatment.slug.includes('lash')
      );
    }
    if (activeFilters.includes('brows') && !activeFilters.includes('lashes')) {
      return allRows.filter(
        (row) =>
          row.category.slug === 'lashes-brows' &&
          row.treatment.slug.includes('brow')
      );
    }

    return allRows.filter((row) => matchSlugs.has(row.category.slug));
  }, [activeFilters, allRows]);

  const toggleFilter = (id: string) => {
    if (id === 'all') {
      setActiveFilters(['all']);
      return;
    }
    setActiveFilters((prev) => {
      const without = prev.filter((f) => f !== 'all');
      if (without.includes(id)) {
        const next = without.filter((f) => f !== id);
        return next.length === 0 ? ['all'] : next;
      }
      return [...without, id];
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <div className="container-editorial py-16 md:py-24">
        {/* Page header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="kicker mb-6">Face / Skin / Body / Rituals</p>
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">Treatments</h1>
          <p className="font-sans text-base font-light text-taupe max-w-md mx-auto leading-relaxed">
            A curated menu of bespoke facials, body rituals, and wellness experiences — each designed around your skin's unique needs and the luxury of unhurried time.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 md:mb-16">
          {filters.map((filter) => {
            const isActive = activeFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-5 py-2.5 font-sans text-xs uppercase tracking-editorial-wide transition-all duration-600 ease-editorial border ${
                  isActive
                    ? 'bg-charcoal text-porcelain border-charcoal'
                    : 'bg-transparent text-taupe border-sand hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Price list rows */}
        <div className="max-w-gallery mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredRows.map((row) => (
              <motion.div
                key={row.treatment.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group py-6 border-b border-sand/40 last:border-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic">
                        {row.category.name}
                      </span>
                    </div>
                    <Link
                      to={`${routes.treatments}/${row.treatment.slug}`}
                      className="font-serif text-xl md:text-2xl text-charcoal hover:text-accent transition-colors duration-600"
                    >
                      {row.treatment.name}
                    </Link>
                    <p className="font-sans text-sm font-light text-taupe mt-1 max-w-md">
                      {row.treatment.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                    <span className="font-sans text-xs uppercase tracking-editorial-wide text-taupe">
                      {row.treatment.duration}
                    </span>
                    {row.treatment.price && (
                      <span className="font-sans text-sm text-charcoal min-w-[3rem] text-right">
                        {row.treatment.price}
                      </span>
                    )}
                    <Link
                      to={`${routes.booking}?treatment=${row.treatment.slug}`}
                      className="font-sans text-[10px] uppercase tracking-editorial-wide text-accent link-underline shrink-0"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredRows.length === 0 && (
            <div className="text-center py-20">
              <p className="font-sans text-sm font-light text-taupe">
                No treatments match the selected filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
