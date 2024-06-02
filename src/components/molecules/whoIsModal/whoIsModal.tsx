import styles from './whoIsModal.module.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { LocalStorageService } from '@/service/localstorage.service';
import { useEffect } from 'react';
import { normalizePhoneNumber } from '@/utils/normalizers';
import { GuestDto } from '@/types/guest.type';

interface WhoIsModalProps {
  onSubmitEvent: (data: GuestDto) => void;
}

export default function WhoIsModal({ onSubmitEvent }: WhoIsModalProps) {
  const localStorageService = new LocalStorageService();

  const sendGuest = async (data: GuestDto): Promise<GuestDto | undefined> => {
    try {
      const response = await fetch('/api/guest', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result: GuestDto = await response.json();

      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GuestDto>();

  const onSubmit: SubmitHandler<GuestDto> = async (data) => {
    data.phone = data.phone.replace(/\D/g, '');

    const guestResult = await sendGuest(data);
    localStorageService.setItem('whoIs', JSON.stringify(guestResult));

    if (!guestResult) {
      throw new Error('Error sending guest!');
    }

    onSubmitEvent(guestResult);
  };

  const phoneValue = watch('phone');

  useEffect(() => {
    setValue('phone', normalizePhoneNumber(phoneValue));
  }, [phoneValue]);

  return (
    <div className={styles.whoIsModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Quem está presenteando?</h1>
        <div className={styles.input}>
          <p>Qual seu nome?</p>
          <input
            placeholder="Nome completo"
            {...register('name', { required: true })}
          />
        </div>

        <div className={styles.input}>
          <p>Qual seu telefone?</p>
          <input
            placeholder="(00) 00000-0000"
            {...register('phone', {
              required: true,
              minLength: 15,
            })}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
