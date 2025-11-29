import React from 'react';
import { cn } from '../lib/utils';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

const GlassPanel: React.FC<GlassPanelProps> = ({ children, className }) => {
  const glassStyles = `
    bg-white/10
    backdrop-blur-xl
    border border-white/20
    shadow-[0_0_40px_rgba(0,0,0,0.25)]
    rounded-2xl
    border-t border-white/30
    border-l border-white/20
    border-b border-black/10
    border-r border-black/10
  `;

  return (
    <div className={cn(glassStyles, className)}>
      {children}
    </div>
  );
};

export default GlassPanel;
