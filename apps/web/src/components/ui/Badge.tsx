import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  className = '',
  ...props
}) => {
  const variantStyles = {
    success: 'bg-brand-mint text-brand-green-dark border-brand-green/20',
    warning: 'bg-brand-soft-orange text-amber-800 border-amber-300',
    error: 'bg-brand-soft-red text-red-800 border-red-200',
    info: 'bg-brand-soft-blue text-cyan-900 border-cyan-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
