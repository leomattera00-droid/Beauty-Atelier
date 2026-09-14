import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Tag, User, Calendar, Loader2, AlertCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import {
  serviceCategories,
  getEnabledCategories,
  getTreatmentBySlug,
  getCategoryForTreatment,
  type ServiceCategory,
  type Treatment,
} from '@/data/services';
import { routes } from '@/config/brand';
import { supabase, type StaffRow, type AvailabilityRow } from '@/lib/supabase';

/* ─────────────────────── Types ────────────────────────────── */

interface BookingState {
  category: ServiceCategory | null;
  treatment: Treatment | null;
  staff: StaffRow | null;
  noPreference: boolean;
  date: string | null;
  time: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
}

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS: { num: Step; label: string }[] = [
  { num: 1, label: 'Category' },
  { num: 2, label: 'Treatment' },
  { num: 3, label: 'Professional' },
  { num: 4, label: 'Date & Time' },
  { num: 5, label: 'Your Details' },
];

/* ─────────────────────── Date Helpers ──────────────────────── */

function getNextOpenDays(count: number): { date: string; dayName: string; dayNum: string; monthName: string }[] {
  const days: { date: string; dayName: string; dayNum: string; monthName: string }[] = [];
  const today = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let i = 0;
  while (days.length < count && i < 30) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    // 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    if (dow >= 2 && dow <= 6) {
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        dayName: dayNames[dow],
        dayNum: String(d.getDate()).padStart(2, '0'),
        monthName: monthNames[d.getMonth()],
      });
    }
    i++;
  }
  return days;
}

/* ─────────────────────── Component ─────────────────────────── */

export default function Booking() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>(1);
  const [state, setState] = useState<BookingState>({
    category: null,
    treatment: null,
    staff: null,
    noPreference: false,
    date: null,
    time: null,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: '',
  });

  const [staffList, setStaffList] = useState<StaffRow[]>([]);
  const [slots, setSlots] = useState<AvailabilityRow[]>([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ id: string; date: string; time: string; treatmentName: string; staffName: string } | null>(null);

  const categories = getEnabledCategories();
  const openDays = getNextOpenDays(10);

  /* ───────── Pre-fill from query param ───────── */

  useEffect(() => {
    const treatmentSlug = searchParams.get('treatment');
    if (treatmentSlug) {
      const treatment = getTreatmentBySlug(treatmentSlug);
      const category = getCategoryForTreatment(treatmentSlug);
      if (treatment && category) {
        setState((prev) => ({ ...prev, treatment, category }));
        setStep(3);
        return;
      }
    }
    setStep(1);
  }, [searchParams]);

  /* ───────── Fetch staff ───────── */

  useEffect(() => {
    if (step !== 3) return;
    if (staffList.length > 0) return;
    setLoadingStaff(true);
    supabase
      .from('staff')
      .select('*')
      .eq('enabled', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setStaffList(data as StaffRow[]);
        setLoadingStaff(false);
      });
  }, [step, staffList.length]);

  /* ───────── Fetch availability ───────── */

  useEffect(() => {
    if (step !== 4) return;
    setLoadingSlots(true);
    const startDate = openDays[0]?.date;
    const endDate = openDays[openDays.length - 1]?.date;
    if (!startDate || !endDate) return;

    let query = supabase
      .from('availability')
      .select('*')
      .eq('is_booked', false)
      .gte('slot_date', startDate)
      .lte('slot_date', endDate);

    if (!state.noPreference && state.staff) {
      query = query.eq('staff_id', state.staff.id);
    }

    query.then(({ data, error }) => {
      if (!error && data) setSlots(data as AvailabilityRow[]);
      setLoadingSlots(false);
    });
  }, [step, state.staff, state.noPreference]);

  /* ───────── Handlers ───────── */

  const selectCategory = (cat: ServiceCategory) => {
    setState((prev) => ({ ...prev, category: cat, treatment: null }));
    setStep(2);
  };

  const selectTreatment = (t: Treatment) => {
    setState((prev) => ({ ...prev, treatment: t }));
    setStep(3);
  };

  const selectStaff = (s: StaffRow | null) => {
    if (s === null) {
      setState((prev) => ({ ...prev, staff: null, noPreference: true }));
    } else {
      setState((prev) => ({ ...prev, staff: s, noPreference: false }));
    }
    setStep(4);
  };

  const selectDate = (date: string) => {
    setState((prev) => ({ ...prev, date, time: null }));
  };

  const selectTime = (time: string) => {
    setState((prev) => ({ ...prev, time }));
  };

  const goBack = () => {
    setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));
  };

  const canProceedToDetails = state.date && state.time;

  const handleSubmit = async () => {
    if (!state.treatment || !state.date || !state.time) return;
    if (!state.customerName.trim() || !state.customerEmail.trim() || !state.customerPhone.trim()) return;

    setSubmitting(true);
    setSubmitError(null);

    const insertData = {
      customer_name: state.customerName.trim(),
      customer_email: state.customerEmail.trim(),
      customer_phone: state.customerPhone.trim(),
      notes: state.notes.trim() || null,
      service_slug: state.treatment.slug,
      service_name: state.treatment.name,
      staff_id: state.staff?.id || null,
      staff_name: state.staff?.name || null,
      booking_date: state.date,
      booking_time: state.time,
    };

    const { data, error } = await supabase
      .from('bookings')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      setSubmitError(
        'We could not submit your appointment request. Please check your connection and try again, or call us directly.'
      );
      setSubmitting(false);
      return;
    }

    setConfirmed({
      id: data.id,
      date: state.date,
      time: state.time,
      treatmentName: state.treatment.name,
      staffName: state.staff?.name || 'No preference',
    });
    setSubmitting(false);
  };

  /* ───────── Confirmation Screen ───────── */

  if (confirmed) {
    return (
      <div className="min-h-screen pt-20 bg-ivory flex items-center justify-center">
        <div className="container-editorial py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Check size={28} className="text-accent" />
            </div>
            <p className="kicker mb-4">Confirmed</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              Your appointment request has been received
            </h1>
            <p className="font-sans text-sm font-light text-taupe mb-10 leading-relaxed">
              We will contact you shortly to confirm the details. A summary of your request is below.
            </p>

            <div className="bg-porcelain border border-sand/50 p-8 text-left space-y-4 mb-10">
              <div className="flex items-start gap-3">
                <Tag size={16} className="text-metallic mt-0.5" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic mb-0.5">Treatment</p>
                  <p className="font-serif text-lg text-charcoal">{confirmed.treatmentName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User size={16} className="text-metallic mt-0.5" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic mb-0.5">Professional</p>
                  <p className="font-sans text-sm text-charcoal">{confirmed.staffName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-metallic mt-0.5" />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic mb-0.5">Date & Time</p>
                  <p className="font-sans text-sm text-charcoal">
                    {new Date(confirmed.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    {' at '}
                    {confirmed.time.slice(0, 5)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={routes.home} className="btn-primary">Return Home</Link>
              <Link to={routes.treatments} className="btn-secondary">Browse Treatments</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ───────── Main Wizard ───────── */

  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <Seo
        title="Book an Appointment"
        description="Reserve your visit to ATELIER ÉCLAT. Choose your treatment, professional, date, and time — confirmation within 24 hours."
        path="/prenota"
      />
      <div className="container-editorial py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="kicker mb-6">Reserve your visit</p>
          <h1 className="font-serif text-4xl md:text-6xl text-charcoal mb-6">Book an Appointment</h1>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-16 max-w-2xl mx-auto">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-xs transition-all duration-600 ${
                    step >= s.num
                      ? 'bg-accent text-porcelain'
                      : 'bg-beige text-taupe'
                  }`}
                >
                  {step > s.num ? <Check size={14} /> : s.num}
                </div>
                <span
                  className={`font-sans text-[10px] uppercase tracking-editorial-wide hidden md:block ${
                    step >= s.num ? 'text-charcoal' : 'text-taupe'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`w-8 md:w-16 h-px mx-1 md:mx-2 transition-colors duration-600 ${
                    step > s.num ? 'bg-accent' : 'bg-sand'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Summary bar */}
        {(state.category || state.treatment || state.staff || state.date) && (
          <div className="max-w-2xl mx-auto mb-8 flex flex-wrap items-center gap-4 text-xs font-sans text-taupe border-y border-sand/40 py-4">
            {state.treatment && (
              <span className="flex items-center gap-1.5">
                <Tag size={12} className="text-metallic" />
                {state.treatment.name}
              </span>
            )}
            {state.staff && (
              <span className="flex items-center gap-1.5">
                <User size={12} className="text-metallic" />
                {state.staff.name}
              </span>
            )}
            {state.noPreference && (
              <span className="flex items-center gap-1.5">
                <User size={12} className="text-metallic" />
                No preference
              </span>
            )}
            {state.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="text-metallic" />
                {new Date(state.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
            {state.time && (
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-metallic" />
                {state.time.slice(0, 5)}
              </span>
            )}
          </div>
        )}

        {/* Step content */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Category */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Choose a category</h2>
                <p className="font-sans text-sm font-light text-taupe mb-8">Where would you like to begin?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat)}
                      className="group text-left p-6 border border-sand/50 hover:border-accent transition-all duration-600 ease-editorial bg-porcelain hover:bg-beige/30"
                    >
                      <span className="kicker block mb-2">{cat.name}</span>
                      <span className="font-serif text-xl text-charcoal group-hover:text-accent transition-colors duration-600 block">
                        {cat.name}
                      </span>
                      <span className="font-sans text-xs font-light text-taupe mt-1 block">
                        {cat.treatments.length} treatments
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Treatment */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={goBack}
                  className="group flex items-center gap-2 font-sans text-xs uppercase tracking-editorial-wide text-taupe hover:text-charcoal transition-colors duration-600 mb-8"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-600" />
                  Back
                </button>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">
                  {state.category?.name}
                </h2>
                <p className="font-sans text-sm font-light text-taupe mb-8">Choose your treatment</p>
                <div className="divide-y divide-sand/40">
                  {state.category?.treatments.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => selectTreatment(t)}
                      className="group w-full text-left py-5 flex items-center gap-4"
                    >
                      <div className="flex-1">
                        <p className="font-serif text-lg text-charcoal group-hover:text-accent transition-colors duration-600">
                          {t.name}
                        </p>
                        <p className="font-sans text-xs font-light text-taupe mt-0.5 max-w-md">
                          {t.shortDescription}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-sans text-xs text-taupe">{t.duration}</span>
                        {t.price && <span className="font-sans text-sm text-charcoal">{t.price}</span>}
                        <ArrowRight size={16} className="text-taupe group-hover:text-accent group-hover:translate-x-1 transition-all duration-600" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Professional */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={goBack}
                  className="group flex items-center gap-2 font-sans text-xs uppercase tracking-editorial-wide text-taupe hover:text-charcoal transition-colors duration-600 mb-8"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-600" />
                  Back
                </button>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Choose your professional</h2>
                <p className="font-sans text-sm font-light text-taupe mb-8">Or select "No preference" and we will match you with the right specialist.</p>

                {loadingStaff && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={20} className="animate-spin text-taupe" />
                  </div>
                )}

                {!loadingStaff && (
                  <div className="divide-y divide-sand/40">
                    {/* No preference option */}
                    <button
                      onClick={() => selectStaff(null)}
                      className="group w-full text-left py-5 flex items-center gap-4"
                    >
                      <div className="flex-1">
                        <p className="font-serif text-lg text-charcoal group-hover:text-accent transition-colors duration-600">
                          No preference
                        </p>
                        <p className="font-sans text-xs font-light text-taupe mt-0.5">
                          We will match you with the right specialist for your treatment.
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-taupe group-hover:text-accent group-hover:translate-x-1 transition-all duration-600" />
                    </button>

                    {staffList.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => selectStaff(s)}
                        className="group w-full text-left py-5 flex items-center gap-4"
                      >
                        <div className="flex-1">
                          <p className="font-serif text-lg text-charcoal group-hover:text-accent transition-colors duration-600">
                            {s.name}
                          </p>
                          <p className="font-sans text-xs text-taupe mt-0.5">{s.title}</p>
                          {s.specialties.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {s.specialties.map((sp) => (
                                <span
                                  key={sp}
                                  className="font-sans text-[10px] uppercase tracking-editorial-wider text-metallic bg-beige/40 px-2 py-0.5"
                                >
                                  {sp}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <ArrowRight size={16} className="text-taupe group-hover:text-accent group-hover:translate-x-1 transition-all duration-600" />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 4: Date & Time */}
            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={goBack}
                  className="group flex items-center gap-2 font-sans text-xs uppercase tracking-editorial-wide text-taupe hover:text-charcoal transition-colors duration-600 mb-8"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-600" />
                  Back
                </button>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Choose a date</h2>
                <p className="font-sans text-sm font-light text-taupe mb-8">Select an available day.</p>

                {/* Date selector */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-8 -mx-2 px-2">
                  {openDays.map((d) => {
                    const isSelected = state.date === d.date;
                    return (
                      <button
                        key={d.date}
                        onClick={() => selectDate(d.date)}
                        className={`shrink-0 w-20 py-4 border text-center transition-all duration-600 ease-editorial ${
                          isSelected
                            ? 'bg-charcoal text-porcelain border-charcoal'
                            : 'bg-porcelain text-charcoal border-sand/50 hover:border-charcoal'
                        }`}
                      >
                        <span className="block font-sans text-[10px] uppercase tracking-editorial-wide opacity-70 mb-1">
                          {d.dayName}
                        </span>
                        <span className="block font-serif text-xl">{d.dayNum}</span>
                        <span className="block font-sans text-[10px] uppercase tracking-editorial-wide opacity-70 mt-1">
                          {d.monthName}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                {state.date && (
                  <>
                    <h3 className="font-serif text-xl text-charcoal mb-4">Available times</h3>
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 size={18} className="animate-spin text-taupe" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {(() => {
                          const daySlots = slots
                            .filter((s) => s.slot_date === state.date)
                            .map((s) => s.start_time.slice(0, 5));
                          const uniqueTimes = [...new Set(daySlots)].sort();

                          if (uniqueTimes.length === 0) {
                            return (
                              <p className="font-sans text-sm font-light text-taupe col-span-full py-4">
                                No availability on this day. Please choose another date.
                              </p>
                            );
                          }

                          return uniqueTimes.map((time) => {
                            const isSelected = state.time === time;
                            return (
                              <button
                                key={time}
                                onClick={() => selectTime(time)}
                                className={`py-3 font-sans text-sm border transition-all duration-600 ease-editorial ${
                                  isSelected
                                    ? 'bg-accent text-porcelain border-accent'
                                    : 'bg-porcelain text-charcoal border-sand/50 hover:border-charcoal'
                                }`}
                              >
                                {time}
                              </button>
                            );
                          });
                        })()}
                      </div>
                    )}
                  </>
                )}

                {/* Continue button */}
                {canProceedToDetails && (
                  <button
                    onClick={() => setStep(5)}
                    className="btn-primary mt-8"
                  >
                    Continue to details
                    <ArrowRight size={14} className="ml-2" />
                  </button>
                )}
              </motion.div>
            )}

            {/* Step 5: Customer Information */}
            {step === 5 && (
              <motion.div
                key="step-5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={goBack}
                  className="group flex items-center gap-2 font-sans text-xs uppercase tracking-editorial-wide text-taupe hover:text-charcoal transition-colors duration-600 mb-8"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-600" />
                  Back
                </button>
                <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Your details</h2>
                <p className="font-sans text-sm font-light text-taupe mb-8">We will use these to confirm your appointment.</p>

                {submitError && (
                  <div className="flex items-start gap-3 p-4 border border-accent/30 bg-accent/5 mb-6">
                    <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
                    <p className="font-sans text-sm text-charcoal">{submitError}</p>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={state.customerName}
                      onChange={(e) => setState((prev) => ({ ...prev, customerName: e.target.value }))}
                      className="w-full px-4 py-3 bg-porcelain border border-sand/50 font-sans text-sm text-charcoal focus:border-accent focus:outline-none transition-colors duration-600"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={state.customerEmail}
                      onChange={(e) => setState((prev) => ({ ...prev, customerEmail: e.target.value }))}
                      className="w-full px-4 py-3 bg-porcelain border border-sand/50 font-sans text-sm text-charcoal focus:border-accent focus:outline-none transition-colors duration-600"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={state.customerPhone}
                      onChange={(e) => setState((prev) => ({ ...prev, customerPhone: e.target.value }))}
                      className="w-full px-4 py-3 bg-porcelain border border-sand/50 font-sans text-sm text-charcoal focus:border-accent focus:outline-none transition-colors duration-600"
                      placeholder="+39 ..."
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-2">
                      Notes <span className="text-taupe normal-case">(optional)</span>
                    </label>
                    <textarea
                      value={state.notes}
                      onChange={(e) => setState((prev) => ({ ...prev, notes: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 bg-porcelain border border-sand/50 font-sans text-sm text-charcoal focus:border-accent focus:outline-none transition-colors duration-600 resize-none"
                      placeholder="Any allergies, preferences, or special requests"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={
                    submitting ||
                    !state.customerName.trim() ||
                    !state.customerEmail.trim() ||
                    !state.customerPhone.trim()
                  }
                  className="btn-primary mt-8 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
