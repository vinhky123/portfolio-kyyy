import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { experiences } from '../../data/experience';

function formatDate(dateStr: string | null, presentLabel: string) {
  if (!dateStr) return presentLabel;
  const [year, month] = dateStr.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

export default function Experience() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';

  return (
    <section id="experience" className="bg-dark-50 py-20 dark:bg-dark-900/50">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading title={t('experience.title')} subtitle={t('experience.subtitle')} />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-dark-200 md:left-1/2 dark:bg-dark-700" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative mb-12 last:mb-0 md:flex md:items-start"
            >
              <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-500 bg-white dark:bg-dark-900">
                  <Briefcase size={20} className="text-primary-500" />
                </div>
              </div>

              <div className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right">
                <span className="text-sm font-medium text-primary-500">
                  {formatDate(exp.startDate, '')} — {formatDate(exp.endDate, t('experience.present'))}
                </span>
              </div>

              <div className="ml-16 mt-2 md:ml-0 md:mt-0 md:w-1/2 md:pl-12">
                <div className="rounded-xl border border-dark-200 bg-white p-5 shadow-sm dark:border-dark-700 dark:bg-dark-800/50">
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                    {isVi ? exp.roleVi : exp.role}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-primary-500">{exp.company}</p>
                  <ul className="space-y-2">
                    {(isVi ? exp.descriptionVi : exp.description).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-dark-100 px-2 py-0.5 text-xs font-medium text-dark-600 dark:bg-dark-700 dark:text-dark-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
