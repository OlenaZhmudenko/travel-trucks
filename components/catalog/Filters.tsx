'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Wind, ChefHat, Tv, Bath } from 'lucide-react';
import { FilterParams } from '@/lib/types/camper';
import { Button } from '@/components/ui/Button';
import styles from './Filters.module.css';

interface FiltersProps {
  onApplyFilters: (filters: FilterParams) => void;
  isLoading?: boolean;
}

export const Filters: React.FC<FiltersProps> = ({ onApplyFilters, isLoading }) => {
  const [location, setLocation] = useState('');
  const [equipment, setEquipment] = useState<Record<string, boolean>>({
    AC: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  });
  const [vehicleType, setVehicleType] = useState<string>('');

  const handleEquipmentChange = (key: string) => {
    setEquipment(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = () => {
    const filters: FilterParams = {};

    if (location.trim()) {
      filters.location = location.trim();
    }

    if (equipment.AC) filters.AC = true;
    if (equipment.kitchen) filters.kitchen = true;
    if (equipment.TV) filters.TV = true;
    if (equipment.bathroom) filters.bathroom = true;

    if (vehicleType) {
      filters.form = vehicleType;
    }

    onApplyFilters(filters);
  };

  return (
    <aside className={styles.filters}>
      <div className={styles.section}>
        <label className={styles.sectionTitle} htmlFor="location">
          Location
        </label>
        <div className={styles.locationWrapper}>
          <MapPin size={20} className={styles.locationIcon} />
          <input
            id="location"
            type="text"
            placeholder="City"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.locationInput}
          />
        </div>
      </div>

      <h3 className={styles.filtersTitle}>Filters</h3>

      <div className={styles.section}>
        <h4 className={styles.sectionTitle}>Vehicle equipment</h4>
        <div className={styles.equipmentGrid}>
          {[
            { key: 'AC', icon: <Wind size={32} />, label: 'AC' },
            { key: 'kitchen', icon: <ChefHat size={32} />, label: 'Kitchen' },
            { key: 'TV', icon: <Tv size={32} />, label: 'TV' },
            { key: 'bathroom', icon: <Bath size={32} />, label: 'Bathroom' },
          ].map((item) => (
            <label
              key={item.key}
              className={`${styles.equipmentItem} ${equipment[item.key] ? styles.active : ''}`}
            >
              <input
                type="checkbox"
                checked={equipment[item.key]}
                onChange={() => handleEquipmentChange(item.key)}
                className={styles.hiddenCheckbox}
              />
              <span className={styles.equipmentIcon}>{item.icon}</span>
              <span className={styles.equipmentLabel}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.vehicleTypeTitle}>Vehicle type</h4>
        <div className={styles.vehicleTypeGrid}>
          {[
            { value: 'panelTruck', icon: 'van', label: 'Van' },
            { value: 'fullyIntegrated', icon: 'fully-integrated', label: 'Fully Integrated' },
            { value: 'alcove', icon: 'alcove', label: 'Alcove' },
          ].map((item) => (
            <label
              key={item.value}
              className={`${styles.vehicleTypeItem} ${vehicleType === item.value ? styles.active : ''}`}
            >
              <input
                type="radio"
                name="vehicleType"
                value={item.value}
                checked={vehicleType === item.value}
                onChange={(e) => setVehicleType(e.target.value)}
                className={styles.hiddenRadio}
              />
              <span className={styles.vehicleTypeIcon}>
                <Image
                  src={`/icons/${item.icon}.svg`}
                  alt={item.label}
                  width={32}
                  height={32}
                />
              </span>
              <span className={styles.vehicleTypeLabel}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className={styles.searchButton}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Search
      </Button>
    </aside>
  );
};
