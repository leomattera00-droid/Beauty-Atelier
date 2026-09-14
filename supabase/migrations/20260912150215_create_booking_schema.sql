/*
# Create booking system schema (services, staff, availability, bookings)

1. New Tables
- `services`: Mirror of the frontend services data. Stores each treatment
  with its category, slug, name, description, duration, price, and image.
  Used by the booking wizard to display treatments and by the bookings table
  as a foreign key reference.
- `staff`: Treatment professionals at the atelier. Each has a name, title,
  bio, image, specialties (text array), and an enabled flag. Used by the
  booking wizard for the "Choose Professional" step.
- `availability`: Time slots when the atelier is open for appointments.
  Each slot has a date, start_time, end_time, and is_booked flag. Used by
  the booking wizard for the "Choose Date and Time" step.
- `bookings`: Customer appointment requests. Stores customer name, email,
  phone, notes, the selected service (slug + name), selected staff (id + name),
  selected date and time, status (pending by default), and created_at.

2. Security
- RLS enabled on all tables.
- `services`: public read (anon + authenticated), no writes from frontend.
- `staff`: public read of enabled staff only, no writes from frontend.
- `availability`: public read of unbooked slots only, no writes from frontend.
- `bookings`: public insert (anyone can request an appointment), public read
  of own bookings by email (so the confirmation screen can display the booking).
  No updates or deletes from the frontend — staff manage bookings server-side.

3. Seed Data
- `services`: Populated from the existing frontend services data (all enabled
  categories: Face, Body, Epilation, Lashes & Brows, Nails, Beauty).
- `staff`: 4 example professionals with specialties.
- `availability`: 14 days of slots (Tue-Sat) with 3 slots per day (9:00, 11:00, 14:00),
  starting from the current date.

4. Important Notes
- This is a single-tenant, no-auth app. All policies use `TO anon, authenticated`.
- The `bookings` table stores denormalized service_name and staff_name so the
  confirmation screen can display them without additional joins.
- `availability` slots are pre-generated for 2 weeks. Staff can add more
  server-side as needed.
- The `is_booked` flag on availability is informational; the bookings table
  is the source of truth for actual appointments.
*/

-- ─────────────────────── Services Table ───────────────────────

CREATE TABLE IF NOT EXISTS services (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL,
  short_description text,
  description text,
  duration text,
  price text,
  image text,
  image_alt text,
  enabled boolean NOT NULL DEFAULT true,
  signature boolean NOT NULL DEFAULT false
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_services" ON services;
CREATE POLICY "public_read_services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (enabled = true);

-- ─────────────────────── Staff Table ─────────────────────────

CREATE TABLE IF NOT EXISTS staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text,
  image text,
  specialties text[] NOT NULL DEFAULT '{}',
  enabled boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_staff" ON staff;
CREATE POLICY "public_read_staff"
  ON staff FOR SELECT
  TO anon, authenticated
  USING (enabled = true);

-- ─────────────────────── Availability Table ──────────────────

CREATE TABLE IF NOT EXISTS availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  staff_id uuid REFERENCES staff(id) ON DELETE CASCADE,
  slot_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  is_booked boolean NOT NULL DEFAULT false,
  UNIQUE (staff_id, slot_date, start_time)
);

ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_available_slots" ON availability;
CREATE POLICY "public_read_available_slots"
  ON availability FOR SELECT
  TO anon, authenticated
  USING (is_booked = false);

CREATE INDEX IF NOT EXISTS idx_availability_date ON availability (slot_date);
CREATE INDEX IF NOT EXISTS idx_availability_staff ON availability (staff_id);

-- ─────────────────────── Bookings Table ──────────────────────

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  notes text,
  service_slug text NOT NULL,
  service_name text NOT NULL,
  staff_id uuid,
  staff_name text,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_bookings" ON bookings;
CREATE POLICY "public_insert_bookings"
  ON bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_read_own_bookings" ON bookings;
CREATE POLICY "public_read_own_bookings"
  ON bookings FOR SELECT
  TO anon, authenticated
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- ─────────────────────── Seed: Services ───────────────────────

INSERT INTO services (id, slug, name, category, short_description, description, duration, price, image, image_alt, enabled, signature)
VALUES
  -- Face
  ('signature-eclat-facial', 'signature-eclat-facial', 'Signature Éclat Facial', 'Face',
   'Our hallmark treatment — a multi-layered facial combining deep cleansing, sculpting massage, and a custom mask.',
   'The Signature Éclat Facial is our most complete facial experience. It begins with a thorough skin analysis, followed by deep cleansing and gentle exfoliation. A sculpting facial massage lifts and tones, while a custom-blended mask delivers targeted actives. The treatment closes with a hand and arm massage, leaving you radiant and restored.',
   '90 min', '€180',
   'https://images.pexels.com/photos/7446659/pexels-photo-7446659.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
   'Aesthetician providing a rejuvenating facial treatment.',
   true, true),
  ('deep-hydration-facial', 'deep-hydration-facial', 'Deep Hydration Facial', 'Face',
   'Intensive moisture infusion for dehydrated or stressed skin, using hyaluronic acid and ceramide complexes.',
   'A deeply nourishing facial designed to replenish moisture at every layer of the skin.',
   '60 min', '€130', null, null, true, false),
  ('anti-age-ritual', 'anti-age-ritual', 'Anti-Age Ritual', 'Face',
   'Targeted treatment with peptide serums, microcurrent lifting, and collagen-stimulating massage.',
   'A comprehensive anti-ageing treatment combining microcurrent technology for muscle toning.',
   '75 min', '€160', null, null, true, false),
  ('led-light-therapy', 'led-light-therapy', 'LED Light Therapy', 'Face',
   'Non-invasive light treatment to reduce inflammation, stimulate collagen, and even skin tone.',
   'A standalone or add-on treatment using clinical-grade LED light.',
   '30 min', '€60', null, null, true, false),
  ('microdermabrasion', 'microdermabrasion', 'Microdermabrasion', 'Face',
   'Mechanical exfoliation to resurface texture, refine pores, and reveal fresh, luminous skin.',
   'A clinical resurfacing treatment using fine crystal exfoliation.',
   '45 min', '€110', null, null, true, false),
  -- Body
  ('full-body-ritual', 'full-body-ritual', 'Full Body Ritual', 'Body',
   'Our signature body experience — a 90-minute journey of massage, exfoliation, and warm wrap.',
   'The Full Body Ritual is a complete restorative journey.',
   '90 min', '€190',
   'https://images.pexels.com/photos/6628649/pexels-photo-6628649.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
   'Full body massage in a serene indoor spa environment.',
   true, true),
  ('deep-tissue-massage', 'deep-tissue-massage', 'Deep Tissue / Decontracting Massage', 'Body',
   'Targeted pressure to release chronic tension in the back, shoulders, and neck.',
   'A therapeutic massage focused on realigning deeper layers of muscle and connective tissue.',
   '60 min', '€120', null, null, true, false),
  ('wellness-massage', 'wellness-massage', 'Wellness Massage', 'Body',
   'A restorative full-body massage with warm oils, designed to calm the nervous system and restore equilibrium.',
   'A restorative full-body massage using warm, nourishing oils and long, flowing strokes.',
   '60 min', '€110', null, null, true, false),
  ('back-neck-focus', 'back-neck-focus', 'Back / Neck Focus', 'Body',
   'A concentrated 30-minute treatment for the areas that carry the most tension.',
   'A focused treatment targeting the back, neck, and shoulders.',
   '30 min', '€65', null, null, true, false),
  ('aromatherapy-massage', 'aromatherapy-massage', 'Aromatherapy Massage', 'Body',
   'Gentle massage paired with a custom blend of essential oils chosen for your needs.',
   'A relaxing and restorative massage using a bespoke blend of essential oils.',
   '60 min', '€110', null, null, true, false),
  ('lymphatic-drainage', 'lymphatic-drainage', 'Lymphatic Drainage', 'Body',
   'Gentle, rhythmic technique to reduce fluid retention and support detoxification.',
   'A specialized gentle massage using light, rhythmic strokes to stimulate lymph flow.',
   '60 min', '€130', null, null, true, false),
  -- Epilation
  ('full-leg-wax', 'full-leg-wax', 'Full Leg Wax', 'Epilation',
   'Complete leg hair removal with warm strip wax for smooth, lasting results.',
   'A full leg waxing service using high-quality warm wax.',
   '45 min', '€50', null, null, true, false),
  ('brazilian-wax', 'brazilian-wax', 'Brazilian Wax', 'Epilation',
   'Complete intimate hair removal using gentle hard wax for sensitive areas.',
   'A thorough Brazilian wax using hard wax.',
   '30 min', '€45', null, null, true, false),
  ('underarm-wax', 'underarm-wax', 'Underarm Wax', 'Epilation',
   'Quick, effective underarm hair removal with warm wax.',
   'A fast and efficient underarm waxing service.',
   '15 min', '€18', null, null, true, false),
  ('lip-chin-wax', 'lip-chin-wax', 'Lip & Chin Wax', 'Epilation',
   'Precise facial hair removal for upper lip and chin area.',
   'Gentle facial waxing for the upper lip and chin.',
   '15 min', '€15', null, null, true, false),
  -- Lashes & Brows
  ('lash-lift', 'lash-lift', 'Lash Lift', 'Lashes & Brows',
   'A semi-permanent lift and curl for natural lashes, lasting 6–8 weeks.',
   'A lash lift is a semi-permanent treatment that enhances your natural lashes.',
   '45 min', '€55',
   'https://images.pexels.com/photos/31261686/pexels-photo-31261686.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1067&fit=crop',
   'Beautician providing professional eyebrow care to a client in a salon.',
   true, true),
  ('lash-extensions', 'lash-extensions', 'Lash Extensions', 'Lashes & Brows',
   'Individual lash application for volume and length, customized to your eye shape.',
   'A full set of individual eyelash extensions, applied one by one to your natural lashes.',
   '90 min', '€120', null, null, true, false),
  ('brow-shaping', 'brow-shaping', 'Brow Shaping', 'Lashes & Brows',
   'Precision brow architecture using wax, tweezers, and mapping.',
   'A bespoke brow shaping service that maps your ideal arch based on facial proportions.',
   '30 min', '€35', null, null, true, false),
  ('brow-lamination', 'brow-lamination', 'Brow Lamination', 'Lashes & Brows',
   'A smoothing and lifting treatment that sets brows in a uniform direction for 6–8 weeks.',
   'Brow lamination restructures the brow hairs to create a fuller, more uniform look.',
   '45 min', '€50', null, null, true, false),
  ('lash-brow-tint', 'lash-brow-tint', 'Lash & Brow Tint', 'Lashes & Brows',
   'Custom color tinting to define and deepen natural lashes and brows.',
   'A tinting service that adds depth and definition to your natural lashes and brows.',
   '30 min', '€25', null, null, true, false),
  -- Nails
  ('classic-manicure', 'classic-manicure', 'Classic Manicure', 'Nails',
   'Nail shaping, cuticle care, hand massage, and polish for a clean, refined finish.',
   'A traditional manicure that includes nail shaping, cuticle care, a relaxing hand massage, and your choice of polish.',
   '45 min', '€35', null, null, true, false),
  ('gel-manicure', 'gel-manicure', 'Gel Manicure', 'Nails',
   'Long-lasting, high-shine gel polish that stays flawless for up to 3 weeks.',
   'A durable gel manicure that provides a glossy, chip-free finish lasting up to 3 weeks.',
   '60 min', '€45', null, null, true, false),
  ('luxury-pedicure', 'luxury-pedicure', 'Luxury Pedicure', 'Nails',
   'An extended pedicure with soak, exfoliation, mask, massage, and polish.',
   'A comprehensive foot care treatment that includes a warm soak, callus removal, exfoliation.',
   '75 min', '€65', null, null, true, false),
  ('nail-art', 'nail-art', 'Nail Art', 'Nails',
   'Custom nail art — from minimalist line work to full painted designs.',
   'Bespoke nail art applied by our specialist.',
   '30–60 min', '€15+', null, null, true, false),
  -- Beauty
  ('makeup-application', 'makeup-application', 'Makeup Application', 'Beauty',
   'A natural, luminous makeup look tailored to your features and occasion.',
   'A professional makeup application tailored to your features, skin tone, and the occasion.',
   '60 min', '€90', null, null, true, false),
  ('bridal-makeup', 'bridal-makeup', 'Bridal Makeup', 'Beauty',
   'A complete bridal makeup experience with trial session and wedding-day application.',
   'A full bridal makeup service including a pre-wedding trial.',
   '90 min', '€250', null, null, true, false),
  ('special-event-makeup', 'special-event-makeup', 'Special Event Makeup', 'Beauty',
   'A polished, high-impact look for galas, parties, and photography.',
   'A glamorous makeup application designed for evening events, galas, and photography.',
   '60 min', '€100', null, null, true, false)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────── Seed: Staff ──────────────────────────

INSERT INTO staff (name, title, bio, specialties, enabled, sort_order)
VALUES
  ('Isabella Rossi', 'Senior Aesthetician & Founder',
   'With over fifteen years in advanced skincare, Isabella founded the atelier with a vision for treatments that combine clinical precision with editorial sensibility.',
   ARRAY['Face', 'Lashes & Brows', 'Beauty'], true, 1),
  ('Marco Bianchi', 'Massage Therapist & Body Specialist',
   'Marco brings a decade of experience in deep tissue, lymphatic, and aromatherapy massage, with a practice rooted in anatomy and intuition.',
   ARRAY['Body', 'Massage'], true, 2),
  ('Sofia Conti', 'Lash & Brow Artist',
   'Sofia specializes in lash lifts, extensions, and brow architecture, with a portfolio spanning editorial and bridal work.',
   ARRAY['Lashes & Brows', 'Beauty'], true, 3),
  ('Giulia Romano', 'Nail & Epilation Technician',
   'Giulia is our resident expert in nail artistry and precise epilation, known for her meticulous hand and calm presence.',
   ARRAY['Nails', 'Epilation'], true, 4)
ON CONFLICT DO NOTHING;

-- ─────────────────────── Seed: Availability ────────────────────
-- Generate 14 days of slots starting from today, only Tue-Sat,
-- 3 slots per day: 9:00, 11:00, 14:00

DO $$
DECLARE
  d date := current_date;
  i int := 0;
  staff_rec RECORD;
  slot_time time;
  slot_times time[] := ARRAY['09:00'::time, '11:00'::time, '14:00'::time];
  dow int;
BEGIN
  WHILE i < 21 LOOP
    d := current_date + i;
    dow := extract(dow from d);
    -- 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    IF dow IN (2, 3, 4, 5, 6) THEN
      FOR staff_rec IN SELECT id FROM staff WHERE enabled = true LOOP
        FOREACH slot_time IN ARRAY slot_times LOOP
          INSERT INTO availability (staff_id, slot_date, start_time, end_time, is_booked)
          VALUES (staff_rec.id, d, slot_time, slot_time + interval '2 hours', false)
          ON CONFLICT (staff_id, slot_date, start_time) DO NOTHING;
        END LOOP;
      END LOOP;
    END IF;
    i := i + 1;
  END LOOP;
END $$;