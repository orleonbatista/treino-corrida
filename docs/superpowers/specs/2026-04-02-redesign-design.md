# Treino Corrida — Redesign & Novas Funcionalidades

**Data:** 2026-04-02  
**Status:** Aprovado

---

## Visão geral

Reescrita do app Treino Corrida PWA com foco em:

1. Design renovado (estilo Atlético — dark mode, cyan/azul elétrico, tipografia bold)
2. Suporte a múltiplos planos de treino personalizáveis com base em templates
3. Registro de corridas avulsas (independente de plano)
4. Navegação por bottom nav com 4 tabs
5. Gráficos de evolução unificados (planos + logs)

Stack mantida: HTML/CSS/JS vanilla, sem framework, sem bundler. Dados em `localStorage`. Offline via Service Worker. Deploy no GitHub Pages.

---

## Sistema visual

### Identidade

- **Tom:** Atlético — app fitness profissional, dark mode
- **Fundo primário:** `#0f172a`
- **Superfície de cards:** `#1e293b`
- **Borda sutil:** `#263348`
- **Accent principal:** `#22d3ee` (cyan elétrico)
- **Accent secundário:** `#3b82f6` (azul)
- **Texto primário:** `#f1f5f9`
- **Texto secundário:** `#94a3b8`
- **Texto muted:** `#64748b`
- **Sucesso:** `#22c55e`
- **Perigo:** `#ef4444`

### Tipografia

- Sistema: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Títulos de seção: bold, uppercase, letter-spacing
- Labels de campo: 0.65–0.7rem, `#64748b`
- Valores de métricas: 1.4–1.8rem, bold, `#f1f5f9` ou `#22d3ee`

### Componentes base

- **Cards:** `background #1e293b`, `border-radius 14px`, `border 1px solid #263348`
- **Progress bar:** fundo `#0f172a`, fill `linear-gradient(90deg, #22d3ee, #3b82f6)`
- **Badge:** fundo com opacidade 15% da cor, texto na cor — ex. cyan para ativo, verde para concluído
- **Stat block:** `background #0f172a`, `border-radius 10px`, valor bold + label pequeno
- **FAB (botão flutuante):** circular, `background #22d3ee`, sombra cyan, posição `bottom: 72px, right: 16px`
- **Bottom nav:** `background #0a0f1e`, `border-top 1px solid #1e293b`, item ativo em `#22d3ee`, inativo em `#334155`

---

## Modelo de dados

### `tc_plans_v1` (localStorage)

Array de planos criados pelo usuário.

```json
[
  {
    "id": "uuid-v4",
    "name": "Corrida Base 8 Semanas",
    "templateId": "base-5k-8w",
    "createdAt": "2026-04-02",
    "active": true,
    "weeks": [
      {
        "week": 1,
        "trainings": [
          {
            "id": "uuid-v4",
            "label": "A",
            "title": "Base",
            "description": "3 km leve contínuo (BPM ~135–150)",
            "entry": {
              "done": false,
              "date": "",
              "km": "",
              "time": "",
              "bpm": "",
              "notes": ""
            }
          }
        ]
      }
    ]
  }
]
```

### `tc_logs_v1` (localStorage)

Array de treinos avulsos registrados na aba Treinos.

```json
[
  {
    "id": "uuid-v4",
    "date": "2026-04-01",
    "title": "Corrida matinal",
    "km": "5.2",
    "time": "28:30",
    "bpm": "152",
    "notes": "Sensação boa"
  }
]
```

### Regras

- Plano com `active: true` aparece destacado na lista; pode haver mais de um ativo simultaneamente
- `templateId` é referência ao template de origem (somente informativo, não recarrega o template)
- Templates ficam embutidos no código — não são salvos no `localStorage`
- Chave antiga `treino_corrida_v1` é ignorada — migração não automática

---

## Navegação

Roteamento via `location.hash` (`#plans`, `#logs`, `#evolution`, `#config`). Sem servidor, funciona no GitHub Pages. Cada mudança de hash troca a view renderizada no `<main>`.

### Bottom Navigation (4 tabs)

| Tab | Hash | Ícone | Cor ativa |
|---|---|---|---|
| Planos | `#plans` | 🏠 | `#22d3ee` |
| Treinos | `#logs` | 📋 | `#22d3ee` |
| Evolução | `#evolution` | 📈 | `#22d3ee` |
| Config | `#config` | ⚙️ | `#22d3ee` |

---

## Telas e fluxos

### Tab: Planos (`#plans`)

**Tela: Lista de planos**
- Header com título "Meus Planos" + subtítulo (N planos) + botão `+ Novo`
- Card por plano: nome, badge status (Ativo / Concluído), barra de progresso, stats (km total, semanas, treinos concluídos)
- Toque no card → navega para Detalhe do Plano
- Botão `+ Novo` → navega para seleção de template

**Tela: Seleção de template**
- Grid de cards de template (nome, descrição, duração, treinos/semana)
- Toque → preenche o editor de plano com a estrutura do template

**Tela: Editor de plano**
- Campo nome do plano
- Para cada semana: lista de treinos com campos label, título, descrição
- Botões: adicionar semana, adicionar treino na semana, remover treino/semana
- Botão Salvar → cria o plano e volta à lista

**Tela: Detalhe do plano**
- Header com nome do plano + navegação de semana (‹ S3 ›) + botão editar (lápis)
- Resumo da semana: progresso (X/3), distância total
- Lista de treinos da semana: label+título, descrição, stats se registrado, check de concluído
- Toque no treino → navega para tela dedicada de Card de treino

**Tela: Card de treino**
- Título e descrição do treino
- Checkbox concluído
- Campos: data, km, tempo (mm:ss ou hh:mm:ss), BPM, notas
- Pace calculado automaticamente (readonly)
- Salva com debounce 400ms

### Tab: Treinos (`#logs`)

**Tela: Histórico**
- Lista cronológica reversa de todos os treinos registrados (planos + avulsos)
- Agrupados por mês
- Item: data, origem (nome do plano ou "Avulso"), título, stats (km, tempo, BPM), pace destacado
- FAB `+` → abre formulário de registro avulso
- Toque no item → abre edição do registro

**Tela: Registro avulso**
- Campos: título, data, km, tempo, BPM, notas
- Pace calculado automaticamente
- Botão Salvar / Cancelar
- Botão Excluir (na edição)

### Tab: Evolução (`#evolution`)

- Selector de métrica: Pace / Distância / Volume semanal / BPM
- Gráfico Chart.js (linha para pace/BPM, barra para distância/volume)
- Dados combinados de planos + logs avulsos
- Filtro por plano ou "Todos"
- Mensagem "Sem dados suficientes ainda" quando não há dados

### Tab: Config (`#config`)

- Exportar backup JSON (clipboard + download de arquivo)
- Importar backup JSON (textarea ou upload de arquivo via `<dialog>`)
- Zerar todos os dados (confirmação obrigatória)

---

## Templates pré-definidos

Embutidos no código como constante `TEMPLATES`. O usuário escolhe um, o app cria um plano com a estrutura pré-preenchida que ele pode editar.

| ID | Nome | Semanas | Treinos/sem | Foco |
|---|---|---|---|---|
| `base-5k-8w` | Iniciante 5K | 8 | 3 (A·Base, B·Intervalado, C·Longo) | Completar 5K contínuo |
| `intermediate-10k-10w` | Intermediário 10K | 10 | 3 (A·Base, B·Intervalado, C·Longo) | Correr 10K com pace consistente |
| `aerobic-base-4w` | Base Aeróbica | 4 | 3 (A·Curto, B·Médio, C·Longo) | Construir resistência aeróbica |
| `custom` | Plano Livre | Definido pelo usuário | Definido pelo usuário | Estrutura vazia |

O conteúdo do template `base-5k-8w` é equivalente ao plano atual do app (8 semanas, progressão de distância e intensidade).

---

## Arquitetura do código

Reescrita em `app.js` único, organizado em seções bem delimitadas sem módulos ES (compatibilidade com SW):

```
// === CONSTANTS & TEMPLATES ===
// === DATA LAYER ===         — load/save/uuid, sem lógica de UI
// === CALCULATIONS ===       — pace, tempo, somatórios
// === ROUTER ===             — hash routing, renderView()
// === VIEWS ===
//   view: plans-list
//   view: plan-detail
//   view: plan-editor
//   view: template-picker
//   view: training-card
//   view: logs
//   view: evolution
//   view: config
// === EVENTS ===             — setupGlobalEvents()
// === INIT ===
```

Cada view é uma função `renderViewName(container)` que recebe o elemento `<main>` e o popula. A navegação limpa o container e chama a view correspondente ao hash.

---

## Service Worker

- `CACHE_NAME` versionado — incrementar a cada deploy com mudança de assets
- Lista `ASSETS` inclui todos os arquivos estáticos
- Estratégia: network-first para app shell, cache-first para demais assets
- Mensagem `REFRESH_CACHE` enviada pelo app após reset/importação

---

## Critérios de sucesso

- [ ] App funciona 100% offline após primeira carga
- [ ] Criar plano a partir de template em menos de 30 segundos
- [ ] Registrar treino avulso com FAB em menos de 20 segundos
- [ ] Gráficos mostram dados combinados de planos e logs avulsos
- [ ] Backup/restauração preserva planos e logs
- [ ] Funciona no Safari/iOS em modo standalone (PWA)
- [ ] Sem dependências externas (Chart.js em `vendor/`)
