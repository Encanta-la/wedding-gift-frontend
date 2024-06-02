import styles from './button.module.scss';

interface ButtonProps {
  style?: 'primary' | 'secondary' | 'outline';
  text: string;
  onClick?: () => void;
}

export default function Button({
  text,
  onClick,
  style = 'primary',
}: ButtonProps) {
  const styleList = {
    primary: styles.primary,
    secondary: styles.secondary,
    outline: styles.outline,
  };

  const buttonStyle = styles[style];

  return (
    <button className={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}
