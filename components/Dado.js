import styles from "./Dado.module.css";


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
