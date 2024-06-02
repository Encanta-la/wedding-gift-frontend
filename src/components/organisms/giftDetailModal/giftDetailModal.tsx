import styles from './giftDetailModal.module.scss';
import { GiftCardDto } from '@/types/giftCard.type';
import { useState } from 'react';
import GiftModal0 from '@/components/molecules/giftDetailModals/giftModal0/giftModal0';
import GiftModal1 from '@/components/molecules/giftDetailModals/giftModal1/giftModal1';
import GiftModal2 from '@/components/molecules/giftDetailModals/giftModal2/giftModal2';

interface GiftDetailModalProps {
  selectedGift: GiftCardDto;
  closeModal: () => void;
  updateGifts: () => void;
}

export default function GiftDetailModal({
  selectedGift,
  closeModal,
  updateGifts,
}: GiftDetailModalProps) {
  const [modalStep, setModalStep] = useState(0);

  return (
    <div className={styles.modalBox}>
      {modalStep === 0 && (
        <GiftModal0
          selectedGift={selectedGift}
          closeModal={closeModal}
          changeStep={() => setModalStep(1)}
        />
      )}
      {modalStep === 1 && (
        <GiftModal1
          selectedGift={selectedGift}
          closeModal={closeModal}
          changeStep={() => setModalStep(2)}
        />
      )}
      {modalStep === 2 && (
        <GiftModal2
          selectedGift={selectedGift}
          closeModal={closeModal}
          changeStep={() => setModalStep(1)}
          updateGifts={updateGifts}
        />
      )}
    </div>
  );
}
