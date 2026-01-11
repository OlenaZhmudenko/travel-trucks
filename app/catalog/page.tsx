'use client';

import React, { useEffect } from 'react';
import { Filters } from '@/components/catalog/Filters';
import { CamperList } from '@/components/catalog/CamperList';
import { useCampersStore } from '@/lib/store/campersStore';
import { FilterParams } from '@/lib/types/camper';
import styles from './page.module.css';

export default function CatalogPage() {
  const {
    campers,
    isLoading,
    hasMore,
    setFilters,
    fetchCampers,
    loadMore,
    resetCampers,
  } = useCampersStore();

  useEffect(() => {
    fetchCampers();
  }, []);

  const handleApplyFilters = async (filters: FilterParams) => {
    resetCampers();

    setFilters(filters);
 
    await fetchCampers();
  };

  const handleLoadMore = async () => {
    await loadMore();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.filters}>
          <Filters 
            onApplyFilters={handleApplyFilters} 
            isLoading={isLoading}
          />
        </div>

        <div className={styles.listWrapper}>
          <CamperList
            campers={campers}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        </div>
      </div>
    </div>
  );
}