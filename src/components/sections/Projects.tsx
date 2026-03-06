import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { projects } from '../../data/projects';

export default function Projects() {
  const { t, i18n } = useTranslation();
  const isVi = i18n.language === 'vi';

  return (
    <section id="projects" className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading title={t('projects.title')} subtitle={t('projects.subtitle')} />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-dark-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl dark:border-dark-700 dark:bg-dark-800/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="relative">
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
