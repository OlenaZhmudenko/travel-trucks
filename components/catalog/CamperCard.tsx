import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MapPin, Star, Users, Settings, Wind, ChefHat, Bath } from 'lucide-react';
import { Camper } from '@/lib/types/camper';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import { formatPrice, getTransmissionLabel } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/Button';
import styles from './CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

export const CamperCard: React.FC<CamperCardProps> = ({ camper }) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(camper.id);

  const previewImage = camper.gallery[0]?.thumb || camper.gallery[0]?.original;

  const features = [
    { 
      icon: <Users size={20} />, 
      label: `${camper.reviews.length} adults`, 
      show: true 
    },
    { 
      icon: <Settings size={20} />, 
      label: getTransmissionLabel(camper.transmission), 
      show: true 
    },
    { 
      icon: <Wind size={20} />, 
      label: 'AC', 
      show: camper.AC 
    },
    { 
      icon: <ChefHat size={20} />, 
      label: 'Kitchen', 
      show: camper.kitchen 
    },
    { 
      icon: <Bath size={20} />, 
      label: 'Bathroom', 
      show: camper.bathroom 
    },
  ].filter(f => f.show);

  return (
    <article className={styles.card}>

      <div className={styles.imageWrapper}>
        <Image
          src={previewImage}
          alt={camper.name}
          fill
          className={styles.image}
          sizes="292px"
        />
      </div>

 
      <div className={styles.content}>

        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{camper.name}</h3>
          </div>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>{formatPrice(camper.price)}</span>
            <button
              className={styles.favoriteButton}
              onClick={() => toggleFavorite(camper.id)}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={24}
                className={`${styles.favoriteIcon} ${favorite ? styles.active : ''}`}
              />
            </button>
          </div>
        </div>

        <div className={styles.ratingLocation}>
          <div className={styles.ratingWrapper}>
            <Star size={16} className={styles.starIcon} fill="#ffc531" color="#ffc531" />
            <span>
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
          </div>
          <div className={styles.locationWrapper}>
            <MapPin size={16} />
            <span>{camper.location}</span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.features}>
          {features.slice(0, 5).map((feature, index) => (
            <div key={index} className={styles.feature}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <span>{feature.label}</span>
            </div>
          ))}
        </div>

        <Link href={`/catalog/${camper.id}`} className={styles.showMoreButton}>
          <Button variant="primary">Show more</Button>
        </Link>
      </div>
    </article>
  );
};