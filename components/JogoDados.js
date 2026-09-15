"use client";

import { useState } from "react";
import Dado from "./Dado";
import styles from "./JogoDados.module.css";

const TOTAL_RODADAS = 5;


function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function JogoDados() {
 
  const [rodada, setRodada] = useState(1);
  const [vez, setVez] = useState(1); 
  const [dadosJogador1, setDadosJogador1] = useState([null, null]);
  const [dadosJogador2, setDadosJogador2] = useState([null, null]);
  const [vitorias1, setVitorias1] = useState(0);
  const [vitorias2, setVitorias2] = useState(0);
  const [mensagem, setMensagem] = useState("Jogador 1, jogue os dados!");
  const [jogoAcabou, setJogoAcabou] = useState(false);

  
  function jogarJogador1() {
    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador1(novosDados);
    setVez(2);
    setMensagem("Jogador 2, jogue os dados!");
  }

  
    function jogarJogador2() {
    const novosDados = [rolarDado(), rolarDado()];
    setDadosJogador2(novosDados);

    const soma1 = dadosJogador1[0] + dadosJogador1[1];
    const soma2 = novosDados[0] + novosDados[1];

    let resultadoRodada = "";
    let totalVitorias1 = vitorias1;
    let totalVitorias2 = vitorias2;

    if (soma1 > soma2) {
      resultadoRodada = "Jogador 1 venceu";
      totalVitorias1 = vitorias1 + 1;
    } else if (soma2 > soma1) {
      resultadoRodada = "Jogador 2 venceu";
      totalVitorias2 = vitorias2 + 1;
    } else {
      resultadoRodada = "Empate";
    }

    setVitorias1(totalVitorias1);
    setVitorias2(totalVitorias2);

    
    if (rodada === TOTAL_RODADAS) {
      let resultadoFinal = "";
      if (totalVitorias1 > totalVitorias2) {
        resultadoFinal = "Jogador 1 venceu o jogo!";
      } else if (totalVitorias2 > totalVitorias1) {
        resultadoFinal = "Jogador 2 venceu o jogo!";
      } else {
        resultadoFinal = "Empate geral!";
      }

      setMensagem(resultadoRodada + " — " + resultadoFinal);
      setJogoAcabou(true);
      return;
    }

   
    setMensagem(resultadoRodada);
    setRodada(rodada + 1);
    setVez(1);
    setDadosJogador1([null, null]);
  }

  
  function jogarNovamente() {
    setRodada(1);
    setVez(1);
    setDadosJogador1([null, null]);
    setDadosJogador2([null, null]);
    setVitorias1(0);
    setVitorias2(0);
    setMensagem("Jogador 1, jogue os dados!");
    setJogoAcabou(false);
  }

  return (
    <div className={styles.tabuleiro}>
      <h1 className={styles.titulo}>Jogo de Dados</h1>
      <p className={styles.rodada}>
        Rodada {rodada}/{TOTAL_RODADAS}
      </p>

      <div className={styles.jogadores}>
        <section className={styles.coluna}>
          <h2 className={styles.nomeJogador}>Jogador 1</h2>
          <div className={styles.dados}>
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>
          <button
            className={styles.botaoJogar}
            onClick={jogarJogador1}
            disabled={jogoAcabou || vez !== 1}
          >
            Jogar
          </button>
          <p className={styles.pontos}>Vitórias: {vitorias1}</p>
        </section>

        <section className={styles.coluna}>
          <h2 className={styles.nomeJogador}>Jogador 2</h2>
          <div className={styles.dados}>
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <button
            className={styles.botaoJogar}
            onClick={jogarJogador2}
            disabled={jogoAcabou || vez !== 2}
          >
            Jogar
          </button>
          <p className={styles.pontos}>Vitórias: {vitorias2}</p>
        </section>
      </div>

      <div className={styles.mensagem} role="status" aria-live="polite">
        {mensagem}
      </div>

      {jogoAcabou && (
        <button className={styles.botaoReiniciar} onClick={jogarNovamente}>
          Jogar novamente
        </button>
      )}
    </div>
  );
}
