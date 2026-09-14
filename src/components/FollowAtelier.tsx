import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { contact, routes } from '@/config/brand';

const socialImages = [
  {
    src: 'https://images.pexels.com/photos/6634844/pexels-photo-6634844.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    alt: 'Serene flat lay of spa essentials including jade roller and bath salts.',
  },
  {
    src: 'https://images.pexels.com/photos/3750640/pexels-photo-3750640.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    alt: 'Luxurious flat lay featuring makeup products, perfume, and elegant fabric.',
  },
  {
    src: 'https://images.pexels.com/photos/4841273/pexels-photo-4841273.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    alt: 'Flat lay of high-end skincare products with stones on a white background.',
  },
  {
    src: 'https://images.pexels.com/photos/28482020/pexels-photo-28482020.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    alt: 'Stylish flat lay of skincare products with natural elements on white fabric.',
  },
  {
    src: 'https://images.pexels.com/photos/39392892/pexels-photo-39392892.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    alt: 'Modern minimalist setup showcasing skincare serum bottles with natural lighting.',
  },
  {
    src: 'https://images.pexels.com/photos/34479708/pexels-photo-34479708.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    alt: 'Sophisticated flat lay featuring a candle, book, and skincare cream on a dark surface.',
  },
];

export default function FollowAtelier() {
  return (
    <section className="bg-porcelain py-24 md:py-40">
      <div className="container-editorial">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="kicker mb-6">Follow the Atelier</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight max-w-2xl mx-auto">
            {contact.instagram}
          </h2>
          <p className="font-sans text-sm font-light text-taupe mt-6 max-w-md mx-auto leading-relaxed">
            A curated visual diary — treatments, textures, and the quiet details of atelier life.
          </p>
        </div>

        {/* Brand-styled image composition — not a raw Instagram feed */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-gallery mx-auto">
          {socialImages.map((img, i) => (
            <a
              key={i}
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden ${
                i === 1 || i === 4 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-1200 ease-editorial will-change-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-espresso/0 group-hover:bg-espresso/20 transition-all duration-800 ease-editorial flex items-center justify-center">
                <Instagram
                  size={24}
                  className="text-porcelain opacity-0 group-hover:opacity-100 transition-opacity duration-800 ease-editorial"
                />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Instagram size={14} className="mr-2" />
            Follow {contact.instagram}
          </a>
        </div>
      </div>
    </section>
  );
}
