'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, Star } from 'lucide-react';
import { Camper } from '@/lib/types/camper';
import { getCamperById } from '@/lib/api/campers';
import { formatPrice } from '@/lib/utils/formatters';
import { Loader } from '@/components/ui/Loader';
import { Gallery } from '@/components/details/Gallery';
import { Features } from '@/components/details/Features';
import { Reviews } from '@/components/details/Reviews';
import { BookingForm } from '@/components/details/BookingForm';
import styles from './page.module.css';

export default function CamperDetailsPage() {
  const params = useParams();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        setIsLoading(true);
        const data = await getCamperById(params.id as string);
        setCamper(data);
      } catch (error) {
        console.error('Error fetching camper:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCamper();
    }
  }, [params.id]);

  if (isLoading) {
    return <Loader size="lg" fullScreen />;
  }

  if (!camper) {
    return (
      <div className={styles.container}>
        <h1>Camper not found</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>

        <div className={styles.ratingLocation}>
          <div className={styles.ratingWrapper}>
            <Star size={16} fill="#ffc531" color="#ffc531" />
            <span>
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={styles.locationWrapper}>
            <MapPin size={16} />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.price}>{formatPrice(camper.price)}</p>
      </div>

      <Gallery images={camper.gallery} name={camper.name} />

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.tabContent}>
          {activeTab === 'features' ? (
            <Features camper={camper} />
          ) : (
            <Reviews reviews={camper.reviews} />
          )}
        </div>

        <div className={styles.bookingWrapper}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}