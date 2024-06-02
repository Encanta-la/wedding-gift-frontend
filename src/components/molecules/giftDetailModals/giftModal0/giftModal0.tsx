import Button from '@/components/atoms/button/button';
import styles from './giftModal0.module.scss';
import { GiftCardDto } from '@/types/giftCard.type';
import { useEffect, useRef } from 'react';

interface GiftModal0Props {
  selectedGift: GiftCardDto;
  closeModal: () => void;
  changeStep: () => void;
}

export default function GiftModal0({
  selectedGift,
  closeModal,
  changeStep,
}: GiftModal0Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  document.addEventListener('mousedown', handleClickOutside);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={styles.detailModal} ref={modalRef}>
      <h2>Dê esse presente</h2>
      <div className={styles.productDetail}>
        <main>
          <h3>{selectedGift.name}</h3>
          <section>
            {Number(selectedGift.voltage) > 0 && (
              <p>
                <strong>Voltagem: </strong>
                {selectedGift.voltage}v
              </p>
            )}
            <p>
              <strong>Cor: </strong>
              {selectedGift.color}
            </p>
          </section>
        </main>
        <img src={selectedGift.photoUrl} alt="Air Fryer" />
      </div>
      <section className={styles.productDescription}>
        <div className={styles.productDescription__title}>
          <img src="casal.svg" alt="Casal" />
          <h3>Descrição</h3>
        </div>
        <p>{selectedGift.description}</p>
      </section>
      <Button text="Quero dar este presente" onClick={changeStep} />
    </div>
  );
}
