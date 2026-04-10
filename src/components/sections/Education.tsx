import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Award } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { educations } from '../../data/education';
import { fadeUp, staggerContainer, viewport } from '../../lib/animations';

export default function Education() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';

  return (
    <section id="education" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading title={t('education.title')} subtitle={t('education.subtitle')} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-8"
        >
          {educations.map((edu) => (
            <motion.div
              key={edu.id}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative overflow-hidden rounded-2xl border border-dark-200 bg-white p-6 shadow-sm dark:border-dark-700 dark:bg-dark-800/50"
            >
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary-500/5" />

              <div className="relative flex items-start gap-4">
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-500/10"
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap size={28} className="text-primary-500" />
                </motion.div>

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
                    <p className="mt-1 text-sm text-dark-600 dark:text-dark-300">
                      {isVi ? edu.descriptionVi : edu.description}
                    </p>
                  )}
                  {(isVi ? edu.gradeVi : edu.grade) && (
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary-400/30 bg-primary-500/10 px-3 py-1">
                      <Award size={14} className="text-primary-500" />
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                        {isVi ? edu.gradeVi : edu.grade}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
