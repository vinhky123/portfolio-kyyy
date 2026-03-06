import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personal } from '../../data/personal';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-200 bg-white py-8 dark:border-dark-800 dark:bg-dark-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-dark-500 dark:text-dark-400">
              &copy; {year} {personal.name}. {t('footer.rights')}
            </p>
            <p className="mt-1 text-xs text-dark-400 dark:text-dark-500">
              {t('footer.built_with')}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 transition-colors hover:text-primary-500 dark:text-dark-400"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 transition-colors hover:text-primary-500 dark:text-dark-400"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-dark-500 transition-colors hover:text-primary-500 dark:text-dark-400"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
