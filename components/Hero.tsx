'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-anthracite-dark">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.website.dish.co/media/fb/f6/5189650/Latina-Grill-Steakhouse-252307672-292067949588108-1479978839390152596-n-jpg.jpg"
          alt="Latina Grill Cascais Interior"
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite/70 via-anthracite/50 to-anthracite" />
        <div className="absolute inset-0 bg-grain" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-cream mb-6 leading-tight"
          >
            {t('title')}
            <br />
            <span className="text-gold">{t('titleHighlight')}</span>
          </motion.h1>

          {/* Subline Premium */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs md:text-sm uppercase tracking-[0.35em] text-cream/60 mb-8"
          >
            LIVE MUSIC • CASCAIS
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg lg:text-xl text-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('description')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href={`/${locale}/reservations`}
              className="bg-ruby hover:bg-ruby-light text-cream px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-ruby/40 hover:scale-105 w-full sm:w-auto"
            >
              {t('cta')}
            </Link>
            <Link
              href={`/${locale}/menu`}
              className="bg-transparent border-2 border-cream/30 hover:border-cream hover:bg-cream/10 text-cream px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/60 hover:text-cream transition-colors cursor-pointer"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
}
