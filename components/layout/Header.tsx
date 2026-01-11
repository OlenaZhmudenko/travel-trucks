"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
        
          <Link href="/" className={styles.logo}>
            Travel<span className={styles.logoAccent}>Trucks</span>
          </Link>

          <ul className={styles.navList}>
            <li>
              <Link
                href="/"
                className={`${styles.navLink} ${isActive('/') && pathname === '/' ? styles.active : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={`${styles.navLink} ${isActive('/catalog') ? styles.active : ''}`}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};