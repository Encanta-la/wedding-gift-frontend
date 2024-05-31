import Image from 'next/image';
import Link from 'next/link';

import style from './pster.module.scss';

export interface PsterProps {
  night?: boolean;
  mini?: boolean;
}

export default function Pster({ night, mini }: PsterProps) {
  const nightClass = night ? style.night : '';

  const getImage = () => {
    if (night) {
      if (mini) {
        return (
          <Image
            src='/pster/psterMiniNight.svg'
            alt='Logo'
            width={23}
            height={17}
          />
        );
      }
      return (
        <Image src='/pster/psterNight.svg' alt='Logo' width={115} height={17} />
      );
    }
    if (mini) {
      return (
        <Image src='/pster/psterMini.svg' alt='Logo' width={23} height={17} />
      );
    }
    return <Image src='/pster/pster.svg' alt='Logo' width={115} height={17} />;
  };

  return (
    <div className={`${style.pster} ${nightClass}`}>
      <h1>Desenvolvido por:</h1>
      <Link href='https://www.linkedin.com/company/joaopster/'>
        {getImage()}
      </Link>
    </div>
  );
}
