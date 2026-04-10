import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink, Network } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { projects } from '../../data/projects';
import { fadeUp, staggerContainer, viewport } from '../../lib/animations';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => {
            const hasArch = Boolean(project.architectureImage);
            return (
              <motion.article
                key={project.id}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`group relative overflow-hidden rounded-2xl border border-dark-200 bg-white shadow-sm hover:shadow-xl dark:border-dark-700 dark:bg-dark-800/50 ${
                  hasArch ? 'md:col-span-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className={`relative p-6 ${hasArch ? 'md:grid md:grid-cols-2 md:gap-6' : ''}`}>
                  <div>
                    {project.featured && (
                      <span className="mb-3 inline-block rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-500">
                        Featured
                      </span>
                    )}

                    <h3 className="mb-2 text-xl font-bold text-dark-900 dark:text-white">
                      {isVi ? project.titleVi : project.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-dark-500 dark:text-dark-400">
                      {isVi ? project.descriptionVi : project.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-dark-100 px-2.5 py-1 text-xs font-medium text-dark-600 dark:bg-dark-700 dark:text-dark-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-dark-500 transition-colors hover:text-primary-500 dark:text-dark-400"
                        >
                          <Github size={16} />
                          {t('projects.view_code')}
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-dark-500 transition-colors hover:text-primary-500 dark:text-dark-400"
                        >
                          <ExternalLink size={16} />
                          {t('projects.view_demo')}
                        </a>
                      )}
                    </div>
                  </div>

                  {hasArch && (
                    <div className="mt-4 flex items-start md:mt-0">
                      <div className="w-full overflow-hidden rounded-xl border border-dark-200 bg-white p-2 dark:border-dark-600">
                        <div className="mb-2 flex items-center gap-1.5 px-1">
                          <Network size={13} className="text-primary-500" />
                          <span className="text-xs font-medium text-dark-500 dark:text-dark-400">
                            Architecture
                          </span>
                        </div>
                        <img
                          src={project.architectureImage}
                          alt={`${isVi ? project.titleVi : project.title} architecture`}
                          className="w-full rounded-lg object-contain"
                          loading="lazy"
                          style={{ background: '#fff' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
