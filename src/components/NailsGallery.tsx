import { Link } from 'react-router-dom';
import { nailsGallery, type NailGalleryItem } from '@/data/services';
import { routes } from '@/config/brand';

/* Size → grid span classes for asymmetrical layout */
const sizeClasses: Record<NailGalleryItem['size'], string> = {
  small: 'md:col-span-3 aspect-[3/2]',
  medium: 'md:col-span-4 aspect-[4/3]',
  large: 'md:col-span-6 aspect-[16/10]',
  tall: 'md:col-span-3 aspect-[3/4]',
};

export default function NailsGallery() {
  return (
    <section className="bg-porcelain py-24 md:py-40">
      <div className="container-editorial">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="kicker mb-6">Nails</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight max-w-2xl mx-auto">
            A gallery of finishes
          </h2>
          <p className="font-sans text-sm font-light text-taupe mt-6 max-w-md mx-auto leading-relaxed">
            From minimalist matte to hand-painted detail — hover or tap each piece to discover the style, finish, and color.
          </p>
        </div>

        {/* Asymmetrical grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 max-w-gallery mx-auto">
          {nailsGallery.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden ${sizeClasses[item.size]}`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-1200 ease-editorial will-change-transform group-hover:scale-105"
              />

              {/* Hover/tap reveal overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-editorial flex flex-col justify-end p-5 md:p-6">
                <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-accent-light mb-1">
                  {item.style} · {item.finish}
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-porcelain mb-1">
                  {item.name}
                </h3>
                {item.colorDescription && (
                  <p className="font-sans text-xs font-light text-porcelain/60 mb-3">
                    {item.colorDescription}
                  </p>
                )}
                <Link
                  to={`${routes.booking}?treatment=nails`}
                  className="font-sans text-[10px] uppercase tracking-editorial-wide text-porcelain/80 link-underline"
                >
                  Book this style
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-20">
          <Link to={routes.booking} className="btn-primary">
            Book Your Nails
          </Link>
        </div>
      </div>
    </section>
  );
}
