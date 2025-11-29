import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import GlassCard from './GlassCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8 z-50"
        >
          <GlassCard
            className={cn("bg-white/10 backdrop-blur-2xl border border-white/30 rounded-3xl p-8", className)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()} // Prevent closing modal when clicking inside
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {children}
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
