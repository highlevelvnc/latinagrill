'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    { name: t('items.0.name'), text: t('items.0.text') },
    { name: t('items.1.name'), text: t('items.1.text') },
    { name: t('items.2.name'), text: t('items.2.text') },
    { name: t('items.3.name'), text: t('items.3.text') },
  ];

  const googleReviewsUrl = 'https://share.google/8vw79KB0bb72pWBIA';

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-dark-light relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-orange/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-red/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-4 py-2 mb-6">
            <Quote className="w-4 h-4 text-accent-orange" />
            <span className="text-xs lg:text-sm text-accent-orange uppercase tracking-widest font-medium">
              {t('badge')}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-light leading-tight mb-6">
            {t('title')}
          </h2>

          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent-yellow text-accent-yellow" />
              ))}
            </div>
            <span className="text-light/70 text-sm font-medium">{t('googleReviews')}</span>
          </div>

          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red to-red-dark hover:from-red-light hover:to-red text-light px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red/30"
          >
            <Star className="w-4 h-4" />
            {t('seeAllReviews')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-dark border border-light/5 rounded-2xl p-8 hover:border-accent-orange/20 transition-all duration-500 hover:shadow-2xl hover:shadow-accent-orange/5"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-yellow text-accent-yellow" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-accent-orange/30 mb-4" />

              {/* ✅ CORRIGIDO AQUI */}
              <p className="text-light/80 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red to-accent-orange flex items-center justify-center text-light font-serif font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-light font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-light/50">Google Reviews</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
