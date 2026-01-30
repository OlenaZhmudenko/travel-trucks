'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import styles from './BookingForm.module.css';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bookingDate: z.string().min(1, 'Booking date is required'),
  comment: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Booking successful! We will contact you soon.');

      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Name*"
            className={styles.input}
            {...register('name')}
          />
          {errors.name && (
            <p className={styles.error}>{errors.name.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Email*"
            className={styles.input}
            {...register('email')}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
         </div>
              
        <div className={styles.formGroup}>
          <input
            type="date"
            placeholder="Booking date*"
            className={styles.input}
            {...register('bookingDate')}
          />
          {errors.bookingDate && (
            <p className={styles.error}>{errors.bookingDate.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <textarea
            placeholder="Comment"
            className={styles.textarea}
            {...register('comment')}
          />
        </div>

        <div className={styles.submitButtonWrapper}>
        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          Send
          </Button>
        </div>  
      </form>
    </div>
  );
};