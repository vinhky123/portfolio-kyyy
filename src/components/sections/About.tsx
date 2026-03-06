import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Building2, Briefcase, Target } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <div className="relative">
              <div className="h-72 w-72 overflow-hidden rounded-2xl border-2 border-dark-200 bg-gradient-to-br from-primary-500/20 to-primary-700/20 dark:border-dark-700">
                <div className="flex h-full items-center justify-center">
                  <span className="text-7xl font-bold gradient-text">VK</span>
                </div>
              </div>
              <div className="absolute -right-3 -bottom-3 -z-10 h-72 w-72 rounded-2xl border-2 border-primary-500/30" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="mb-4 leading-relaxed text-dark-600 dark:text-dark-300">
              {t('about.description')}
            </p>
            <p className="mb-8 leading-relaxed text-dark-600 dark:text-dark-300">
              {t('about.description2')}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {infoItems.map(({ icon: Icon, key }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl border border-dark-200 p-3 dark:border-dark-700"
                >
                  <div className="rounded-lg bg-primary-500/10 p-2">
                    <Icon size={18} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-500 dark:text-dark-400 capitalize">{key}</p>
                    <p className="text-sm font-medium text-dark-900 dark:text-white">
                      {t(`about.${key}`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
