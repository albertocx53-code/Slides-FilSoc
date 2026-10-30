# Fil&Soc Slides

Plataforma de apresentações de Filosofia e Sociologia, no mesmo visual da Fil&Soc.
Site estático: não precisa de instalação, banco de dados nem variáveis.

## Publicar na Vercel
1. Crie um repositório novo no GitHub (por exemplo `filsoc-slides`).
2. Envie TODO o conteúdo desta pasta: `index.html`, `app.css`, `app.js`, `decks.js` e a pasta `imagens`.
3. Na Vercel: Add New → Project → escolha o repositório → Framework "Other" → Deploy.

## Como usar
- Clique em uma apresentação para ver todos os slides; "Apresentar" abre em tela cheia.
- Setas do teclado, espaço ou clique nas laterais passam os slides. No celular, deslize o dedo.
- G mostra todos os slides, N mostra a nota para o professor, F liga a tela cheia, Esc sai.
- "Imprimir ou salvar em PDF" gera um slide por página.

## Editar ou criar apresentações
Todo o conteúdo fica em `decks.js`. Copie uma apresentação inteira, troque o `slug` (sem acento e sem espaço)
e os textos. Os tipos de slide estão explicados no começo do arquivo.
Para usar uma imagem, coloque o arquivo .jpg em `imagens/` e escreva o nome dele em `img`.
