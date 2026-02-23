# Treino Corrida PWA (8 semanas)

Web app estático (HTML/CSS/JS puro) para acompanhar um plano de corrida de 8 semanas (3 treinos por semana: A, B, C), com persistência local, backup e funcionamento offline.

## Funcionalidades

- Plano fixo de 8 semanas embutido no app.
- Seleção de semana (uma por vez, não fica tudo em uma única página).
- Por treino:
  - Concluído (checkbox)
  - Data
  - Distância (km)
  - Tempo (`mm:ss` ou `hh:mm:ss`)
  - BPM médio
  - Notas
  - Pace calculado automaticamente (`m:ss/km`)
- Totais por semana:
  - Km
  - Tempo
  - Progresso (`X/3`)
- Totais gerais:
  - Km
  - Tempo
  - Progresso (`X/24`)
- Persistência em `localStorage`.
- Exportar backup JSON (copia para clipboard quando possível e baixa arquivo `treino-backup.json`).
- Importar backup JSON por texto ou arquivo.
- Offline com Service Worker.

## Estrutura de arquivos

Na raiz do repositório:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.webmanifest`
- `sw.js`
- `icon.svg` (ícone vetorial usado no manifest)

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `treino-corrida`).
2. Faça upload dos arquivos para a branch `main` (raiz do projeto).
3. No GitHub, acesse **Settings → Pages**.
4. Em **Build and deployment**, selecione:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Salve e aguarde alguns segundos.
6. URL esperada do Pages:
   - `https://SEU_USUARIO.github.io/treino-corrida/`

## Como instalar no iPhone (Safari)

1. Abra a URL do GitHub Pages no Safari.
2. Toque em **Compartilhar**.
3. Escolha **Adicionar à Tela de Início**.
4. Confirme o nome e toque em **Adicionar**.
5. Abra o app pela Tela de Início (modo standalone/PWA).

## Observações importantes

- Os dados ficam salvos localmente no dispositivo (`localStorage`).
- Se limpar dados do navegador ou trocar de aparelho, os dados não vão automaticamente junto.
- Use **Exportar/Importar** para backup e restauração.
- O app funciona sem backend e sem chamadas para servidores externos.


## Compatibilidade de PR sem binários

Este repositório usa `icon.svg` em vez de arquivos `.png` binários para evitar erros de plataformas que não aceitam diff de binários (ex.: **"Arquivos binários não são compatíveis"**).

Se você quiser gerar PNGs depois para distribuição final, pode converter `icon.svg` para `icon-192.png` e `icon-512.png` localmente antes do deploy.
