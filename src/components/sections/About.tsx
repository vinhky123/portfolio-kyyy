import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Building2, Briefcase, Target } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { fadeLeft, fadeRight, fadeUp, staggerContainer, viewport } from '../../lib/animations';

const infoItems = [
  { icon: MapPin, key: 'location' },
  { icon: Building2, key: 'company' },
  { icon: Briefcase, key: 'role' },
  { icon: Target, key: 'focus' },
] as const;

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('about.title')} subtitle={t('about.subtitle')} />

        <div className="grid gap-12 md:grid-cols-2">
          {/* Avatar */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                className="h-72 w-72 overflow-hidden rounded-2xl border-2 border-dark-200 bg-gradient-to-br from-primary-500/20 to-primary-700/20 dark:border-dark-700"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="gradient-text text-7xl font-bold">VK</span>
                </div>
              </motion.div>
              <motion.div
                className="absolute -right-3 -bottom-3 -z-10 h-72 w-72 rounded-2xl border-2 border-primary-500/30"
                initial={{ opacity: 0, x: 10, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              />
            </div>
          </motion.div>

          {/* Text + info cards */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col justify-center"
          >
            <p className="mb-4 leading-relaxed text-dark-600 dark:text-dark-300">
              {t('about.description')}
            </p>
            <p className="mb-8 leading-relaxed text-dark-600 dark:text-dark-300">
              {t('about.description2')}
            </p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="grid grid-cols-2 gap-4"
            >
              {infoItems.map(({ icon: Icon, key }) => (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  whileHover={{ y: -3, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="flex items-center gap-3 rounded-xl border border-dark-200 p-3 dark:border-dark-700"
                >
                  <div className="rounded-lg bg-primary-500/10 p-2">
                    <Icon size={18} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="capitalize text-xs text-dark-500 dark:text-dark-400">{key}</p>
                    <p className="text-sm font-medium text-dark-900 dark:text-white">
                      {t(`about.${key}`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
