/**
 * ATELIER ÉCLAT — Central Brand Configuration
 * ────────────────────────────────────────────
 * Every visual and textual element of the site reads from this file.
 * Edit branding, colors, fonts, hours, contact, and imagery here —
 * never touch individual components.
 */

/* ─────────────────────── Brand Identity ─────────────────────── */

export const brand = {
  name: 'ATELIER ÉCLAT',
  tagline: 'Beauty, carefully considered.',
  supportingLine: 'Face / Body / Beauty / Wellness',
  /** Short mark used in the navbar on narrow screens. */
  shortName: 'ÉCLAT',
  /** Path or URL to a logo image; leave null to render the wordmark in type. */
  logo: null as string | null,
} as const;

/* ─────────────────────── Navigation Routes ──────────────────── */

export const routes = {
  home: '/',
  treatments: '/trattamenti',
  booking: '/prenota',
  staff: '/staff',
  interiors: '/interni',
  contact: '/contatti',
} as const;

export const navLinks: { label: string; path: string }[] = [
  { label: 'Treatments', path: routes.treatments },
  { label: 'Book', path: routes.booking },
  { label: 'Atelier', path: routes.staff },
  { label: 'Interiors', path: routes.interiors },
  { label: 'Contact', path: routes.contact },
];

/* ─────────────────────── Color Palette ──────────────────────── */
/*
 * Each token maps to a CSS variable (--c-*) defined in index.css.
 * Change the hex here AND in index.css to re-theme the entire site.
 * The `accent` color is the one configurable accent — default:
 * muted terracotta. Swap it to re-theme the accent across the site.
 */

export const colors = {
  ivory: '#F7F3ED',        // warm ivory — primary background
  porcelain: '#FBF9F5',    // porcelain — lighter surface
  beige: '#E8E0D5',         // soft beige — subtle surfaces
  sand: '#D8CDBD',          // sand — borders, dividers
  taupe: '#A89A86',         // taupe — muted text, secondary
  charcoal: '#3A3633',      // charcoal — primary text
  espresso: '#221E1B',      // espresso — darkest tone, footer
  metallic: '#B0A696',      // muted metallic accent — details
  accent: '#B5795C',        // configurable accent — muted terracotta
  accentLight: '#D4A78C',   // accent — lighter shade
  accentDark: '#965A40',    // accent — darker shade
} as const;

/* ─────────────────────── Typography ────────────────────────── */
/*
 * Fonts are loaded via Google Fonts in index.html.
 * `serif`  → editorial serif for headlines
 * `sans`   → clean modern sans-serif for UI / body
 */

export const fonts = {
  serif: "'Cormorant Garamond', 'Times New Roman', serif",
  sans: "'Jost', 'Helvetica Neue', sans-serif",
} as const;

/* ─────────────────────── Opening Hours ─────────────────────── */

export const openingHours: { day: string; hours: string }[] = [
  { day: 'Monday', hours: 'Closed' },
  { day: 'Tuesday – Friday', hours: '9:00 — 19:00' },
  { day: 'Saturday', hours: '10:00 — 18:00' },
  { day: 'Sunday', hours: 'Closed' },
];

/* ─────────────────────── Contact Details ───────────────────── */

export const contact = {
  address: 'Via della Spiga 12, 20121 Milano, Italia',
  phone: '+39 02 1234 5678',
  email: 'concierge@ateliereclat.it',
  instagram: '@ateliereclat',
  instagramUrl: 'https://instagram.com/ateliereclat',
} as const;

/* ─────────────────────── Booking ───────────────────────────── */

export const booking = {
  url: 'https://book.ateliereclat.it',
  ctaLabel: 'Book an Appointment',
  exploreCtaLabel: 'Explore Treatments',
} as const;

/* ─────────────────────── Editorial Imagery ─────────────────── */
/*
 * Curated stock photography for the hero and scroll sequence.
 * Swap URLs here to change imagery site-wide. All images are
 * license-free from Pexels.
 */

export const imagery = {
  hero: {
    /** Full-screen hero background — close-up skincare texture. */
    src: 'https://images.pexels.com/photos/6635929/pexels-photo-6635929.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop',
    alt: 'Extreme close-up of a woman applying cream to her cheek for healthy skin care.',
  },
  scrollSequence: [
    {
      src: 'https://images.pexels.com/photos/7321660/pexels-photo-7321660.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
      alt: 'Close-up of a woman in a bathrobe applying skincare cream, self-care and beauty routine.',
      kicker: 'Face',
      title: 'The Architecture of Skin',
      text: 'Bespoke facials designed around your skin\'s unique terrain — performed with precision, patience, and the quiet luxury of time.',
    },
    {
      src: 'https://images.pexels.com/photos/6187298/pexels-photo-6187298.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
      alt: 'Close-up of hands performing a soothing facial massage for relaxation and wellness.',
      kicker: 'Body',
      title: 'The Language of Touch',
      text: 'Rituals that speak in pressure and warmth — each movement calibrated to release, restore, and reconnect body to breath.',
    },
    {
      src: 'https://images.pexels.com/photos/17640382/pexels-photo-17640382.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
      alt: 'Elegant modern spa interior featuring plush furniture and minimalist decor.',
      kicker: 'Rituals',
      title: 'A Space for Stillness',
      text: 'An atelier conceived as a pause — warm ivory walls, soft light, and the hush of a room designed to slow time.',
    },
  ],
} as const;

/* ─────────────────────── Animation Settings ────────────────── */
/*
 * Central tuning for motion durations and easing. Respected by
 * both Framer Motion and GSAP. `prefers-reduced-motion` is handled
 * in the hooks/components — these values are for the default case.
 */

export const motion = {
  duration: {
    slow: 1.6,
    medium: 1.0,
    fast: 0.6,
  },
  ease: {
    out: [0.16, 1, 0.3, 1] as [number, number, number, number],
    inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
  },
} as const;
