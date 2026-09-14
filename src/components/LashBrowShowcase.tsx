import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MoveHorizontal } from 'lucide-react';
import { routes } from '@/config/brand';

/* ─────────────────────── Before/After Slider ─────────────── */

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

function BeforeAfterSlider({ beforeImage, afterImage, beforeAlt, afterAlt }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };
  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden aspect-[4/3] cursor-ew-resize select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* After image (full) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <span className="absolute top-4 right-4 z-10 font-sans text-[10px] uppercase tracking-editorial-wider text-porcelain bg-espresso/60 px-3 py-1">
        After
      </span>

      {/* Before image (clipped via clip-path so it never reflows) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <span className="absolute top-4 left-4 z-10 font-sans text-[10px] uppercase tracking-editorial-wider text-porcelain bg-espresso/60 px-3 py-1">
          Before
        </span>
      </div>

      {/* Drag handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-porcelain pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-porcelain/90 flex items-center justify-center shadow-lg">
          <MoveHorizontal size={16} className="text-charcoal" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Showcase Section ─────────────────── */

const showcaseImages = [
  {
    src: 'https://images.pexels.com/photos/37187979/pexels-photo-37187979.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop',
    alt: 'Vivid close-up of a green eye with prominent lashes in warm sunlight.',
    label: 'Lash Lift',
    slug: 'lash-lift',
  },
  {
    src: 'https://images.pexels.com/photos/37187964/pexels-photo-37187964.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop',
    alt: 'Detailed close-up of a blue eye with blonde eyelashes in natural light.',
    label: 'Lash Extensions',
    slug: 'lash-extensions',
  },
  {
    src: 'https://images.pexels.com/photos/5128265/pexels-photo-5128265.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop',
    alt: 'Beautician performs eyebrow microblading on a woman in a modern salon.',
    label: 'Brow Shaping',
    slug: 'brow-shaping',
  },
];

export default function LashBrowShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-ivory py-24 md:py-40">
      <div className="container-editorial">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="kicker mb-6">Lashes & Brows</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight max-w-2xl mx-auto">
            Framed by precision
          </h2>
          <p className="font-sans text-sm font-light text-taupe mt-6 max-w-md mx-auto leading-relaxed">
            Macro-level detail, editorial results. A portfolio of lash and brow transformations — drag to compare before and after.
          </p>
        </div>

        {/* Before/After slider — ready to use, populated with placeholder macro imagery */}
        <div className="max-w-gallery mx-auto mb-16 md:mb-24">
          <div className="relative group">
            <BeforeAfterSlider
              beforeImage={showcaseImages[0].src}
              afterImage={showcaseImages[1].src}
              beforeAlt={showcaseImages[0].alt}
              afterAlt={showcaseImages[1].alt}
            />
            <p className="text-center mt-4 font-sans text-xs text-taupe">
              Drag the handle to compare — placeholder imagery. Real results will be added soon.
            </p>
          </div>
        </div>

        {/* Portfolio thumbnails with zoom-on-hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-gallery mx-auto">
          {showcaseImages.map((item, i) => (
            <div
              key={item.slug}
              className="group cursor-pointer"
              onClick={() => setActiveIndex(i)}
            >
              <div className="relative overflow-hidden aspect-[3/4]">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-1200 ease-editorial will-change-transform group-hover:scale-105"
                />
                {/* Label overlay on interaction */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-editorial flex items-end p-6">
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-accent-light mb-1">
                      Treatment
                    </p>
                    <p className="font-serif text-xl text-porcelain">{item.label}</p>
                    <Link
                      to={`${routes.treatments}/${item.slug}`}
                      className="font-sans text-[10px] uppercase tracking-editorial-wide text-porcelain/80 link-underline mt-2 inline-block"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
