'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock } from 'lucide-react';

const DAYS = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo'
];

export default function OpeningHours() {
  const t = useTranslations('contact.hours');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-16 bg-dark-light">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-4 py-2 mb-4">
              <Clock className="w-4 h-4 text-accent-orange" />
              <span className="text-xs lg:text-sm text-accent-orange uppercase tracking-widest font-medium">
                {t('label')}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-light">
              {t('subtitle')}
            </h2>
          </div>

          {/* Hours Grid */}
          <div className="bg-dark border border-light/5 rounded-2xl overflow-hidden">
            {DAYS.map((day, index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 md:p-6 ${
                  index !== DAYS.length - 1 ? 'border-b border-light/5' : ''
                } hover:bg-light/5 transition-colors`}
              >
                <span className="text-light font-medium">{day}</span>
                <div className="text-right">
                  <p className="text-light/80">{t('lunch')}</p>
                  <p className="text-light/80">{t('dinner')}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extra Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-light/60">{t('reservationsTime')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
