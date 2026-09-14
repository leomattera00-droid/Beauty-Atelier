import { useState } from 'react';
import { Link } from 'react-router-dom';
import { epilationAreas } from '@/data/services';
import { routes } from '@/config/brand';

const epilationImage =
  'https://images.pexels.com/photos/6899549/pexels-photo-6899549.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop';

export default function EpilationSection() {
  const [activeAreaId, setActiveAreaId] = useState(epilationAreas[0].id);
  const activeArea = epilationAreas.find((a) => a.id === activeAreaId) || epilationAreas[0];

  return (
    <section className="bg-ivory py-24 md:py-40">
      <div className="container-editorial">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="kicker mb-6">Epilation</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight max-w-2xl mx-auto">
            Precise. Gentle. Complete.
          </h2>
          <p className="font-sans text-sm font-light text-taupe mt-6 max-w-md mx-auto leading-relaxed">
            Hygienic waxing performed with professional-grade products and an unhurried, meticulous hand. Select an area to see details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-gallery mx-auto">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <img
              src={epilationImage}
              alt="Interior of a modern beauty salon with skin products."
              className="h-full w-full object-cover"
            />
          </div>

          {/* Area selector + details */}
          <div>
            {/* Area pills */}
            <div className="flex flex-wrap gap-3 mb-10">
              {epilationAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveAreaId(area.id)}
                  className={`px-5 py-3 font-sans text-xs uppercase tracking-editorial-wide transition-all duration-600 ease-editorial border ${
                    area.id === activeAreaId
                      ? 'bg-charcoal text-porcelain border-charcoal'
                      : 'bg-transparent text-taupe border-sand hover:border-charcoal hover:text-charcoal'
                  }`}
                >
                  {area.name}
                </button>
              ))}
            </div>

            {/* Active area details */}
            <div className="border-t border-sand/50 pt-8">
              <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
                {activeArea.name}
              </h3>
              <p className="font-sans text-sm md:text-base font-light text-taupe leading-relaxed mb-6 max-w-md">
                {activeArea.description}
              </p>
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic mb-1">
                    Duration
                  </p>
                  <p className="font-sans text-sm text-charcoal">{activeArea.duration}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic mb-1">
                    Price
                  </p>
                  <p className="font-sans text-sm text-charcoal">{activeArea.price}</p>
                </div>
              </div>
              <Link
                to={`${routes.booking}?treatment=epilation-${activeArea.id}`}
                className="btn-primary"
              >
                Book this treatment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
