import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { educations } from '../../data/education';

export default function Education() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';

  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading title={t('education.title')} subtitle={t('education.subtitle')} />

        <div className="space-y-8">
          {educations.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative overflow-hidden rounded-2xl border border-dark-200 bg-white p-6 shadow-sm dark:border-dark-700 dark:bg-dark-800/50"
            >
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary-500/5" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-500/10">
                  <GraduationCap size={28} className="text-primary-500" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                    {isVi ? edu.schoolVi : edu.school}
                  </h3>
                  <p className="text-sm font-medium text-primary-500">
                    {isVi ? edu.degreeVi : edu.degree} — {isVi ? edu.fieldVi : edu.field}
                  </p>
                  <p className="mt-1 text-sm text-dark-500 dark:text-dark-400">
                    {edu.startDate} — {edu.endDate}
                  </p>
                  {(isVi ? edu.descriptionVi : edu.description) && (
                    <p className="mt-2 text-sm text-dark-600 dark:text-dark-300">
                      {isVi ? edu.descriptionVi : edu.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
