import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { brand, navLinks, routes } from '@/config/brand';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === routes.home;
  const solid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800 ease-editorial ${
          solid
            ? 'bg-ivory/95 backdrop-blur-md border-b border-sand/40'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-editorial flex items-center justify-between h-20">
          {/* Wordmark */}
          <Link to={routes.home} className="group">
            <span
              className={`font-serif text-xl tracking-editorial-wide transition-colors duration-600 ${
                solid ? 'text-charcoal' : 'text-porcelain'
              }`}
            >
              {brand.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-sans text-xs uppercase tracking-editorial-wide link-underline transition-colors duration-600 ${
                    solid
                      ? isActive
                        ? 'text-accent'
                        : 'text-charcoal/80 hover:text-charcoal'
                      : isActive
                        ? 'text-accent-light'
                        : 'text-porcelain/80 hover:text-porcelain'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className={solid ? 'text-charcoal' : 'text-porcelain'} size={22} />
            ) : (
              <Menu className={solid ? 'text-charcoal' : 'text-porcelain'} size={22} />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-espresso flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `font-serif text-3xl tracking-editorial-wide ${
                      isActive ? 'text-accent-light' : 'text-porcelain'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
