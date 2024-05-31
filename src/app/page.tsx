'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import GiftCardList from '@/components/organisms/giftCardList/giftCardList';
import Pster from '@/components/organisms/pster/pster.organism';

import type { GiftCardDto } from '@/types/giftCard.type';

export default function Home() {
  const [data, setData] = useState<GiftCardDto[] | undefined>(undefined);

  useEffect(() => {
    // Fazendo fetch da API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/gift');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h3>Lista de Presentes</h3>
        <h1>João e Gabriela</h1>
      </header>
      <main className={styles.main}>
        {data && <GiftCardList giftCardList={data} />}
      </main>
      <Pster />
    </>
  );
}
