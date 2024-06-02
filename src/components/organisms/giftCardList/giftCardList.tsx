import type { GiftCardDto } from '@/types/giftCard.type';

import GiftCard from '../../molecules/giftCard/giftCard';
import styles from './giftCardList.module.scss';

interface GiftCardListProps {
  giftCardList: GiftCardDto[];
  onGiftClick: (gift: GiftCardDto) => void;
}

export default function GiftCardList({
  giftCardList,
  onGiftClick,
}: GiftCardListProps) {
  return (
    <div className={styles.giftCardList}>
      {giftCardList.map((item, index) => (
        <GiftCard key={index} giftCard={item} onGiftClick={onGiftClick} />
      ))}
    </div>
  );
}
