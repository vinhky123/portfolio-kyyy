import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h2 className="mb-3 text-3xl font-bold text-dark-900 md:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="text-dark-500 dark:text-dark-400">{subtitle}</p>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary-400 to-primary-600" />
    </motion.div>
  );
}
