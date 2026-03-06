import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, ChevronDown, FileText } from 'lucide-react';
import { personal } from '../../data/personal';

function useTypingEffect(texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentFullText = texts[textIndex];

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        return { next: currentFullText.slice(0, displayText.length + 1), delay: typingSpeed };
      }
      return { next: displayText, delay: pauseTime, startDeleting: true };
    }

    if (displayText.length > 0) {
      return { next: currentFullText.slice(0, displayText.length - 1), delay: deletingSpeed };
    }
    return { next: '', delay: typingSpeed, nextText: true };
  }, [displayText, textIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseTime]);

  useEffect(() => {
    const result = tick();
    const timeout = setTimeout(() => {
      setDisplayText(result.next);
      if (result.startDeleting) setIsDeleting(true);
      if (result.nextText) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, result.delay);
    return () => clearTimeout(timeout);
  }, [tick, texts.length]);

  return displayText;
}

export default function Hero() {
  const { t, i18n } = useTranslation();
  const roles = t('hero.roles', { returnObjects: true }) as string[];
  const typedText = useTypingEffect(roles);
  const name = i18n.language === 'vi' ? personal.nameVi : personal.name;

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${(i * 2.5 + Math.sin(i * 7) * 15 + 50) % 100}%`,
        top: `${(i * 2.3 + Math.cos(i * 5) * 20 + 50) % 100}%`,
        duration: 3 + (i % 5),
        delay: (i % 7) * 0.5,
      })),
    []
  );

  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute h-1 w-1 rounded-full bg-primary-500/20"
            style={{ left: p.left, top: p.top }}
            animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4 text-lg font-medium text-primary-500"
        >
          {t('hero.greeting')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4 text-5xl font-extrabold text-dark-900 md:text-7xl dark:text-white"
        >
          {name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6 flex h-10 items-center justify-center"
        >
          <span className="text-xl font-medium text-dark-500 md:text-2xl dark:text-dark-300">
            {typedText}
          </span>
          <span className="ml-0.5 inline-block h-7 w-0.5 animate-pulse bg-primary-500" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-dark-500 dark:text-dark-400"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-10 flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 hover:-translate-y-0.5"
          >
            {t('hero.cta_projects')}
          </button>
          <a
            href={personal.cvLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-dark-300 px-6 py-3 font-medium text-dark-700 transition-all hover:border-primary-500 hover:text-primary-500 hover:-translate-y-0.5 dark:border-dark-600 dark:text-dark-300 dark:hover:border-primary-500 dark:hover:text-primary-500"
          >
            <FileText size={18} />
            {t('hero.cta_cv')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex justify-center gap-5"
        >
          {[
            { href: personal.github, icon: Github, label: 'GitHub' },
            { href: personal.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${personal.email}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="rounded-full border border-dark-200 p-3 text-dark-500 transition-all hover:border-primary-500 hover:text-primary-500 hover:shadow-lg hover:-translate-y-1 dark:border-dark-700 dark:text-dark-400 dark:hover:border-primary-500"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="text-dark-400 dark:text-dark-500" size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
