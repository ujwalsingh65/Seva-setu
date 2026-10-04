import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-pill transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantStyles = {
    primary: 'bg-brand-green text-white hover:bg-brand-green-dark focus:ring-brand-green',
    secondary: 'bg-white text-brand-green border border-brand-green hover:bg-brand-light-green focus:ring-brand-green',
    destructive: 'bg-brand-soft-red text-red-700 hover:bg-red-100 border border-red-200 focus:ring-red-500',
    emergency: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
