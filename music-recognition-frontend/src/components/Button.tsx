import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../lib/utils';

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  const buttonStyles = `
    px-6 py-3 rounded-xl
    bg-white/20 border border-white/30
    backdrop-blur-xl
    text-white font-medium
    shadow-[0_8px_20px_rgba(0,0,0,0.15)]
    hover:bg-white/30
    transition-all
  `;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(buttonStyles, className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
