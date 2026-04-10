import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { experiences } from '../../data/experience';
import { fadeLeft, fadeRight, fadeUp, staggerContainer, easing, viewport, viewportLoose } from '../../lib/animations';

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
          {/* Static background track */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-dark-200 md:left-1/2 dark:bg-dark-700" />

          {/* Animated primary line drawing down over the track */}
          <motion.div
            className="absolute left-6 top-0 w-px origin-top bg-primary-500/60 md:left-1/2 dark:bg-primary-500/40"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportLoose}
            transition={{ duration: 1.4, ease: easing }}
            style={{ bottom: 0 }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                className="relative mb-12 last:mb-0 md:flex md:items-start"
              >
                {/* Timeline node */}
                <div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-500 bg-white dark:bg-dark-900"
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                  >
                    <Briefcase size={20} className="text-primary-500" />
                  </motion.div>
                </div>

                {/* Date — left side on desktop */}
                <motion.div
                  variants={i % 2 === 0 ? fadeLeft : fadeRight}
                  className="ml-16 md:ml-0 md:w-1/2 md:pr-12 md:text-right"
                >
                  <span className="text-sm font-medium text-primary-500">
                    {formatDate(exp.startDate, '')} — {formatDate(exp.endDate, t('experience.present'))}
                  </span>
                </motion.div>

                {/* Card — right side on desktop */}
                <motion.div
                  variants={i % 2 === 0 ? fadeRight : fadeLeft}
                  className="ml-16 mt-2 md:ml-0 md:mt-0 md:w-1/2 md:pl-12"
                >
                  <motion.div
                    className="rounded-xl border border-dark-200 bg-white p-5 shadow-sm dark:border-dark-700 dark:bg-dark-800/50"
                    whileHover={{ y: -3, boxShadow: '0 12px 40px -8px rgba(59,130,246,0.15)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                      {isVi ? exp.roleVi : exp.role}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-primary-500">{exp.company}</p>

                    <motion.ul
                      variants={staggerContainer}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewport}
                      className="space-y-2"
                    >
                      {(isVi ? exp.descriptionVi : exp.description).map((item, j) => (
                        <motion.li
                          key={j}
                          variants={fadeUp}
                          className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-300"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-dark-100 px-2 py-0.5 text-xs font-medium text-dark-600 dark:bg-dark-700 dark:text-dark-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
