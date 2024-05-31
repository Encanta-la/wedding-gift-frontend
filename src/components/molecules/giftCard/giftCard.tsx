import Image from 'next/image';
import styles from './giftCard.module.scss';

import type { GiftCardDto } from '@/types/giftCard.type';

interface GiftCardProps {
  giftCard: GiftCardDto;
}

export default function GiftCard({ giftCard }: GiftCardProps) {
  return (
    <div className={styles.giftCard}>
      <header>
        <Image
          src={giftCard.photoUrl}
          alt="Gift Card Image"
          width={143}
          height={143}
        />
        <p>{giftCard.name}</p>
      </header>
      <footer>
        <p>Ver Detalhes</p>
      </footer>
    </div>
  );
}
