import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <h3>Lista de Presentes</h3>
      <h1>João e Gabriella</h1>
    </header>
  );
}
