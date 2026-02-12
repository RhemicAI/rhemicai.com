'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoContainer}>
        <Image
          src="/Rhemic logo(:bg).png"
          alt="Rhemic AI"
          width={140}
          height={36}
          className={styles.logo}
          priority
        />
      </div>

      <ul className={styles.navLinks}>
        <li><a href="#product" className={styles.navLink}>Product</a></li>
        <li><a href="#solutions" className={styles.navLink}>Solutions</a></li>
        <li><a href="#about" className={styles.navLink}>About</a></li>
        <li>
          <button className={styles.ctaButton}>
            <span className={styles.ctaButtonText}>Book a Demo</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
