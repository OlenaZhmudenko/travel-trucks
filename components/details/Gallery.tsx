import React from 'react';
import Image from 'next/image';
import { Gallery as GalleryType } from '@/lib/types/camper';
import styles from './Gallery.module.css';

interface GalleryProps {
  images: GalleryType[];
  name: string;
}

export const Gallery: React.FC<GalleryProps> = ({ images, name }) => {
  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Image
            src={image.original}
            alt={`${name} - photo ${index + 1}`}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
};