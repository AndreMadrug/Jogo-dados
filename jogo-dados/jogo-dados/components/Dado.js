import styles from "./Dado.module.css";

/**
 * Componente Dado
 * Recebe uma prop `valor` (número de 1 a 6, ou null/undefined
 * quando o dado ainda não foi jogado) e mostra a imagem correspondente.
 */
export default function Dado({ valor }) {
  const src = valor ? `/dados/${valor}.svg` : "/dados/vazio.svg";
  const alt = valor ? `Dado mostrando o número ${valor}` : "Dado ainda não jogado";

  return (
    <img
      src={src}
      alt={alt}
      width={72}
      height={72}
      className={styles.dado}
    />
  );
}
