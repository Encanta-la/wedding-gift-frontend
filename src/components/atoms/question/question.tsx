import Image from 'next/image';
import styles from './question.module.scss';

interface QuestionProps {
  text: string;
}

export default function Question({ text }: QuestionProps) {
  return (
    <div className={styles.question}>
      <Image
        className={styles.question__icon}
        src="question.svg"
        alt="Pergunta"
        width={24}
        height={24}
      />
      <p className={styles.question__text}>{text}</p>
    </div>
  );
}
