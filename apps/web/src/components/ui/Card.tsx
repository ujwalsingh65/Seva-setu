import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-brand-surface rounded-medium border border-brand-border p-6 shadow-card ${
        hoverable ? 'transition-shadow duration-150 hover:shadow-card-hover' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
