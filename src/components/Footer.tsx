import { Link } from 'react-router-dom';
import { Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { brand, contact, openingHours, routes } from '@/config/brand';

export default function Footer() {
  return (
    <footer className="bg-espresso text-porcelain">
      <div className="container-editorial py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-serif text-2xl tracking-editorial-wide mb-4">
              {brand.name}
            </h3>
            <p className="font-sans text-sm font-light text-porcelain/60 leading-relaxed max-w-xs">
              {brand.tagline}
            </p>
            <p className="font-sans text-xs uppercase tracking-editorial-wider text-metallic mt-4">
              {brand.supportingLine}
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to={routes.treatments} className="font-sans text-sm font-light text-porcelain/80 link-underline">
                  Treatments
                </Link>
              </li>
              <li>
                <Link to={routes.booking} className="font-sans text-sm font-light text-porcelain/80 link-underline">
                  Booking
                </Link>
              </li>
              <li>
                <Link to={routes.contact} className="font-sans text-sm font-light text-porcelain/80 link-underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to={routes.staff} className="font-sans text-sm font-light text-porcelain/80 link-underline">
                  The Atelier
                </Link>
              </li>
              <li>
                <Link to={routes.interiors} className="font-sans text-sm font-light text-porcelain/80 link-underline">
                  Interiors
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-6">
              Opening Hours
            </h4>
            <ul className="space-y-3">
              {openingHours.map((entry) => (
                <li
                  key={entry.day}
                  className="font-sans text-sm font-light text-porcelain/80 flex flex-col"
                >
                  <span>{entry.day}</span>
                  <span className="text-porcelain/50 text-xs">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-editorial-wider text-metallic mb-6">
              Contact
            </h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 font-sans text-sm font-light text-porcelain/80">
                <MapPin size={16} className="mt-0.5 text-metallic shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3 font-sans text-sm font-light text-porcelain/80">
                <Phone size={16} className="text-metallic shrink-0" />
                <a href={`tel:${contact.phone}`} className="link-underline">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 font-sans text-sm font-light text-porcelain/80">
                <Mail size={16} className="text-metallic shrink-0" />
                <a href={`mailto:${contact.email}`} className="link-underline">
                  {contact.email}
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs uppercase tracking-editorial-wide text-porcelain/60 hover:text-accent-light transition-colors duration-600 link-underline"
              >
                Instagram
              </a>
              <span className="text-metallic/40">|</span>
              <a
                href="https://tiktok.com/@ateliereclat"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs uppercase tracking-editorial-wide text-porcelain/60 hover:text-accent-light transition-colors duration-600 link-underline"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-metallic/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-porcelain/40 tracking-editorial-wide">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-sans text-xs uppercase tracking-editorial-wide text-porcelain/40 hover:text-porcelain/70 transition-colors duration-600 link-underline">
              Privacy
            </a>
            <a href="#" className="font-sans text-xs uppercase tracking-editorial-wide text-porcelain/40 hover:text-porcelain/70 transition-colors duration-600 link-underline">
              Cookie Policy
            </a>
            <Link
              to={routes.booking}
              className="font-sans text-xs uppercase tracking-editorial-wide text-accent-light link-underline"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
