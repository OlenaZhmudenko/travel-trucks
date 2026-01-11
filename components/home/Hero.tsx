import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Campers of your dreams
          </h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <Link href="/catalog">
            <Button size="lg">
              View Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};