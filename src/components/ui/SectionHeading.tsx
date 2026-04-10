import { motion } from 'framer-motion';
import { fadeUp, viewport } from '../../lib/animations';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="mb-12 text-center"
    >
      <h2 className="mb-3 text-3xl font-bold text-dark-900 md:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="text-dark-500 dark:text-dark-400">{subtitle}</p>
      <motion.div
        className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}
