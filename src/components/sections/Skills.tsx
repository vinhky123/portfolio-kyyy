import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeading from '../ui/SectionHeading';
import SkillIcon from '../ui/SkillIcon';
import { skillCategories } from '../../data/skills';
import { fadeUp, staggerContainer, staggerContainerSlow, viewport } from '../../lib/animations';

export default function Skills() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';

  return (
    <section id="skills" className="bg-dark-50 py-20 dark:bg-dark-900/50">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('skills.title')} subtitle={t('skills.subtitle')} />

        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-10"
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.category} variants={fadeUp}>
              <h3 className="mb-4 text-lg font-semibold text-dark-800 dark:text-dark-200">
                {isVi ? cat.categoryVi : cat.category}
              </h3>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="flex flex-wrap gap-3"
              >
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={fadeUp}
                    whileHover={{ scale: 1.06, y: -3 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="flex items-center gap-2.5 rounded-xl border border-dark-200 bg-white px-4 py-2.5 shadow-sm hover:shadow-md dark:border-dark-700 dark:bg-dark-800"
                  >
                    <SkillIcon iconName={skill.icon} className="h-5 w-5 text-primary-500" />
                    <span className="text-sm font-medium text-dark-700 dark:text-dark-200">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}

                {cat.hasMore && (
                  <motion.div
                    variants={fadeUp}
                    className="flex items-center gap-2 rounded-xl border border-dashed border-primary-400 bg-primary-500/5 px-4 py-2.5"
                  >
                    <span className="text-sm font-medium text-primary-500">+ and more…</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
