import React from 'react';
import { Wind, ChefHat, Tv, Bath, Radio, Droplets, Fuel, Refrigerator, Microwave, Settings } from 'lucide-react';
import { Camper } from '@/lib/types/camper';
import { getTransmissionLabel, getEngineLabel } from '@/lib/utils/formatters';
import styles from './Features.module.css';

interface FeaturesProps {
  camper: Camper;
}

export const Features: React.FC<FeaturesProps> = ({ camper }) => {

  const equipment = [
    { icon: <Settings size={20} />, label: getTransmissionLabel(camper.transmission), show: true },
    { icon: <Settings size={20} />, label: getEngineLabel(camper.engine), show: true },
    { icon: <Wind size={20} />, label: 'AC', show: camper.AC },
    { icon: <Bath size={20} />, label: 'Bathroom', show: camper.bathroom },
    { icon: <ChefHat size={20} />, label: 'Kitchen', show: camper.kitchen },
    { icon: <Tv size={20} />, label: 'TV', show: camper.TV },
    { icon: <Radio size={20} />, label: 'Radio', show: camper.radio },
    { icon: <Refrigerator size={20} />, label: 'Refrigerator', show: camper.refrigerator },
    { icon: <Microwave size={20} />, label: 'Microwave', show: camper.microwave },
    { icon: <Fuel size={20} />, label: 'Gas', show: camper.gas },
    { icon: <Droplets size={20} />, label: 'Water', show: camper.water },
  ].filter(item => item.show);

  const details = [
    { label: 'Form', value: camper.form },
    { label: 'Length', value: camper.length },
    { label: 'Width', value: camper.width },
    { label: 'Height', value: camper.height },
    { label: 'Tank', value: camper.tank },
    { label: 'Consumption', value: camper.consumption },
  ];

  return (
    <div className={styles.features}>
      <div className={styles.equipmentList}>
        {equipment.map((item, index) => (
          <div key={index} className={styles.equipmentItem}>
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.detailsSection}>
        <h3 className={styles.detailsTitle}>Vehicle details</h3>
        <div className={styles.detailsGrid}>
          {details.map((detail, index) => (
            <div key={index} className={styles.detailRow}>
              <span className={styles.detailLabel}>{detail.label}</span>
              <span className={styles.detailValue}>{detail.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};