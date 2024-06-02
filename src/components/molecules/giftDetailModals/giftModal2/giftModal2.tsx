import Button from '@/components/atoms/button/button';
import styles from './giftModal2.module.scss';
import { GiftCardDto } from '@/types/giftCard.type';
import { useEffect, useRef, useState } from 'react';
import { GuestService } from '@/service/guest.service';

interface GiftModal2Props {
  selectedGift: GiftCardDto;
  closeModal: () => void;
  changeStep: () => void;
  updateGifts: () => void;
}

export default function GiftModal2({
  selectedGift,
  closeModal,
  changeStep,
  updateGifts,
}: GiftModal2Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const guestService = new GuestService();
  const [confirmDeliveryButtonText, setConfirmDeliveryButtonText] =
    useState<string>('Confirmar entrega em mãos');

  const setGiftToGuest = async () => {
    const body = {
      giftId: selectedGift.id,
      guestMessage: '',
      guestId: guestService.getGuestId(),
    };

    const res = await fetch('/api/getGift', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return data;
  };

  const confirmHandDelivery = async () => {
    const response = await setGiftToGuest();

    if (response.error) {
      alert('Erro ao reservar presente!');
      console.error(response.error);
      return;
    }

    setConfirmDeliveryButtonText('Entrega confirmada!');
    updateGifts();

    setTimeout(() => {
      closeModal();
    }, 5000);
  };

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
      <h2>Entregar em mãos</h2>
      <div className={styles.detailModal__product}>
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
      </div>
      <section className={styles.whatDoesNow}>
        <h3>Oque fazer agora?</h3>
        <ul>
          <li>1. Tire uma print dessa tela</li>
          <li>2. Compre o presente</li>
          <li>3. Entregue em mãos</li>
        </ul>
      </section>
      <div className={styles.detailModal__buttons}>
        <Button
          text={confirmDeliveryButtonText}
          onClick={confirmHandDelivery}
        />
        <Button text="Voltar" onClick={changeStep} style="outline" />
      </div>
    </div>
  );
}
