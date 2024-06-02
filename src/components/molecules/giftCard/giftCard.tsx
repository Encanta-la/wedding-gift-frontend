import Image from 'next/image';
import styles from './giftCard.module.scss';

import type { GiftCardDto } from '@/types/giftCard.type';

interface GiftCardProps {
  giftCard: GiftCardDto;
  onGiftClick: (gift: GiftCardDto) => void;
}

export default function GiftCard({ giftCard, onGiftClick }: GiftCardProps) {
  const reservedStyle = giftCard.giftBuyerId ? styles.reserved : '';

  return (
    <div className={`${styles.giftCard} ${reservedStyle}`}>
      <header>
        <img src={giftCard.photoUrl} alt="Gift Card Image" />
        <p>{giftCard.name}</p>
      </header>
      {!giftCard.giftBuyerId ? (
        <footer onClick={() => onGiftClick(giftCard)}>
          <p>Ver Detalhes</p>
        </footer>
      ) : (
        <footer className={styles.reservado}>
          <p>Reservado</p>
        </footer>
      )}
    </div>
  );
}
