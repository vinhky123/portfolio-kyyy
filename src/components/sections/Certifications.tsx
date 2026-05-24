import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { certifications, type Certification } from '../../data/certifications';
import { scaleUp, staggerContainer, viewport } from '../../lib/animations';

function CertCard({
  cert,
  compact,
}: {
  cert: Certification;
  compact?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={scaleUp}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group rounded-2xl border border-dark-200 bg-white shadow-sm hover:shadow-lg dark:border-dark-700 dark:bg-dark-800/50"
    >
      <div
        className={`flex items-start gap-4 ${compact ? 'p-4' : 'p-6'}`}
      >
        {cert.badge ? (
          <motion.img
            src={cert.badge}
            alt={cert.name}
            loading="lazy"
            decoding="async"
            className={`shrink-0 object-contain drop-shadow-md ${
              compact ? 'h-14 w-14' : 'h-24 w-24'
            }`}
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ) : (
          <motion.div
            className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-700/20 ${
              compact ? 'h-10 w-10' : 'h-14 w-14'
            }`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Award size={compact ? 20 : 28} className="text-primary-500" />
          </motion.div>
        )}

        <div className="flex-1 pt-1">
          <h3
            className={`mb-1 font-bold text-dark-900 dark:text-white ${
              compact ? 'text-sm' : 'text-lg'
            }`}
          >
            {cert.name}
          </h3>
          <p
            className={`mb-1 text-primary-500 ${
              compact ? 'text-xs' : 'text-sm'
            }`}
          >
            {cert.issuer}
          </p>
          <p className="mb-3 text-xs text-dark-500 dark:text-dark-400">
            {cert.date}
          </p>

          {cert.credentialUrl && cert.credentialUrl !== '#' && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('certifications.view_credential')} for ${cert.name} (opens in new tab)`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-500 transition-colors hover:text-primary-600"
            >
              {t('certifications.view_credential')}
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const { t } = useTranslation();

  const rows = [1, 2, 3] as const;

  return (
    <section id="certifications" className="bg-dark-50 py-20 dark:bg-dark-900/50">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading title={t('certifications.title')} subtitle={t('certifications.subtitle')} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-6"
        >
          {rows.map((row) => {
            const rowCerts = certifications.filter((c) => c.row === row);
            const isSingle = rowCerts.length === 1;

            if (isSingle) {
              return (
                <div key={row} className="mx-auto max-w-2xl">
                  {rowCerts.map((cert) => (
                    <CertCard key={cert.id} cert={cert} />
                  ))}
                </div>
              );
            }

            return (
              <div
                key={row}
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              >
                {rowCerts.map((cert) => (
                  <CertCard key={cert.id} cert={cert} compact />
                ))}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
