import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, Mail, Github, Linkedin } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { personal } from '../../data/personal';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/placeholder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputStyles =
    'w-full rounded-xl border border-dark-200 bg-white px-4 py-3 text-sm text-dark-900 placeholder-dark-400 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-dark-700 dark:bg-dark-800 dark:text-white dark:placeholder-dark-500';

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeading title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-8 leading-relaxed text-dark-600 dark:text-dark-300">
              {t('contact.description')}
            </p>

            <div className="space-y-4">
              {[
                { icon: Mail, label: personal.email, href: `mailto:${personal.email}` },
                { icon: Github, label: 'GitHub', href: personal.github },
                { icon: Linkedin, label: 'LinkedIn', href: personal.linkedin },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={label === personal.email ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-dark-200 p-4 text-dark-600 transition-all hover:border-primary-500 hover:text-primary-500 dark:border-dark-700 dark:text-dark-300 dark:hover:border-primary-500"
                >
                  <Icon size={20} className="text-primary-500" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder={t('contact.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={inputStyles}
            />
            <input
              type="email"
              placeholder={t('contact.email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className={inputStyles}
            />
            <textarea
              placeholder={t('contact.message')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className={`${inputStyles} resize-none`}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? (
                t('contact.sending')
              ) : (
                <>
                  <Send size={18} />
                  {t('contact.send')}
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="text-center text-sm font-medium text-green-500">{t('contact.success')}</p>
            )}
            {status === 'error' && (
              <p className="text-center text-sm font-medium text-red-500">{t('contact.error')}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
