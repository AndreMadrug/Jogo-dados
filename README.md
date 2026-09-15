 Jogo de Dados

Jogo para 2 jogadores, disputado em 5 rodadas. Em cada rodada, cada
jogador joga dois dados e vence quem tirar a maior soma. Ao final das
5 rodadas, vence quem tiver mais rodadas ganhas (ou empate geral).

Feito com **Next.js** (App Router) e React puro (sem bibliotecas extras).

 Estrutura do projeto

```
jogo-dados/
├── app/
│   ├── layout.js       -> layout raiz da aplicação
│   ├── page.js         -> renderiza o componente JogoDados
│   └── globals.css     -> estilos globais da página
├── components/
│   ├── Dado.js              -> componente que exibe a imagem de um dado (prop `valor`)
│   ├── Dado.module.css
│   ├── JogoDados.js         -> componente com toda a lógica do jogo
│   └── JogoDados.module.css
├── public/
│   └── dados/           -> imagens SVG dos dados (1 a 6, + "vazio")
├── package.json
└── next.config.mjs
```

 Como rodar localmente

Você vai precisar do [Node.js](https://nodejs.org/) instalado (versão 18 ou
superior).

```bash
# 1. Entre na pasta do projeto
cd jogo-dados

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
npm run dev
```

Depois abra **http://localhost:3000** no navegador.

 Passo a passo para a entrega

 1. Subir o projeto no GitHub

```bash
cd jogo-dados
git init
git add .
git commit -m "Jogo de dados em Next.js"
```

1. Crie um repositório novo (vazio, sem README) no GitHub, por exemplo
   `jogo-dados`.
2. Conecte o repositório local ao remoto e envie:

```bash
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/jogo-dados.git
git push -u origin main
```

O link do repositório (`https://github.com/SEU_USUARIO/jogo-dados`) é o
primeiro item da entrega.

 2. Publicar na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login (pode usar sua
   conta do GitHub).
2. Clique em **Add New → Project**.
3. Selecione o repositório `jogo-dados` que você acabou de subir.
4. Deixe as configurações padrão (a Vercel detecta o Next.js
   automaticamente) e clique em **Deploy**.
5. Ao final, a Vercel te dá uma URL pública, algo como
   `https://jogo-dados-seu-usuario.vercel.app`. Esse é o segundo item da
   entrega.

Qualquer novo `git push` para o `main` gera um novo deploy automático.

 3. Gravar o vídeo (até 30 segundos)

Grave a tela mostrando, na sequência:
1. Uma partida sendo jogada (alguns cliques em "Jogar" para os dois
   jogadores).
2. A mensagem final aparecendo (Jogador 1 venceu / Jogador 2 venceu /
   Empate geral).
3. O clique no botão **"Jogar novamente"**.

Suba o vídeo no YouTube como **Público** ou **Não listado** (nunca
Privado) e use esse link como terceiro item da entrega.

 Como o jogo funciona 

- O estado do jogo fica todo no componente `JogoDados` (`app/components`),
  usando `useState`.
- `turno` controla de quem é a vez: só o botão "Jogar" do jogador da vez
  fica habilitado.
- Quando o **Jogador 1** joga, o resultado é guardado e a vez passa para o
  **Jogador 2**.
- Quando o **Jogador 2** joga, o jogo compara a soma dos dois dados de
  cada jogador:
  - soma maior do Jogador 1 → "Jogador 1 venceu" (+1 vitória)
  - soma maior do Jogador 2 → "Jogador 2 venceu" (+1 vitória)
  - soma igual → "Empate"
- Se ainda não é a 5ª rodada, o jogo avança a rodada e devolve a vez ao
  Jogador 1.
- Se era a 5ª rodada, o jogo compara o placar de vitórias das duas
  jogadoras/jogadores e mostra a mensagem final, além do botão
  **"Jogar novamente"**, que reinicia todo o estado do zero.

 Personalizando

- As imagens dos dados estão em `public/dados/1.svg` … `6.svg` (e
  `vazio.svg` para o dado ainda não jogado). Você pode trocar por
  qualquer outra imagem sua, só manter os mesmos nomes de arquivo.
- As cores e o visual do tabuleiro estão em
  `components/JogoDados.module.css`.
