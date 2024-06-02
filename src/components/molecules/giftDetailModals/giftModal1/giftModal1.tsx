import Button from '@/components/atoms/button/button';
import styles from './giftModal1.module.scss';
import { GiftCardDto } from '@/types/giftCard.type';
import { useEffect, useRef } from 'react';
import Question from '@/components/atoms/question/question';

interface GiftModal1Props {
  selectedGift: GiftCardDto;
  closeModal: () => void;
  changeStep: () => void;
}

export default function GiftModal1({
  selectedGift,
  closeModal,
  changeStep,
}: GiftModal1Props) {
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
      <header>
        <h2>Seu Presente</h2>
        <img src="gift.svg" alt="Presente" />
      </header>
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
      <div className={styles.deliveryMethod}>
        <h3>Como quer dar o presente?</h3>
        <section>
          <Button text="Entregarei em mãos" onClick={changeStep} />
          <Question text="Você se encarrega de comprar e dar o presente para os noivos, nós só os avisaremos." />
        </section>
      </div>
    </div>
  );
}
