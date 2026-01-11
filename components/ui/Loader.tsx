import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  className = '',
  fullScreen = false,
}) => {
  const spinnerClasses = [
    styles.spinner,
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const spinner = (
    <div
      className={spinnerClasses}
      role="status"
      aria-label="Loading"
    />
  );

  if (fullScreen) {
    return (
      <div className={styles.fullScreen}>
        {spinner}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {spinner}
    </div>
  );
};