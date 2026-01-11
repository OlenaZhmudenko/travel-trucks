import React from 'react';
import { Star } from 'lucide-react';
import styles from './Rating.module.css';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = false,
  className = '',
}) => {
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= Math.round(rating);

    return (
      <Star
        key={index}
        size={sizes[size]}
        className={`${styles.star} ${isFilled ? styles.filled : styles.empty}`}
      />
    );
  });

  const containerClasses = [styles.container, className].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {stars}
      {showNumber && (
        <span className={styles.number}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
};