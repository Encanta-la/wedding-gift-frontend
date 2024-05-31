import type { GiftCardDto } from '@/types/giftCard.type';

import GiftCard from '../../molecules/giftCard/giftCard';
import styles from './giftCardList.module.scss';

interface GiftCardListProps {
  giftCardList: GiftCardDto[];
}

export default function GiftCardList({ giftCardList }: GiftCardListProps) {
  return (
    <div className={styles.giftCardList}>
      {giftCardList.map((item, index) => (
        <GiftCard key={index} giftCard={item} />
      ))}
    </div>
  );
}
