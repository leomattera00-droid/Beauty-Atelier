import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { routes } from '@/config/brand';

/* ─────────────────────── Config Toggle ────────────────────── */
/*
 * Set `enabled` to false to hide this entire section from the
 * homepage. Businesses without membership packages can simply
 * toggle this off — no code changes needed.
 */

export const membershipConfig = {
  enabled: true,
};

/* ─────────────────────── Package Data ─────────────────────── */

interface MembershipPackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  frequency: string;
  includes: string[];
  featured?: boolean;
}

const packages: MembershipPackage[] = [
  {
    id: 'beauty-ritual',
    name: 'Beauty Ritual',
    tagline: 'The complete monthly experience',
    description:
      'A monthly cadence of care — one signature facial, one body treatment, and a complimentary brow or lash service. Designed for those who treat beauty as a practice, not an event.',
    price: '€280',
    frequency: 'per month',
    includes: [
      'One signature facial (90 min)',
      'One body treatment (60 min)',
      'Complimentary brow or lash service',
      'Priority booking',
    ],
    featured: true,
  },
  {
    id: 'skin-club',
    name: 'Skin Club',
    tagline: 'Recurring facials, evolving results',
    description:
      'A recurring facial membership with a rotating protocol tailored to your skin\u2019s seasonal needs. Includes a quarterly skin assessment and product recommendations.',
    price: '€180',
    frequency: 'per month',
    includes: [
      'One bespoke facial per month (60 min)',
      'Quarterly skin assessment',
      'Personalized product protocol',
      '10% off all skincare retail',
    ],
  },
  {
    id: 'lash-membership',
    name: 'Lash Membership',
    tagline: 'Scheduled maintenance, always flawless',
    description:
      'Never think about your lashes again. Monthly lash lift or extension maintenance, plus a brow shaping at each visit. Consistent, effortless, editorial.',
    price: '€95',
    frequency: 'per month',
    includes: [
      'Monthly lash lift or extension maintenance',
      'Brow shaping at each visit',
      'Lash tint every other month',
      'Priority booking',
    ],
  },
  {
    id: 'body-ritual',
    name: 'Body Ritual',
    tagline: 'Monthly wellness sessions',
    description:
      'A monthly body ritual — rotating between deep tissue, aromatherapy, and lymphatic drainage. For those who carry tension and know the value of regular release.',
    price: '€150',
    frequency: 'per month',
    includes: [
      'One body treatment per month (60 min)',
      'Rotating massage protocol',
      'Quarterly wellness consultation',
      '10% off body care retail',
    ],
  },
];

export default function MembershipPackages() {
  if (!membershipConfig.enabled) return null;

  return (
    <section className="bg-ivory py-24 md:py-40">
      <div className="container-editorial">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="kicker mb-6">Membership</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight max-w-2xl mx-auto">
            Beauty, as a practice
          </h2>
          <p className="font-sans text-sm font-light text-taupe mt-6 max-w-md mx-auto leading-relaxed">
            Recurring packages designed for those who see beauty as ongoing care — not occasional indulgence. Cancel or pause anytime.
          </p>
        </div>

        {/* Editorial offers — not pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-gallery mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group p-8 md:p-10 border transition-all duration-800 ease-editorial ${
                pkg.featured
                  ? 'bg-charcoal text-porcelain border-charcoal'
                  : 'bg-porcelain text-charcoal border-sand/50 hover:border-charcoal'
              }`}
            >
              {/* Tagline */}
              <p
                className={`font-sans text-[10px] uppercase tracking-editorial-wider mb-3 ${
                  pkg.featured ? 'text-accent-light' : 'text-accent'
                }`}
              >
                {pkg.tagline}
              </p>

              {/* Name */}
              <h3 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="font-serif text-2xl">{pkg.price}</span>
                <span
                  className={`font-sans text-xs ${pkg.featured ? 'text-porcelain/50' : 'text-taupe'}`}
                >
                  {pkg.frequency}
                </span>
              </div>

              {/* Description */}
              <p
                className={`font-sans text-sm font-light leading-relaxed mb-6 max-w-sm ${
                  pkg.featured ? 'text-porcelain/60' : 'text-taupe'
                }`}
              >
                {pkg.description}
              </p>

              {/* Includes */}
              <ul className="space-y-2.5 mb-8">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      className={`mt-0.5 shrink-0 ${pkg.featured ? 'text-accent-light' : 'text-accent'}`}
                    />
                    <span
                      className={`font-sans text-xs ${pkg.featured ? 'text-porcelain/80' : 'text-charcoal/80'}`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to={`${routes.booking}?treatment=${pkg.id}`}
                className={`font-sans text-xs uppercase tracking-editorial-wide link-underline ${
                  pkg.featured ? 'text-accent-light' : 'text-accent'
                }`}
              >
                Enquire
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
