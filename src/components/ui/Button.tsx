import React from 'react';
import styles from './Button.module.css';
import Link from 'next/link';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  style?: React.CSSProperties;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  onClick,
  type,
  disabled,
  'aria-label': ariaLabel,
  style,
  href
}) => {
  let variantClass = styles.primary;
  if (variant === 'secondary') variantClass = styles.secondary;
  if (variant === 'outline') variantClass = styles.outline;
  if (variant === 'text') variantClass = styles.text;

  let sizeClass = styles.md;
  if (size === 'sm') sizeClass = styles.sm;
  if (size === 'lg') sizeClass = styles.lg;

  const classes = `${styles.btn} ${variantClass} ${sizeClass} ${className}`;
  
  if (href) {
    return (
      <Link 
        href={href} 
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        style={style}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      type={type || 'button'}
      disabled={disabled}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </button>
  );
};
