import React from 'react';
import { Camper } from '@/lib/types/camper';
import { CamperCard } from './CamperCard';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import styles from './CamperList.module.css';

interface CamperListProps {
  campers: Camper[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const CamperList: React.FC<CamperListProps> = ({
  campers,
  isLoading,
  hasMore,
  onLoadMore,
}) => {
  if (isLoading && campers.length === 0) {
    return <Loader size="lg" />;
  }

  if (!isLoading && campers.length === 0) {
    return (
      <div className={styles.empty}>
        <h3 className={styles.emptyTitle}>No campers found</h3>
        <p className={styles.emptyText}>
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <Button
            onClick={onLoadMore}
            isLoading={isLoading}
            disabled={isLoading}
            className={styles.loadMoreButton}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};