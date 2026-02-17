'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'pt', label: 'PT', name: 'Português' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
  ];

  const currentLang = languages.find(lang => lang.code === locale);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled 
            ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-red/10' 
            : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Latina Grill"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-serif font-bold text-light tracking-tight group-hover:text-accent-orange transition-colors">
                  Latina Grill
                </span>
                <span className="text-[10px] lg:text-xs text-red font-sans uppercase tracking-widest -mt-1">
                  Cascais
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link 
                href={`/${locale}`}
                className="text-sm text-light/80 hover:text-light transition-colors font-medium"
              >
                {t('home')}
              </Link>
              <Link 
                href={`/${locale}/menu`}
                className="text-sm text-light/80 hover:text-light transition-colors font-medium"
              >
                {t('menu')}
              </Link>
              <Link 
                href={`/${locale}/reservations`}
                className="text-sm text-light/80 hover:text-light transition-colors font-medium"
              >
                {t('reservations')}
              </Link>
              <Link 
                href={`/${locale}/contact`}
                className="text-sm text-light/80 hover:text-light transition-colors font-medium"
              >
                {t('contact')}
              </Link>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1.5 text-sm text-light/80 hover:text-light transition-colors font-medium border border-light/20 rounded-full px-3 py-1.5"
                >
                  {currentLang?.label}
                  <ChevronDown className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-40 bg-dark-lighter border border-light/10 rounded-lg shadow-xl overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <Link
                          key={lang.code}
                          href={`/${lang.code}`}
                          onClick={() => setIsLangMenuOpen(false)}
                          className={cn(
                            'block px-4 py-2.5 text-sm transition-colors',
                            locale === lang.code
                              ? 'bg-red/20 text-light'
                              : 'text-light/70 hover:bg-light/5 hover:text-light'
                          )}
                        >
                          <span className="font-medium">{lang.label}</span>
                          <span className="text-xs text-light/50 ml-2">{lang.name}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <Link 
                href={`/${locale}/reservations`}
                className="bg-gradient-to-r from-red to-red-dark hover:from-red-light hover:to-red text-light px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red/30"
              >
                {t('reserve')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-light p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 lg:hidden bg-dark"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-8">
              <Link 
                href={`/${locale}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-light hover:text-accent-orange transition-colors font-serif"
              >
                {t('home')}
              </Link>
              <Link 
                href={`/${locale}/menu`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-light hover:text-accent-orange transition-colors font-serif"
              >
                {t('menu')}
              </Link>
              <Link 
                href={`/${locale}/reservations`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-light hover:text-accent-orange transition-colors font-serif"
              >
                {t('reservations')}
              </Link>
              <Link 
                href={`/${locale}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl text-light hover:text-accent-orange transition-colors font-serif"
              >
                {t('contact')}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex gap-4 mt-8">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-semibold transition-colors',
                      locale === lang.code
                        ? 'bg-red text-light'
                        : 'bg-light/10 text-light/70 hover:bg-light/20'
                    )}
                  >
                    {lang.label}
                  </Link>
                ))}
              </div>

              <Link 
                href={`/${locale}/reservations`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-gradient-to-r from-red to-red-dark hover:from-red-light hover:to-red text-light px-8 py-3 rounded-full text-lg font-semibold mt-4"
              >
                {t('reserve')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
