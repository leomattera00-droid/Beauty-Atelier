import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Accessibility, Car, Send, Loader2, Check, AlertCircle } from 'lucide-react';
import Seo from '@/components/Seo';
import { contact, openingHours } from '@/config/brand';
import { supabase } from '@/lib/supabase';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const contactReasons = [
  { id: 'general', label: 'General Information' },
  { id: 'appointment', label: 'Appointment Request' },
  { id: 'consultation', label: 'Beauty Consultation' },
  { id: 'corporate', label: 'Corporate Collaboration' },
  { id: 'brand', label: 'Brand Collaboration' },
];

export default function Contact() {
  const prefersReduced = usePrefersReducedMotion();
  const [reason, setReason] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from('bookings').insert({
      customer_name: name.trim(),
      customer_email: email.trim(),
      customer_phone: phone.trim() || 'N/A',
      notes: `[${contactReasons.find((r) => r.id === reason)?.label || reason}] ${message.trim()}`,
      service_slug: 'contact-form',
      service_name: `Contact: ${contactReasons.find((r) => r.id === reason)?.label || reason}`,
      booking_date: new Date().toISOString().split('T')[0],
      booking_time: '00:00',
    });

    if (insertError) {
      setError('We could not send your message. Please try again or call us directly.');
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 bg-ivory flex items-center justify-center">
        <div className="container-editorial py-16">
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
              <Check size={28} className="text-accent" />
            </div>
            <p className="kicker mb-4">Sent</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              Your message has been received
            </h1>
            <p className="font-sans text-sm font-light text-taupe mb-10 leading-relaxed">
              We will respond within 24 hours. For urgent matters, please call us directly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setReason('general');
              }}
              className="btn-secondary"
            >
              Send Another Message
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-ivory">
      <Seo
        title="Contact"
        description="Find us in the heart of Milano. For private consultations, bespoke treatment design, or any question — our concierge is at your service."
        path="/contatti"
      />
      <div className="container-editorial py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="kicker mb-6">Concierge</p>
          <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-6">Contact</h1>
          <p className="font-sans text-base font-light text-taupe max-w-md mx-auto leading-relaxed">
            Find us in the heart of Milano. For private consultations, bespoke treatment design, or any question — our concierge is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-gallery mx-auto">
          {/* Contact form */}
          <div>
            <h2 className="font-serif text-3xl text-charcoal mb-2">Send a message</h2>
            <p className="font-sans text-sm font-light text-taupe mb-8">We respond within 24 hours.</p>

            {error && (
              <div className="flex items-start gap-3 p-4 border border-accent/30 bg-accent/5 mb-6">
                <AlertCircle size={18} className="text-accent shrink-0 mt-0.5" />
                <p className="font-sans text-sm text-charcoal">{error}</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Reason selector */}
              <div>
                <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-3">
                  Reason for Contact
                </label>
                <div className="flex flex-wrap gap-2">
                  {contactReasons.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setReason(r.id)}
                      className={`px-4 py-2.5 font-sans text-xs uppercase tracking-editorial-wide transition-all duration-600 ease-editorial border ${
                        reason === r.id
                          ? 'bg-charcoal text-porcelain border-charcoal'
                          : 'bg-transparent text-taupe border-sand hover:border-charcoal hover:text-charcoal'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-porcelain border border-sand/50 font-sans text-sm text-charcoal focus:border-accent focus:outline-none transition-colors duration-600"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-2">
                  Phone <span className="text-taupe normal-case">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-porcelain border border-sand/50 font-sans text-sm text-charcoal focus:border-accent focus:outline-none transition-colors duration-600"
                  placeholder="+39 ..."
                />
              </div>

              <div>
                <label className="block font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-porcelain border border-sand/50 font-sans text-sm text-charcoal focus:border-accent focus:outline-none transition-colors duration-600 resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || !name.trim() || !email.trim() || !message.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Location block */}
          <div className="space-y-8">
            {/* Address */}
            <div>
              <div className="flex items-start gap-3 mb-2">
                <MapPin size={18} className="text-metallic mt-0.5" />
                <div>
                  <p className="font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-1">Address</p>
                  <p className="font-sans text-sm text-charcoal leading-relaxed">{contact.address}</p>
                </div>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-metallic" />
                <a href={`tel:${contact.phone}`} className="font-sans text-sm text-charcoal link-underline">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-metallic" />
                <a href={`mailto:${contact.email}`} className="font-sans text-sm text-charcoal link-underline">
                  {contact.email}
                </a>
              </div>
            </div>

            {/* Opening hours */}
            <div>
              <div className="flex items-start gap-3 mb-4">
                <Clock size={18} className="text-metallic mt-0.5" />
                <p className="font-sans text-xs uppercase tracking-editorial-wider text-metallic">Opening Hours</p>
              </div>
              <ul className="space-y-2 pl-9">
                {openingHours.map((entry) => (
                  <li key={entry.day} className="font-sans text-sm font-light text-taupe flex justify-between gap-4">
                    <span>{entry.day}</span>
                    <span className="text-charcoal/70">{entry.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parking & Accessibility */}
            <div className="space-y-3 pt-4 border-t border-sand/40">
              <div className="flex items-start gap-3">
                <Car size={18} className="text-metallic mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-1">Parking</p>
                  <p className="font-sans text-sm font-light text-taupe leading-relaxed">
                    Valet parking available Tuesday–Saturday. Public garage at Piazza San Babila, 3-minute walk.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Accessibility size={18} className="text-metallic mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-1">Accessibility</p>
                  <p className="font-sans text-sm font-light text-taupe leading-relaxed">
                    Step-free entrance on Via della Spiga. Treatment rooms accessible on ground floor. Please let us know any needs in advance.
                  </p>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="relative overflow-hidden aspect-[4/3] border border-sand/40">
              <iframe
                title="Atelier Éclat location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=9.1919%2C45.4672%2C9.1989%2C45.4702&layer=mapnik&marker=45.4687%2C9.1954"
                className="h-full w-full grayscale opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
