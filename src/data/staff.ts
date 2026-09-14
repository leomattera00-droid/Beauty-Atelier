/**
 * ATELIER ÉCLAT — Staff Data
 * ────────────────────────────────────────────
 * Editorial portraits for the /staff page. Each member has a
 * large portrait image, name, role, specialties, a philosophy
 * line, and the treatments they perform.
 *
 * Images are placeholder stock — swap URLs here to update.
 */

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  philosophy: string;
  treatments: string[];
  image: string;
  imageAlt: string;
}

export const staffMembers: StaffMember[] = [
  {
    id: 'isabella-rossi',
    name: 'Isabella Rossi',
    role: 'Senior Aesthetician & Founder',
    specialties: ['Face', 'Lashes & Brows', 'Beauty'],
    philosophy:
      'Beauty is not a standard to meet — it is a quality to uncover. Every face tells me what it needs; my job is to listen.',
    treatments: ['Signature Éclat Facial', 'Deep Hydration Facial', 'Anti-Age Ritual', 'LED Light Therapy', 'Microdermabrasion', 'Makeup Application'],
    image: 'https://images.pexels.com/photos/17909398/pexels-photo-17909398.jpeg?auto=compress&cs=tinysrgb&w=900&h=1350&fit=crop',
    imageAlt: 'Young beautician in white holding nail polish in a studio setting.',
  },
  {
    id: 'marco-bianchi',
    name: 'Marco Bianchi',
    role: 'Massage Therapist & Body Specialist',
    specialties: ['Body', 'Massage'],
    philosophy:
      'The body keeps the score of every day lived. My work is to help it forget — one breath, one pressure, one release at a time.',
    treatments: ['Full Body Ritual', 'Deep Tissue / Decontracting Massage', 'Wellness Massage', 'Back / Neck Focus', 'Aromatherapy Massage', 'Lymphatic Drainage'],
    image: 'https://images.pexels.com/photos/3998007/pexels-photo-3998007.jpeg?auto=compress&cs=tinysrgb&w=900&h=1350&fit=crop',
    imageAlt: 'Portrait of a male massage therapist providing a relaxing treatment in a spa.',
  },
  {
    id: 'sofia-conti',
    name: 'Sofia Conti',
    role: 'Lash & Brow Artist',
    specialties: ['Lashes & Brows', 'Beauty'],
    philosophy:
      'The eyes are the first thing we see in another person. Framing them well is the quietest form of confidence.',
    treatments: ['Lash Lift', 'Lash Extensions', 'Brow Shaping', 'Brow Lamination', 'Lash & Brow Tint', 'Special Event Makeup'],
    image: 'https://images.pexels.com/photos/37728722/pexels-photo-37728722.jpeg?auto=compress&cs=tinysrgb&w=900&h=1350&fit=crop',
    imageAlt: 'Female cosmetic expert in an evening setting, ready for a procedure.',
  },
  {
    id: 'giulia-romano',
    name: 'Giulia Romano',
    role: 'Nail & Epilation Technician',
    specialties: ['Nails', 'Epilation'],
    philosophy:
      'Precision is a form of care. Every detail matters because every detail is felt — by the hand, by the skin, by the person.',
    treatments: ['Classic Manicure', 'Gel Manicure', 'Luxury Pedicure', 'Nail Art', 'Full Leg Wax', 'Brazilian Wax', 'Underarm Wax', 'Lip & Chin Wax'],
    image: 'https://images.pexels.com/photos/10600182/pexels-photo-10600182.jpeg?auto=compress&cs=tinysrgb&w=900&h=1350&fit=crop',
    imageAlt: 'Brunette woman holding a honey jar indoors, representing a food therapy concept.',
  },
];
