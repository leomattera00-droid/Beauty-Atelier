/**
 * ATELIER ÉCLAT — Service Data
 * ────────────────────────────────────────────
 * Typed, data-driven service catalog. Each category can be
 * independently toggled via the `enabled` flag — disabled
 * categories are filtered out everywhere automatically.
 *
 * Treatments marked `signature: true` appear in the homepage
 * "Signature Treatments" campaign section.
 */

/* ─────────────────────── Types ────────────────────────────── */

export interface Treatment {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  duration: string;
  price?: string;
  prepInfo?: string;
  contraindications?: string;
  signature?: boolean;
  image?: string;
  imageAlt?: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  enabled: boolean;
  image: string;
  imageAlt: string;
  treatments: Treatment[];
}

/* ─────────────────────── Data ─────────────────────────────── */

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'face',
    slug: 'face',
    name: 'Face',
    description:
      'Bespoke facials and advanced skin therapies designed around your skin\u2019s unique terrain — performed with precision, patience, and the quiet luxury of time.',
    enabled: true,
    image:
      'https://images.pexels.com/photos/7446659/pexels-photo-7446659.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    imageAlt:
      'Aesthetician providing a rejuvenating facial treatment to a client in a modern spa clinic.',
    treatments: [
      {
        id: 'signature-eclat-facial',
        slug: 'signature-eclat-facial',
        name: 'Signature \u00c9clat Facial',
        shortDescription:
          'Our hallmark treatment — a multi-layered facial combining deep cleansing, sculpting massage, and a custom mask.',
        description:
          'The Signature \u00c9clat Facial is our most complete facial experience. It begins with a thorough skin analysis, followed by deep cleansing and gentle exfoliation. A sculpting facial massage lifts and tones, while a custom-blended mask delivers targeted actives. The treatment closes with a hand and arm massage, leaving you radiant and restored.',
        duration: '90 min',
        price: '\u20ac180',
        prepInfo:
          'Arrive with a clean face, free of makeup. Avoid retinol or exfoliating acids for 48 hours prior.',
        contraindications:
          'Not suitable for active acne, open wounds, or recent chemical peels (wait 2 weeks).',
        signature: true,
        image:
          'https://images.pexels.com/photos/7446659/pexels-photo-7446659.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
        imageAlt: 'Aesthetician providing a rejuvenating facial treatment.',
      },
      {
        id: 'deep-hydration-facial',
        slug: 'deep-hydration-facial',
        name: 'Deep Hydration Facial',
        shortDescription:
          'Intensive moisture infusion for dehydrated or stressed skin, using hyaluronic acid and ceramide complexes.',
        description:
          'A deeply nourishing facial designed to replenish moisture at every layer of the skin. After cleansing and exfoliation, a hyaluronic acid serum is infused with ultrasound technology, followed by a ceramide-rich mask and a sealing moisturizer. Ideal for skin depleted by travel, climate, or seasonal change.',
        duration: '60 min',
        price: '\u20ac130',
        prepInfo: 'Arrive with a clean face. No special preparation required.',
        contraindications: 'Avoid if you have a known allergy to hyaluronic acid or ceramides.',
      },
      {
        id: 'anti-age-ritual',
        slug: 'anti-age-ritual',
        name: 'Anti-Age Ritual',
        shortDescription:
          'Targeted treatment with peptide serums, microcurrent lifting, and collagen-stimulating massage.',
        description:
          'A comprehensive anti-ageing treatment combining microcurrent technology for muscle toning, peptide-rich serums for collagen support, and a specialized lifting massage. The ritual finishes with a firming mask and SPF protection.',
        duration: '75 min',
        price: '\u20ac160',
        prepInfo:
          'Discontinue retinol 3 days before. Remove all jewelry from the treatment area.',
        contraindications:
          'Not suitable for pacemaker wearers, pregnant clients, or those with epilepsy.',
      },
      {
        id: 'led-light-therapy',
        slug: 'led-light-therapy',
        name: 'LED Light Therapy',
        shortDescription:
          'Non-invasive light treatment to reduce inflammation, stimulate collagen, and even skin tone.',
        description:
          'A standalone or add-on treatment using clinical-grade LED light. Red light stimulates collagen and reduces inflammation; blue light targets acne-causing bacteria. The session is restful and completely painless.',
        duration: '30 min',
        price: '\u20ac60',
        contraindications:
          'Not suitable for photosensitive conditions or clients taking photosensitizing medication.',
      },
      {
        id: 'microdermabrasion',
        slug: 'microdermabrasion',
        name: 'Microdermabrasion',
        shortDescription:
          'Mechanical exfoliation to resurface texture, refine pores, and reveal fresh, luminous skin.',
        description:
          'A clinical resurfacing treatment using fine crystal exfoliation to remove dead skin cells and stimulate cell renewal. Improves skin texture, reduces the appearance of fine lines and mild scarring, and enhances product absorption.',
        duration: '45 min',
        price: '\u20ac110',
        prepInfo: 'Avoid sun exposure and exfoliating products for 3 days before treatment.',
        contraindications:
          'Not suitable for rosacea, active acne, eczema, or very sensitive skin.',
      },
    ],
  },
  {
    id: 'body',
    slug: 'body',
    name: 'Body',
    description:
      'Rituals that speak in pressure and warmth — each movement calibrated to release, restore, and reconnect body to breath.',
    enabled: true,
    image:
      'https://images.pexels.com/photos/6628649/pexels-photo-6628649.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    imageAlt:
      'Experience relaxation with a full body massage in a serene indoor spa environment.',
    treatments: [
      {
        id: 'full-body-ritual',
        slug: 'full-body-ritual',
        name: 'Full Body Ritual',
        shortDescription:
          'Our signature body experience — a 90-minute journey of massage, exfoliation, and warm wrap.',
        description:
          'The Full Body Ritual is a complete restorative journey. It begins with dry brush exfoliation, followed by a full-body warm oil massage using long, flowing strokes. A warm body wrap with essential oils follows, and the ritual closes with a hydrating moisturizer application.',
        duration: '90 min',
        price: '\u20ac190',
        prepInfo:
          'Shower before arrival. Avoid heavy meals 2 hours prior. Wear comfortable clothing.',
        contraindications: 'Not suitable during the first trimester of pregnancy or with fresh bruising.',
        signature: true,
        image:
          'https://images.pexels.com/photos/6628649/pexels-photo-6628649.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
        imageAlt: 'Full body massage in a serene indoor spa environment.',
      },
      {
        id: 'deep-tissue-massage',
        slug: 'deep-tissue-massage',
        name: 'Deep Tissue / Decontracting Massage',
        shortDescription:
          'Targeted pressure to release chronic tension in the back, shoulders, and neck.',
        description:
          'A therapeutic massage focused on realigning deeper layers of muscle and connective tissue. Slow, deliberate strokes and deep finger pressure address chronic tension patterns, particularly in the neck, shoulders, and lower back.',
        duration: '60 min',
        price: '\u20ac120',
        prepInfo: 'Hydrate well before and after. Communicate pressure preferences to your therapist.',
        contraindications: 'Avoid with osteoporosis, recent fractures, or blood clot conditions.',
      },
      {
        id: 'wellness-massage',
        slug: 'wellness-massage',
        name: 'Wellness Massage',
        shortDescription:
          'A restorative full-body massage with warm oils, designed to calm the nervous system and restore equilibrium.',
        description:
          'A restorative full-body massage using warm, nourishing oils and long, flowing strokes. The Wellness Massage is designed to calm the nervous system, improve circulation, and restore a sense of equilibrium. Pressure is moderate and rhythm is slow.',
        duration: '60 min',
        price: '\u20ac110',
        prepInfo: 'Hydrate well before and after. Avoid heavy meals 2 hours prior.',
        contraindications: 'Not suitable during the first trimester of pregnancy.',
      },
      {
        id: 'back-neck-focus',
        slug: 'back-neck-focus',
        name: 'Back / Neck Focus',
        shortDescription:
          'A concentrated 30-minute treatment for the areas that carry the most tension.',
        description:
          'A focused treatment targeting the back, neck, and shoulders — the areas where stress accumulates most. Deep tissue techniques and trigger point therapy release knots and restore mobility. Ideal for those who sit at a desk or carry tension in the upper body.',
        duration: '30 min',
        price: '\u20ac65',
        prepInfo: 'No special preparation required.',
        contraindications: 'Avoid with recent neck injuries or severe spinal conditions.',
      },
      {
        id: 'aromatherapy-massage',
        slug: 'aromatherapy-massage',
        name: 'Aromatherapy Massage',
        shortDescription:
          'Gentle massage paired with a custom blend of essential oils chosen for your needs.',
        description:
          'A relaxing and restorative massage using a bespoke blend of essential oils selected for your physical and emotional needs. The treatment combines soft tissue techniques with the therapeutic properties of the oils to calm the nervous system and uplift the spirit.',
        duration: '60 min',
        price: '\u20ac110',
        prepInfo: 'Avoid strong fragrances before arrival. Let your therapist know any scent sensitivities.',
        contraindications: 'Not suitable with certain allergies or during pregnancy without approval.',
      },
      {
        id: 'lymphatic-drainage',
        slug: 'lymphatic-drainage',
        name: 'Lymphatic Drainage',
        shortDescription:
          'Gentle, rhythmic technique to reduce fluid retention and support detoxification.',
        description:
          'A specialized gentle massage using light, rhythmic strokes to stimulate lymph flow, reduce swelling, and support the body\u2019s natural detoxification. Particularly effective post-travel, post-surgery (with medical clearance), or for general debloating.',
        duration: '60 min',
        price: '\u20ac130',
        prepInfo: 'Drink plenty of water before and after the session. Avoid alcohol 24 hours prior.',
        contraindications: 'Not suitable with active infections, heart conditions, or thrombosis.',
      },
    ],
  },
  {
    id: 'epilation',
    slug: 'epilation',
    name: 'Epilation',
    description:
      'Precise, hygienic hair removal using warm and hard waxes — gentle on skin, thorough in result.',
    enabled: true,
    image:
      'https://images.pexels.com/photos/6763570/pexels-photo-6763570.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    imageAlt: 'Close-up of a hair removal wax strip being applied.',
    treatments: [
      {
        id: 'full-leg-wax',
        slug: 'full-leg-wax',
        name: 'Full Leg Wax',
        shortDescription: 'Complete leg hair removal with warm strip wax for smooth, lasting results.',
        description:
          'A full leg waxing service using high-quality warm wax. Hair is removed from the top of the thigh to the ankle, leaving skin smooth for up to four weeks. Includes a soothing post-wax lotion to calm the skin.',
        duration: '45 min',
        price: '\u20ac50',
        prepInfo: 'Hair should be at least 5mm long. Exfoliate 24 hours before. Avoid moisturizing on the day.',
        contraindications: 'Not suitable for sunburned skin, or clients using retinol on the body.',
      },
      {
        id: 'brazilian-wax',
        slug: 'brazilian-wax',
        name: 'Brazilian Wax',
        shortDescription: 'Complete intimate hair removal using gentle hard wax for sensitive areas.',
        description:
          'A thorough Brazilian wax using hard wax, which adheres to hair rather than skin, making it ideal for sensitive areas. Includes front, back, and everything in between. A calming post-wax oil is applied to soothe and protect.',
        duration: '30 min',
        price: '\u20ac45',
        prepInfo: 'Hair should be 5\u201310mm long. Avoid caffeine before appointment to reduce sensitivity.',
        contraindications: 'Not suitable during menstruation, pregnancy, or with active skin conditions.',
      },
      {
        id: 'underarm-wax',
        slug: 'underarm-wax',
        name: 'Underarm Wax',
        shortDescription: 'Quick, effective underarm hair removal with warm wax.',
        description:
          'A fast and efficient underarm waxing service. Warm wax removes hair from the root, giving smoother results that last longer than shaving. A soothing lotion is applied afterward.',
        duration: '15 min',
        price: '\u20ac18',
        prepInfo: 'Hair should be at least 5mm long. Avoid deodorant for 24 hours after.',
      },
      {
        id: 'lip-chin-wax',
        slug: 'lip-chin-wax',
        name: 'Lip & Chin Wax',
        shortDescription: 'Precise facial hair removal for upper lip and chin area.',
        description:
          'Gentle facial waxing for the upper lip and chin. Uses a low-temperature sensitive-skin wax formulated for the face. Quick and effective with minimal discomfort.',
        duration: '15 min',
        price: '\u20ac15',
        prepInfo: 'Avoid retinol and exfoliating acids for 3 days before. Do not wax over active breakouts.',
        contraindications: 'Not suitable with rosacea, active cold sores, or recent chemical peels.',
      },
    ],
  },
  {
    id: 'lashes-brows',
    slug: 'lashes-brows',
    name: 'Lashes & Brows',
    description:
      'Framing the eyes with precision — lifts, tints, shaping, and extensions performed with an editorial eye.',
    enabled: true,
    image:
      'https://images.pexels.com/photos/8554941/pexels-photo-8554941.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    imageAlt: 'Beautician applying eyelash extensions to a woman\u2019s eyes.',
    treatments: [
      {
        id: 'lash-lift',
        slug: 'lash-lift',
        name: 'Lash Lift',
        shortDescription:
          'A semi-permanent lift and curl for natural lashes, lasting 6\u20138 weeks.',
        description:
          'A lash lift is a semi-permanent treatment that enhances your natural lashes by lifting and curling them from the root. The effect lasts 6\u20138 weeks and can be paired with a lash tint for added definition. No extensions or daily curling needed.',
        duration: '45 min',
        price: '\u20ac55',
        prepInfo:
          'Remove contact lenses before the appointment. Avoid waterproof mascara for 48 hours after.',
        contraindications: 'Not suitable for very short or damaged lashes, or with eye infections.',
        signature: true,
        image:
          'https://images.pexels.com/photos/31261686/pexels-photo-31261686.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
        imageAlt: 'Beautician providing professional eyebrow care to a client in a salon.',
      },
      {
        id: 'lash-extensions',
        slug: 'lash-extensions',
        name: 'Lash Extensions',
        shortDescription:
          'Individual lash application for volume and length, customized to your eye shape.',
        description:
          'A full set of individual eyelash extensions, applied one by one to your natural lashes. Choose from natural, classic, or volume styles. The application is precise and comfortable, with results lasting 4\u20136 weeks with proper care. Infill recommended every 2\u20133 weeks.',
        duration: '90 min',
        price: '\u20ac120',
        prepInfo: 'Arrive with no eye makeup. Remove contact lenses. Avoid caffeine before the appointment.',
        contraindications: 'Not suitable with eye infections, allergies to adhesives, or very weak natural lashes.',
      },
      {
        id: 'brow-shaping',
        slug: 'brow-shaping',
        name: 'Brow Shaping',
        shortDescription: 'Precision brow architecture using wax, tweezers, and mapping.',
        description:
          'A bespoke brow shaping service that maps your ideal arch based on facial proportions. Combines warm wax, tweezing, and trimming for a clean, defined result. Finishes with a soothing gel.',
        duration: '30 min',
        price: '\u20ac35',
        prepInfo: 'Avoid retinol around the brow area for 3 days prior.',
      },
      {
        id: 'brow-lamination',
        slug: 'brow-lamination',
        name: 'Brow Lamination',
        shortDescription:
          'A smoothing and lifting treatment that sets brows in a uniform direction for 6\u20138 weeks.',
        description:
          'Brow lamination restructures the brow hairs to create a fuller, more uniform look. The treatment lifts and sets the hairs upward, giving a brushed-up effect that lasts 6\u20138 weeks. Can be combined with tint and shaping.',
        duration: '45 min',
        price: '\u20ac50',
        prepInfo: 'Avoid brow makeup on the day. Do not use retinol around the brow area for 3 days prior.',
        contraindications: 'Not suitable with sensitive skin, eczema, or recent brow tinting.',
      },
      {
        id: 'lash-brow-tint',
        slug: 'lash-brow-tint',
        name: 'Lash & Brow Tint',
        shortDescription: 'Custom color tinting to define and deepen natural lashes and brows.',
        description:
          'A tinting service that adds depth and definition to your natural lashes and brows. A patch test is required 24 hours before the first tint. Results last 3\u20134 weeks.',
        duration: '30 min',
        price: '\u20ac25',
        prepInfo: 'A patch test is required 24 hours before your first appointment.',
        contraindications: 'Not suitable with known dye allergies or eye infections.',
      },
    ],
  },
  {
    id: 'nails',
    slug: 'nails',
    name: 'Nails',
    description:
      'Meticulous nail care and finishing — from essential maintenance to lacquered artistry.',
    enabled: true,
    image:
      'https://images.pexels.com/photos/3738377/pexels-photo-3738377.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    imageAlt: 'Close-up of a manicure session in a salon setting.',
    treatments: [
      {
        id: 'classic-manicure',
        slug: 'classic-manicure',
        name: 'Classic Manicure',
        shortDescription:
          'Nail shaping, cuticle care, hand massage, and polish for a clean, refined finish.',
        description:
          'A traditional manicure that includes nail shaping, cuticle care, a relaxing hand massage, and your choice of polish. A timeless essential for well-maintained hands.',
        duration: '45 min',
        price: '\u20ac35',
        prepInfo: 'Remove existing polish before arrival if possible.',
      },
      {
        id: 'gel-manicure',
        slug: 'gel-manicure',
        name: 'Gel Manicure',
        shortDescription:
          'Long-lasting, high-shine gel polish that stays flawless for up to 3 weeks.',
        description:
          'A durable gel manicure that provides a glossy, chip-free finish lasting up to 3 weeks. Includes nail preparation, gel polish application, and curing under LED light. Finishes with cuticle oil.',
        duration: '60 min',
        price: '\u20ac45',
        prepInfo: 'Ensure nails are bare. Avoid cutting cuticles for 3 days before.',
        contraindications: 'Not suitable with nail infections or very thin, damaged nails.',
      },
      {
        id: 'luxury-pedicure',
        slug: 'luxury-pedicure',
        name: 'Luxury Pedicure',
        shortDescription:
          'An extended pedicure with soak, exfoliation, mask, massage, and polish.',
        description:
          'A comprehensive foot care treatment that includes a warm soak, callus removal, exfoliation, a nourishing mask, foot and leg massage, and polish. The ultimate in foot care and relaxation.',
        duration: '75 min',
        price: '\u20ac65',
        prepInfo: 'Bring open-toe shoes for after the appointment.',
      },
      {
        id: 'nail-art',
        slug: 'nail-art',
        name: 'Nail Art',
        shortDescription:
          'Custom nail art — from minimalist line work to full painted designs.',
        description:
          'Bespoke nail art applied by our specialist. From subtle metallic accents to full hand-painted designs. Pricing varies by complexity; consult with your technician.',
        duration: '30\u201360 min',
        price: '\u20ac15+',
        prepInfo: 'Book as an add-on to a manicure or pedicure.',
      },
    ],
  },
  {
    id: 'beauty',
    slug: 'beauty',
    name: 'Beauty',
    description:
      'Editorial makeup for life\u2019s moments — applied with a light, confident hand and an eye for natural luminosity.',
    enabled: true,
    image:
      'https://images.pexels.com/photos/21316248/pexels-photo-21316248.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    imageAlt: 'Close-up of a woman with a gold leaf facial mask in a spa.',
    treatments: [
      {
        id: 'makeup-application',
        slug: 'makeup-application',
        name: 'Makeup Application',
        shortDescription:
          'A natural, luminous makeup look tailored to your features and occasion.',
        description:
          'A professional makeup application tailored to your features, skin tone, and the occasion. Our approach favors skin-first, luminous makeup that enhances rather than masks. Includes consultation, base, eyes, lips, and setting.',
        duration: '60 min',
        price: '\u20ac90',
        prepInfo: 'Arrive with a clean, moisturized face. Bring inspiration photos if desired.',
      },
      {
        id: 'bridal-makeup',
        slug: 'bridal-makeup',
        name: 'Bridal Makeup',
        shortDescription:
          'A complete bridal makeup experience with trial session and wedding-day application.',
        description:
          'A full bridal makeup service including a pre-wedding trial to perfect your look, and a wedding-day application at the atelier or on-site. We use long-wearing, photograph-friendly products for a flawless finish that lasts from ceremony to reception.',
        duration: '90 min',
        price: '\u20ac250',
        prepInfo: 'Trial session recommended 4\u20136 weeks before the event. Maintain a consistent skincare routine.',
        contraindications: 'Patch test required for any new products 48 hours before trial.',
      },
      {
        id: 'special-event-makeup',
        slug: 'special-event-makeup',
        name: 'Special Event Makeup',
        shortDescription:
          'A polished, high-impact look for galas, parties, and photography.',
        description:
          'A glamorous makeup application designed for evening events, galas, and photography. Features stronger definition, contouring, and long-wearing products for a look that stays flawless all night.',
        duration: '60 min',
        price: '\u20ac100',
        prepInfo: 'Arrive with a clean face. Avoid heavy moisturizer on the day.',
      },
    ],
  },
  {
    id: 'hair',
    slug: 'hair',
    name: 'Hair',
    description:
      'Cutting, coloring, and conditioning treatments performed with precision and a deep respect for hair health.',
    enabled: false,
    image:
      'https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
    imageAlt: 'A stylist applying hair color to a client in a modern salon.',
    treatments: [
      {
        id: 'cut-and-style',
        slug: 'cut-and-style',
        name: 'Cut & Style',
        shortDescription: 'Precision cut with consultation, wash, and blow-dry finish.',
        description:
          'A full haircut service including consultation, wash, cut, and blow-dry styling. Our stylists work with your hair\u2019s natural texture and your lifestyle to create a cut that grows out beautifully.',
        duration: '60 min',
        price: '\u20ac70',
        prepInfo: 'Arrive with clean, dry hair if possible.',
      },
      {
        id: 'color-treatment',
        slug: 'color-treatment',
        name: 'Color Treatment',
        shortDescription: 'Full color, balayage, or root touch-up with premium color lines.',
        description:
          'A custom color service using premium, low-ammonia color lines. Includes consultation, color application, processing, wash, and blow-dry. Options include full color, balayage, highlights, or root touch-up.',
        duration: '120 min',
        price: '\u20ac120+',
        prepInfo: 'Avoid washing hair for 48 hours before color. Patch test required for new clients.',
        contraindications: 'Not suitable with scalp conditions, allergies to hair dye, or recent henna use.',
      },
      {
        id: 'keratin-treatment',
        slug: 'keratin-treatment',
        name: 'Keratin Treatment',
        shortDescription: 'Smoothing and strengthening treatment for frizz-free, manageable hair.',
        description:
          'A keratin smoothing treatment that reduces frizz, adds shine, and makes hair more manageable for up to 4 months. The treatment is applied, sealed with heat, and finished with a blow-dry.',
        duration: '120 min',
        price: '\u20ac180',
        prepInfo: 'Avoid washing for 72 hours after treatment. Use sulfate-free shampoo.',
        contraindications: 'Not suitable for very damaged or bleached hair. Patch test required.',
      },
    ],
  },
];

/* ─────────────────────── Wellness / Massage ───────────────── */
/*
 * Separate data for the Massage & Wellness homepage section.
 * These overlap with the Body category but are presented in a
 * warmer, darker visual context on the homepage.
 */

export interface WellnessService {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export const wellnessServices: WellnessService[] = [
  {
    id: 'relaxing-massage',
    name: 'Relaxing Massage',
    description:
      'Long, unhurried strokes with warm oil — designed to quiet the nervous system and dissolve the day\u2019s accumulation of tension.',
    duration: '60 min',
    price: '\u20ac110',
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue / Decontracting',
    description:
      'Slow, deliberate pressure that reaches deep muscle layers — releasing chronic holding patterns in the back, shoulders, and neck.',
    duration: '60 min',
    price: '\u20ac120',
  },
  {
    id: 'wellness-massage',
    name: 'Wellness Massage',
    description:
      'A restorative full-body experience combining warm oils, flowing rhythm, and the quiet luxury of time — for body and breath alike.',
    duration: '60 min',
    price: '\u20ac110',
  },
  {
    id: 'back-neck-focus',
    name: 'Back / Neck Focus',
    description:
      'A concentrated treatment for the areas that carry the most — targeted deep tissue work to restore mobility and ease.',
    duration: '30 min',
    price: '\u20ac65',
  },
  {
    id: 'body-rituals',
    name: 'Body Rituals',
    description:
      'Multi-phase journeys of exfoliation, warm wrap, and massage — the most complete body experiences we offer.',
    duration: '90 min',
    price: '\u20ac190',
  },
];

/* ─────────────────────── Epilation Areas ───────────────────── */
/*
 * Configurable area-based pricing for the Epilation section.
 * Each area has its own duration, price, and description.
 */

export interface EpilationArea {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

export const epilationAreas: EpilationArea[] = [
  {
    id: 'face',
    name: 'Face',
    duration: '15 min',
    price: '\u20ac15',
    description: 'Upper lip, chin, and sideburn area using gentle sensitive-skin wax.',
  },
  {
    id: 'arms',
    name: 'Arms',
    duration: '30 min',
    price: '\u20ac35',
    description: 'Full arm or half arm wax using warm strip wax for smooth, lasting results.',
  },
  {
    id: 'underarms',
    name: 'Underarms',
    duration: '15 min',
    price: '\u20ac18',
    description: 'Quick, effective underarm hair removal with warm wax.',
  },
  {
    id: 'legs',
    name: 'Legs',
    duration: '45 min',
    price: '\u20ac50',
    description: 'Full leg or half leg wax from thigh to ankle with warm strip wax.',
  },
  {
    id: 'bikini',
    name: 'Bikini',
    duration: '30 min',
    price: '\u20ac45',
    description: 'Bikini or Brazilian wax using gentle hard wax for sensitive areas.',
  },
  {
    id: 'full-body',
    name: 'Full Body',
    duration: '120 min',
    price: '\u20ac150',
    description: 'Complete head-to-toe waxing experience — the most thorough option we offer.',
  },
];

/* ─────────────────────── Beauty Ritual Stages ─────────────── */

export interface RitualStage {
  id: string;
  number: string;
  title: string;
  text: string;
}

export const beautyRitualStages: RitualStage[] = [
  {
    id: 'arrival',
    number: '01',
    title: 'Arrival',
    text: 'You step from the street into a hush of warm ivory and soft light. The city falls away. You are handed a cup of tea and given all the time you need to arrive fully.',
  },
  {
    id: 'consultation',
    number: '02',
    title: 'Consultation',
    text: 'Your specialist listens — to your skin, your history, your hopes. A plan takes shape, tailored not to a template but to you, in this moment, on this day.',
  },
  {
    id: 'treatment',
    number: '03',
    title: 'Treatment',
    text: 'Hands work with precision and patience. Each movement is deliberate, each product chosen. You feel the shift from doing to receiving, from holding to letting go.',
  },
  {
    id: 'care',
    number: '04',
    title: 'Care',
    text: 'The treatment closes with a ritual of care — a finishing touch, a warm towel, a moment of stillness. Your skin speaks first; your mind follows.',
  },
  {
    id: 'aftercare',
    number: '05',
    title: 'Aftercare',
    text: 'You leave with a handwritten plan — what to do, what to avoid, what to expect. The atelier follows up. The care does not end at the door; it simply changes form.',
  },
];

/* ─────────────────────── Nails Gallery ────────────────────── */

export interface NailGalleryItem {
  id: string;
  image: string;
  alt: string;
  name: string;
  style: string;
  finish: string;
  colorDescription?: string;
  /** Size variant for asymmetrical layout. */
  size: 'small' | 'medium' | 'large' | 'tall';
}

export const nailsGallery: NailGalleryItem[] = [
  {
    id: 'nail-01',
    image:
      'https://images.pexels.com/photos/34941688/pexels-photo-34941688.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop',
    alt: 'Close-up of a hand with manicured nails holding a white and gold decorative flower.',
    name: 'Porcelain & Gold',
    style: 'Minimalist',
    finish: 'Matte',
    colorDescription: 'Soft ivory base with gold leaf accents.',
    size: 'tall',
  },
  {
    id: 'nail-02',
    image:
      'https://images.pexels.com/photos/3738377/pexels-photo-3738377.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop',
    alt: 'Close-up of a manicure session with detailed nail work.',
    name: 'Atelier Classic',
    style: 'French',
    finish: 'Gloss',
    colorDescription: 'Natural pink with white tips.',
    size: 'medium',
  },
  {
    id: 'nail-03',
    image:
      'https://images.pexels.com/photos/34373402/pexels-photo-34373402.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop',
    alt: 'Close-up of a hand with manicured nails and gold rings.',
    name: 'Sand & Stone',
    style: 'Textured',
    finish: 'Matte',
    colorDescription: 'Warm taupe with a stone-like matte finish.',
    size: 'tall',
  },
  {
    id: 'nail-04',
    image:
      'https://images.pexels.com/photos/5484948/pexels-photo-5484948.png?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop',
    alt: 'Close-up of hands during a manicure with detailed nail art.',
    name: 'Line Work',
    style: 'Graphic',
    finish: 'Gloss',
    colorDescription: 'Charcoal lines on a porcelain base.',
    size: 'small',
  },
  {
    id: 'nail-05',
    image:
      'https://images.pexels.com/photos/4783331/pexels-photo-4783331.jpeg?auto=compress&cs=tinysrgb&w=800&h=533&fit=crop',
    alt: 'Close-up of red nail polish being applied.',
    name: 'Terracotta',
    style: 'Solid',
    finish: 'Gloss',
    colorDescription: 'Muted terracotta in a high-shine finish.',
    size: 'medium',
  },
  {
    id: 'nail-06',
    image:
      'https://images.pexels.com/photos/7664093/pexels-photo-7664093.jpeg?auto=compress&cs=tinysrgb&w=800&h=1067&fit=crop',
    alt: 'Close-up of a manicured hand with unique nail art on pastel fabric.',
    name: 'Brushstroke',
    style: 'Hand-painted',
    finish: 'Satin',
    colorDescription: 'Soft beige with hand-painted accent strokes.',
    size: 'tall',
  },
];

/* ─────────────────────── Helpers ──────────────────────────── */

export function getEnabledCategories(): ServiceCategory[] {
  return serviceCategories.filter((c) => c.enabled);
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  for (const cat of serviceCategories) {
    const found = cat.treatments.find((t) => t.slug === slug);
    if (found) return found;
  }
  return undefined;
}

export function getCategoryForTreatment(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.treatments.some((t) => t.slug === slug));
}

export function getSignatureTreatments(): { treatment: Treatment; category: ServiceCategory }[] {
  const result: { treatment: Treatment; category: ServiceCategory }[] = [];
  for (const cat of getEnabledCategories()) {
    for (const t of cat.treatments) {
      if (t.signature) {
        result.push({ treatment: t, category: cat });
      }
    }
  }
  return result;
}
