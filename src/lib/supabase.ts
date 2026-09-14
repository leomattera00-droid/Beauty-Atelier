import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ─────────────────────── Types ────────────────────────────── */

export interface ServiceRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  short_description: string | null;
  description: string | null;
  duration: string | null;
  price: string | null;
  image: string | null;
  image_alt: string | null;
  enabled: boolean;
  signature: boolean;
}

export interface StaffRow {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  image: string | null;
  specialties: string[];
  enabled: boolean;
  sort_order: number;
}

export interface AvailabilityRow {
  id: string;
  staff_id: string | null;
  slot_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

export interface BookingRow {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string | null;
  service_slug: string;
  service_name: string;
  staff_id: string | null;
  staff_name: string | null;
  booking_date: string;
  booking_time: string;
  status: string;
  created_at: string;
}

export interface BookingInsert {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes?: string | null;
  service_slug: string;
  service_name: string;
  staff_id?: string | null;
  staff_name?: string | null;
  booking_date: string;
  booking_time: string;
}
