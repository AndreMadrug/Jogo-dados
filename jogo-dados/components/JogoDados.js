"use client";

import { useState } from "react";
import Dado from "./Dado";
import styles from "./JogoDados.module.css";

const TOTAL_RODADAS = 5;

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1;
}

function estadoInicial() {
  return {
    rodada: 1,
    turno: 1,
    dadosJogador1: [null, null],
    dadosJogador2: [null, null],
    placar: { 1: 0, 2: 0 },
    mensagem: "Jogador 1, jogue os dados!",
    finalizado: false,
  };
}

export default function JogoDados() {
  const [estado, setEstado] = useState(estadoInicial);

  const {
    rodada,
    turno,
    dadosJogador1,
    dadosJogador2,
    placar,
    mensagem,
    finalizado,
  } = estado;

  function jogar(jogador) {
    if (finalizado || turno !== jogador) return;

    const novosDados = [rolarDado(), rolarDado()];

    
    if (jogador === 1) {
      setEstado((atual) => ({
        ...atual,
        dadosJogador1: novosDados,
        turno: 2,
        mensagem: "Jogador 2, jogue os dados!",
      }));
      return;
    }

    
    setEstado((atual) => {
      const somaJogador1 = atual.dadosJogador1[0] + atual.dadosJogador1[1];
      const somaJogador2 = novosDados[0] + novosDados[1];

      let mensagemRodada;
      const novoPlacar = { ...atual.placar };

      if (somaJogador1 > somaJogador2) {
        mensagemRodada = "Jogador 1 venceu";
        novoPlacar[1] += 1;
      } else if (somaJogador2 > somaJogador1) {
        mensagemRodada = "Jogador 2 venceu";
        novoPlacar[2] += 1;
      } else {
        mensagemRodada = "Empate";
      }

      const ultimaRodada = atual.rodada === TOTAL_RODADAS;

      if (ultimaRodada) {
        let mensagemFinal;
        if (novoPlacar[1] > novoPlacar[2]) {
          mensagemFinal = "Jogador 1 venceu o jogo!";
        } else if (novoPlacar[2] > novoPlacar[1]) {
          mensagemFinal = "Jogador 2 venceu o jogo!";
        } else {
          mensagemFinal = "Empate geral!";
        }

        return {
          ...atual,
          dadosJogador2: novosDados,
          placar: novoPlacar,
          mensagem: `${mensagemRodada} — ${mensagemFinal}`,
          finalizado: true,
        };
      }

      return {
        ...atual,
        dadosJogador2: novosDados,
        placar: novoPlacar,
        mensagem: mensagemRodada,
        rodada: atual.rodada + 1,
        turno: 1,
        dadosJogador1: [null, null],
      };
    });
  }

  function jogarNovamente() {
    setEstado(estadoInicial());
  }

  return (
    <div className={styles.tabuleiro}>
      <h1 className={styles.titulo}>Jogo de Dados</h1>
      <p className={styles.rodada}>
        Rodada {Math.min(rodada, TOTAL_RODADAS)}/{TOTAL_RODADAS}
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
            onClick={() => jogar(1)}
            disabled={finalizado || turno !== 1}
          >
            Jogar
          </button>
          <p className={styles.pontos}>Vitórias: {placar[1]}</p>
        </section>

        <section className={styles.coluna}>
          <h2 className={styles.nomeJogador}>Jogador 2</h2>
          <div className={styles.dados}>
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>
          <button
            className={styles.botaoJogar}
            onClick={() => jogar(2)}
            disabled={finalizado || turno !== 2}
          >
            Jogar
          </button>
          <p className={styles.pontos}>Vitórias: {placar[2]}</p>
        </section>
      </div>

      <div className={styles.mensagem} role="status" aria-live="polite">
        {mensagem}
      </div>

      {finalizado && (
        <button className={styles.botaoReiniciar} onClick={jogarNovamente}>
          Jogar novamente
        </button>
      )}
    </div>
  );
}
