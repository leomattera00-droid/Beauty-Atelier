import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description: string;
  /** Open Graph image URL */
  image?: string;
  /** Canonical path (e.g. '/trattamenti') */
  path?: string;
  /** JSON-LD structured data objects to inject */
  structuredData?: object | object[];
}

const SITE_URL = 'https://ateliereclat.it';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function Seo({ title, description, image, path, structuredData }: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes('ATELIER') ? title : `${title} — ATELIER ÉCLAT`;
    document.title = fullTitle;

    const canonicalUrl = `${SITE_URL}${path || '/'}`;
    upsertLink('canonical', canonicalUrl);

    upsertMeta('name', 'description', description);

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', 'website');
    if (image) upsertMeta('property', 'og:image', image);

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', image);

    // Structured data
    if (structuredData) {
      const items = Array.isArray(structuredData) ? structuredData : [structuredData];
      items.forEach((item, i) => {
        upsertJsonLd(`jsonld-${i}`, item);
      });
    }

    return () => {
      // Clean up JSON-LD on unmount
      if (structuredData) {
        const items = Array.isArray(structuredData) ? structuredData : [structuredData];
        items.forEach((_, i) => {
          const el = document.getElementById(`jsonld-${i}`);
          if (el) el.remove();
        });
      }
    };
  }, [title, description, image, path, structuredData]);

  return null;
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'ATELIER ÉCLAT',
  description: 'Luxury beauty and wellness center in Milano offering face, skin, body, and ritual treatments.',
  url: SITE_URL,
  telephone: '+39 02 1234 5678',
  email: 'concierge@ateliereclat.it',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via della Spiga 12',
    addressLocality: 'Milano',
    postalCode: '20121',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.4687,
    longitude: 9.1954,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://instagram.com/ateliereclat',
    'https://tiktok.com/@ateliereclat',
  ],
};

export function serviceJsonLd(service: { name: string; description: string; duration: string; price?: string; category: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'HealthAndBeautyBusiness',
      name: 'ATELIER ÉCLAT',
    },
    serviceType: service.category,
    offers: service.price
      ? {
          '@type': 'Offer',
          price: service.price.replace('€', ''),
          priceCurrency: 'EUR',
        }
      : undefined,
  };
}
