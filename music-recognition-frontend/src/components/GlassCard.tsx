import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  const cardStyles = `
    bg-white/10 backdrop-blur-xl border border-white/10
    rounded-3xl p-6
    shadow-[0_8px_32px_rgba(0,0,0,0.2)]
    hover:bg-white/20 transition-all
  `;

  return (
    <motion.div
      className={cn(cardStyles, className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
