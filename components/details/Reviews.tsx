import React from 'react';
import { Review } from '@/lib/types/camper';
import { Rating } from '@/components/ui/Rating';
import styles from './Reviews.module.css';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className={styles.reviews}>
        <p className={styles.empty}>No reviews yet</p>
      </div>
    );
  }

  return (
    <div className={styles.reviews}>
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.review}>
            <div className={styles.reviewHeader}>
              <div className={styles.avatar}>
                {review.reviewer_name.charAt(0).toUpperCase()}
              </div>
              
              <div className={styles.reviewInfo}>
                <h4 className={styles.reviewerName}>
                  {review.reviewer_name}
                </h4>
                <Rating rating={review.reviewer_rating} size="sm" />
              </div>
            </div>
            
            <p className={styles.comment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};