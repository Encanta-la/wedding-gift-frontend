'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import GiftCardList from '@/components/organisms/giftCardList/giftCardList';
import Pster from '@/components/organisms/pster/pster.organism';

import type { GiftCardDto } from '@/types/giftCard.type';
import Header from '@/components/organisms/header/header';
import WhoIsModal from '@/components/molecules/whoIsModal/whoIsModal';
import { GuestDto } from '@/types/guest.type';

import GiftDetailModal from '@/components/organisms/giftDetailModal/giftDetailModal';

import '@fontsource/great-vibes';

export default function Home() {
  const [data, setData] = useState<GiftCardDto[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const [whoIsModal, setWhoIsModal] = useState(false);
  const [whoIs, setWhoIs] = useState<GuestDto | undefined>(undefined);

  const [giftDetailModal, setGiftDetailModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<GiftCardDto | undefined>(
    undefined
  );

  const openGiftDetailModal = (gift: GiftCardDto) => {
    setSelectedGift(gift);
    setGiftDetailModal(true);
  };

  const closeGiftDetailModal = () => {
    setSelectedGift(undefined);
    setGiftDetailModal(false);
  };

  // #region Who Is

  const onSubmitWhoIsForm = (data: GuestDto) => {
    setWhoIsModal(false);
    setWhoIs(data);
  };

  const deleteWhoIs = () => {
    localStorage.removeItem('whoIs');
    setWhoIs(undefined);
    setWhoIsModal(true);
  };

  useEffect(() => {
    const whoIs = localStorage.getItem('whoIs');

    if (!whoIs) {
      setWhoIsModal(true);
      return;
    }

    setWhoIs(JSON.parse(whoIs));
  }, []);

  // #endregion

  // #region Get Gifts

  const fetchGifts = async () => {
    try {
      const response = await fetch('/api/gift');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  // #endregion

  return (
    <>
      <Header />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <main className={styles.main}>
          <p>
            Muito obrigado por compartilhar esse momento conosco ❤️ estes são os
            presentes que gostaríamos de receber.
          </p>
          {data && (
            <GiftCardList
              giftCardList={data}
              onGiftClick={openGiftDetailModal}
            />
          )}
          {whoIs && (
            <p>
              Olá {whoIs.name}! Não é você?{' '}
              <a className={styles.whoIsLeave} onClick={deleteWhoIs}>
                Sair
              </a>
            </p>
          )}
        </main>
      )}
      <Pster />
      {whoIsModal && <WhoIsModal onSubmitEvent={onSubmitWhoIsForm} />}
      {giftDetailModal && (
        <GiftDetailModal
          selectedGift={selectedGift as GiftCardDto}
          closeModal={closeGiftDetailModal}
          updateGifts={fetchGifts}
        />
      )}
    </>
  );
}
