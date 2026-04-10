import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { certifications } from '../../data/certifications';
import { scaleUp, staggerContainer, viewport } from '../../lib/animations';

export default function Certifications() {
  const { t } = useTranslation();

  return (
    <section id="certifications" className="bg-dark-50 py-20 dark:bg-dark-900/50">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading title={t('certifications.title')} subtitle={t('certifications.subtitle')} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-6 sm:grid-cols-2"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={scaleUp}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="group rounded-2xl border border-dark-200 bg-white p-6 shadow-sm hover:shadow-lg dark:border-dark-700 dark:bg-dark-800/50"
            >
              <motion.div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Award size={28} className="text-primary-500" />
              </motion.div>

              <h3 className="mb-1 text-lg font-bold text-dark-900 dark:text-white">
                {cert.name}
              </h3>
              <p className="mb-1 text-sm text-primary-500">{cert.issuer}</p>
              <p className="mb-4 text-xs text-dark-500 dark:text-dark-400">{cert.date}</p>

              {cert.credentialUrl && cert.credentialUrl !== '#' && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 transition-colors hover:text-primary-600"
                >
                  {t('certifications.view_credential')}
                  <ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
