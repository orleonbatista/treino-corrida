// ============================================================
// === CONSTANTS & TEMPLATES ==================================
// ============================================================

const PLANS_KEY = 'tc_plans_v1';
const LOGS_KEY = 'tc_logs_v1';
const DEBOUNCE_MS = 400;

const TEMPLATES = [
  {
    id: 'base-5k-8w',
    name: 'Iniciante 5K',
    description: 'Completar 5K correndo sem parar. Progressão gradual de distância e intervalos.',
    duration: '8 semanas',
    trainingsPerWeek: 3,
    weeks: [
      { week: 1, trainings: [
        { label: 'A', title: 'Base', description: '3 km leve contínuo (BPM ~135–150; pace 9:45–10:30)' },
        { label: 'B', title: 'Intervalado', description: '5× (400m forte + 400m caminhada) • forte pace 7:00–8:00' },
        { label: 'C', title: 'Longo intercalado', description: '6 km • 5 min correndo leve + 2 min caminhando (repetir)' },
      ]},
      { week: 2, trainings: [
        { label: 'A', title: 'Base', description: '3 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '5× (400m forte + 400m caminhada)' },
        { label: 'C', title: 'Longo intercalado', description: '6 km • 5/2 (correr/caminhar)' },
      ]},
      { week: 3, trainings: [
        { label: 'A', title: 'Base', description: '4 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '6× (400m forte + 400m caminhada)' },
        { label: 'C', title: 'Longo intercalado', description: '7 km • 5/2' },
      ]},
      { week: 4, trainings: [
        { label: 'A', title: 'Base', description: '4 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '6× (400m forte + 400m caminhada)' },
        { label: 'C', title: 'Longo intercalado', description: '7 km • 5/2' },
      ]},
      { week: 5, trainings: [
        { label: 'A', title: 'Base', description: '5 km contínuo leve' },
        { label: 'B', title: 'Intervalado', description: '8× (400m forte + 400m caminhada)' },
        { label: 'C', title: 'Longo intercalado', description: '8 km • 5/2' },
      ]},
      { week: 6, trainings: [
        { label: 'A', title: 'Base', description: '5 km contínuo leve' },
        { label: 'B', title: 'Intervalado', description: '8× (400m forte + 400m caminhada)' },
        { label: 'C', title: 'Longo intercalado', description: '8 km • 5/2' },
      ]},
      { week: 7, trainings: [
        { label: 'A', title: 'Base', description: '6 km contínuo leve' },
        { label: 'B', title: 'Intervalado', description: '6× (600m forte + 400m caminhada)' },
        { label: 'C', title: 'Longo intercalado', description: '9–10 km • 5/2' },
      ]},
      { week: 8, trainings: [
        { label: 'A', title: 'Base', description: '6 km contínuo leve' },
        { label: 'B', title: 'Intervalado', description: '6× (600m forte + 400m caminhada)' },
        { label: 'C', title: 'Longo intercalado', description: '9–10 km • 5/2' },
      ]},
    ],
  },
  {
    id: 'intermediate-10k-10w',
    name: 'Intermediário 10K',
    description: 'Correr 10K com pace consistente. Para quem já consegue correr 5K contínuo.',
    duration: '10 semanas',
    trainingsPerWeek: 3,
    weeks: [
      { week: 1, trainings: [
        { label: 'A', title: 'Base', description: '5 km leve contínuo (BPM ~135–145)' },
        { label: 'B', title: 'Intervalado', description: '6× (400m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '8 km leve • pace confortável' },
      ]},
      { week: 2, trainings: [
        { label: 'A', title: 'Base', description: '5 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '6× (400m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '8 km leve' },
      ]},
      { week: 3, trainings: [
        { label: 'A', title: 'Base', description: '6 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '8× (400m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '10 km leve' },
      ]},
      { week: 4, trainings: [
        { label: 'A', title: 'Base', description: '6 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '8× (400m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '10 km leve' },
      ]},
      { week: 5, trainings: [
        { label: 'A', title: 'Base', description: '7 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '6× (600m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '12 km leve' },
      ]},
      { week: 6, trainings: [
        { label: 'A', title: 'Base', description: '7 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '6× (600m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '12 km leve' },
      ]},
      { week: 7, trainings: [
        { label: 'A', title: 'Base', description: '8 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '8× (600m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '14 km leve' },
      ]},
      { week: 8, trainings: [
        { label: 'A', title: 'Base', description: '8 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '8× (600m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '14 km leve' },
      ]},
      { week: 9, trainings: [
        { label: 'A', title: 'Base', description: '9 km leve contínuo' },
        { label: 'B', title: 'Intervalado', description: '4× (800m forte + 400m recuperação)' },
        { label: 'C', title: 'Longo', description: '16 km leve' },
      ]},
      { week: 10, trainings: [
        { label: 'A', title: 'Tapering', description: '5 km leve — descanso ativo' },
        { label: 'B', title: 'Ativação', description: '3× (400m moderado + 400m caminhada)' },
        { label: 'C', title: 'PROVA 10K', description: '🏁 Dia da corrida — dê o seu melhor!' },
      ]},
    ],
  },
  {
    id: 'aerobic-base-4w',
    name: 'Base Aeróbica',
    description: 'Construir resistência aeróbica em 4 semanas. Treinos leves, sem velocidade.',
    duration: '4 semanas',
    trainingsPerWeek: 3,
    weeks: [
      { week: 1, trainings: [
        { label: 'A', title: 'Curto', description: '3 km leve contínuo (BPM <145)' },
        { label: 'B', title: 'Médio', description: '5 km leve contínuo' },
        { label: 'C', title: 'Longo', description: '7 km leve contínuo' },
      ]},
      { week: 2, trainings: [
        { label: 'A', title: 'Curto', description: '4 km leve contínuo' },
        { label: 'B', title: 'Médio', description: '6 km leve contínuo' },
        { label: 'C', title: 'Longo', description: '8 km leve contínuo' },
      ]},
      { week: 3, trainings: [
        { label: 'A', title: 'Curto', description: '4 km leve contínuo' },
        { label: 'B', title: 'Médio', description: '6 km leve contínuo' },
        { label: 'C', title: 'Longo', description: '9 km leve contínuo' },
      ]},
      { week: 4, trainings: [
        { label: 'A', title: 'Curto', description: '5 km leve contínuo' },
        { label: 'B', title: 'Médio', description: '7 km leve contínuo' },
        { label: 'C', title: 'Longo', description: '10 km leve contínuo' },
      ]},
    ],
  },
  {
    id: 'custom',
    name: 'Plano Livre',
    description: 'Estrutura vazia — você define as semanas, treinos e descrições.',
    duration: 'Customizado',
    trainingsPerWeek: 0,
    weeks: [],
  },
];

// ============================================================
// === DATA LAYER =============================================
// ============================================================

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadPlans() {
  try { return JSON.parse(localStorage.getItem(PLANS_KEY) || '[]'); }
  catch { return []; }
}

function savePlans(plans) {
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
}

function loadLogs() {
  try { return JSON.parse(localStorage.getItem(LOGS_KEY) || '[]'); }
  catch { return []; }
}

function saveLogs(logs) {
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

function createPlanFromTemplate(template, name) {
  return {
    id: generateId(),
    name: name || template.name,
    templateId: template.id,
    createdAt: new Date().toISOString().slice(0, 10),
    active: true,
    weeks: template.weeks.map((w, wi) => ({
      week: wi + 1,
      trainings: w.trainings.map((t) => ({
        id: generateId(),
        label: t.label,
        title: t.title,
        description: t.description,
        entry: { done: false, date: '', km: '', time: '', bpm: '', notes: '' },
      })),
    })),
  };
}

function getPlanById(planId) {
  return loadPlans().find((p) => p.id === planId) || null;
}

function savePlan(plan) {
  const plans = loadPlans();
  const idx = plans.findIndex((p) => p.id === plan.id);
  if (idx >= 0) plans[idx] = plan;
  else plans.push(plan);
  savePlans(plans);
}

function deletePlan(planId) {
  savePlans(loadPlans().filter((p) => p.id !== planId));
}

function updateTrainingEntry(planId, weekIdx, trainingId, field, value) {
  const plans = loadPlans();
  const plan = plans.find((p) => p.id === planId);
  if (!plan) return;
  const training = plan.weeks[weekIdx]?.trainings.find((t) => t.id === trainingId);
  if (!training) return;
  training.entry[field] = value;
  savePlans(plans);
}

function getLogById(logId) {
  return loadLogs().find((l) => l.id === logId) || null;
}

function saveLog(log) {
  const logs = loadLogs();
  const idx = logs.findIndex((l) => l.id === log.id);
  if (idx >= 0) logs[idx] = log;
  else logs.push(log);
  saveLogs(logs);
}

function deleteLog(logId) {
  saveLogs(loadLogs().filter((l) => l.id !== logId));
}

function exportBackup() {
  return JSON.stringify({ version: 2, exportedAt: new Date().toISOString(), plans: loadPlans(), logs: loadLogs() }, null, 2);
}

function importBackup(json) {
  const parsed = JSON.parse(json);
  if (!parsed || typeof parsed !== 'object' || parsed.version !== 2) {
    throw new Error('Formato de backup inválido. Versão esperada: 2.');
  }
  if (!Array.isArray(parsed.plans) || !Array.isArray(parsed.logs)) {
    throw new Error('Backup corrompido: faltam campos "plans" ou "logs".');
  }
  savePlans(parsed.plans);
  saveLogs(parsed.logs);
}

function clearAllData() {
  localStorage.removeItem(PLANS_KEY);
  localStorage.removeItem(LOGS_KEY);
}

function getAllRegisteredEntries() {
  const plans = loadPlans();
  const logs = loadLogs();

  const planEntries = [];
  plans.forEach((plan) => {
    plan.weeks.forEach((week, weekIdx) => {
      week.trainings.forEach((training) => {
        if (training.entry.date) {
          planEntries.push({
            id: `${plan.id}::${training.id}`,
            date: training.entry.date,
            title: `${training.label} · ${training.title}`,
            km: training.entry.km,
            time: training.entry.time,
            bpm: training.entry.bpm,
            notes: training.entry.notes,
            done: training.entry.done,
            source: plan.name,
            sourceType: 'plan',
            planId: plan.id,
            weekIdx,
            trainingId: training.id,
          });
        }
      });
    });
  });

  const logEntries = logs.map((log) => ({
    ...log,
    source: 'Avulso',
    sourceType: 'log',
  }));

  return [...planEntries, ...logEntries].sort((a, b) => b.date.localeCompare(a.date));
}

// ============================================================
// === CALCULATIONS ===========================================
// ============================================================

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function parseTimeToSeconds(timeText) {
  if (!timeText || typeof timeText !== 'string') return null;
  const cleaned = timeText.trim();
  if (!cleaned) return null;
  if (!cleaned.includes(':')) {
    const normalized = normalizeTimeInput(cleaned);
    if (!normalized || normalized === cleaned) return null;
    return parseTimeToSeconds(normalized);
  }
  const parts = cleaned.split(':').map(Number);
  if (parts.some((p) => Number.isNaN(p) || p < 0)) return null;
  if (parts.length === 2) {
    const [mm, ss] = parts;
    if (ss > 59) return null;
    return mm * 60 + ss;
  }
  if (parts.length === 3) {
    const [hh, mm, ss] = parts;
    if (mm > 59 || ss > 59) return null;
    return hh * 3600 + mm * 60 + ss;
  }
  return null;
}

function normalizeTimeInput(value) {
  const cleaned = String(value || '').trim();
  if (!cleaned) return '';
  if (cleaned.includes(':')) {
    const parts = cleaned.split(':').map((p) => p.replace(/\D/g, ''));
    if (parts.length === 2) {
      return `${parts[0].slice(0,2).padStart(2,'0')}:${parts[1].slice(0,2).padStart(2,'0')}`;
    }
    if (parts.length === 3) {
      return `${parts[0].slice(0,2).padStart(2,'0')}:${parts[1].slice(0,2).padStart(2,'0')}:${parts[2].slice(0,2).padStart(2,'0')}`;
    }
  }
  const digits = cleaned.replace(/\D/g, '').slice(0, 6);
  if (!digits) return '';
  if (digits.length <= 4) {
    const padded = digits.padStart(4, '0');
    return `${padded.slice(0,2)}:${padded.slice(2,4)}`;
  }
  const padded = digits.padStart(6, '0');
  return `${padded.slice(0,2)}:${padded.slice(2,4)}:${padded.slice(4,6)}`;
}

function sanitizeTimeDraft(value) {
  const cleaned = String(value || '').trim();
  if (!cleaned) return '';
  if (cleaned.includes(':')) return cleaned.replace(/[^\d:]/g, '').replace(/:{2,}/g, ':').slice(0, 8);
  return cleaned.replace(/\D/g, '').slice(0, 6);
}

function formatSeconds(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '--:--';
  const safe = Math.round(totalSeconds);
  const hh = Math.floor(safe / 3600);
  const mm = Math.floor((safe % 3600) / 60);
  const ss = safe % 60;
  if (hh > 0) return `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
  return `${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
}

function formatPace(seconds, km) {
  if (!seconds || !km || km <= 0) return '--:--/km';
  const paceTotal = Math.round(seconds / km);
  return `${Math.floor(paceTotal / 60)}:${String(paceTotal % 60).padStart(2,'0')}/km`;
}

function formatPaceSeconds(paceSeconds) {
  if (!Number.isFinite(paceSeconds) || paceSeconds <= 0) return '--:--/km';
  const safe = Math.round(paceSeconds);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2,'0')}/km`;
}

function calcPaceFromEntry(entry) {
  const km = Number(entry.km);
  const sec = parseTimeToSeconds(entry.time);
  if (!km || km <= 0 || !sec || sec <= 0) return '--:--/km';
  return formatPace(sec, km);
}

function getWeekKey(dateStr) {
  if (!dateStr) return '';
  const d = new Date(`${dateStr}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return '';
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const wn = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(wn).padStart(2,'0')}`;
}

function buildEvolutionSeries(metric, filterPlanId) {
  const allEntries = getAllRegisteredEntries();
  const entries = filterPlanId === 'all'
    ? allEntries
    : allEntries.filter((e) => e.planId === filterPlanId || (filterPlanId === 'logs' && e.sourceType === 'log'));

  if (metric === 'pace') {
    const valid = entries.filter((e) => Number(e.km) > 0 && parseTimeToSeconds(e.time) > 0);
    return {
      labels: valid.map((e) => e.date),
      values: valid.map((e) => parseTimeToSeconds(e.time) / Number(e.km)),
      chartType: 'line',
      datasetLabel: 'Pace (min/km)',
      yLabel: 'Pace',
      isPace: true,
    };
  }
  if (metric === 'bpm') {
    const valid = entries.filter((e) => Number(e.bpm) > 0);
    return {
      labels: valid.map((e) => e.date),
      values: valid.map((e) => Number(e.bpm)),
      chartType: 'line',
      datasetLabel: 'BPM médio',
      yLabel: 'BPM',
      isPace: false,
    };
  }
  if (metric === 'distance') {
    const valid = entries.filter((e) => Number(e.km) > 0);
    return {
      labels: valid.map((e) => e.date),
      values: valid.map((e) => Number(e.km)),
      chartType: 'bar',
      datasetLabel: 'Distância (km)',
      yLabel: 'Distância (km)',
      isPace: false,
    };
  }
  // weeklyVolume
  const grouped = new Map();
  entries.forEach((e) => {
    if (!(Number(e.km) > 0)) return;
    const wk = getWeekKey(e.date);
    if (!wk) return;
    grouped.set(wk, (grouped.get(wk) || 0) + Number(e.km));
  });
  const labels = Array.from(grouped.keys()).sort((a, b) => a.localeCompare(b));
  return {
    labels,
    values: labels.map((l) => Number(grouped.get(l).toFixed(2))),
    chartType: 'bar',
    datasetLabel: 'Volume semanal (km)',
    yLabel: 'Volume semanal (km)',
    isPace: false,
  };
}

function formatMonthYear(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function formatDateBR(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}`;
}

// ============================================================
// === ROUTER =================================================
// ============================================================

const TABS = ['plans', 'logs', 'evolution', 'config'];

const router = {
  currentTab: 'plans',
  tabStacks: {
    plans: [{ view: 'plans-list', params: {} }],
    logs: [{ view: 'logs-list', params: {} }],
    evolution: [{ view: 'evolution', params: {} }],
    config: [{ view: 'config', params: {} }],
  },

  get currentView() {
    const stack = this.tabStacks[this.currentTab];
    return stack[stack.length - 1];
  },

  push(view, params = {}) {
    this.tabStacks[this.currentTab].push({ view, params });
    renderCurrentView();
  },

  pop() {
    const stack = this.tabStacks[this.currentTab];
    if (stack.length > 1) {
      stack.pop();
      renderCurrentView();
    }
  },

  setTab(tab) {
    if (!TABS.includes(tab)) return;
    this.currentTab = tab;
    const roots = {
      plans: { view: 'plans-list', params: {} },
      logs: { view: 'logs-list', params: {} },
      evolution: { view: 'evolution', params: {} },
      config: { view: 'config', params: {} },
    };
    this.tabStacks[tab] = [roots[tab]];
    updateBottomNavActive();
    renderCurrentView();
  },
};

const viewContainer = document.getElementById('view-container');
let chartInstance = null;
let saveTimer = null;

function debounceSave(fn) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(fn, DEBOUNCE_MS);
}

function renderCurrentView() {
  const { view, params } = router.currentView;
  viewContainer.innerHTML = '';
  if (chartInstance) { chartInstance.destroy(); chartInstance = null; }

  const renders = {
    'plans-list': renderPlansListView,
    'template-picker': renderTemplatePickerView,
    'plan-editor': renderPlanEditorView,
    'plan-detail': renderPlanDetailView,
    'training-card': renderTrainingCardView,
    'logs-list': renderLogsView,
    'log-form': renderLogFormView,
    'evolution': renderEvolutionView,
    'config': renderConfigView,
  };

  const fn = renders[view];
  if (fn) fn(viewContainer, params);
}

function updateBottomNavActive() {
  document.querySelectorAll('.nav-item').forEach((item) => {
    item.classList.toggle('active', item.dataset.tab === router.currentTab);
  });
}

function renderViewHeader(container, title, subtitle, rightHtml = '') {
  const stack = router.tabStacks[router.currentTab];
  const showBack = stack.length > 1;
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div class="view-header-left">
      ${showBack ? `<button class="back-btn" id="back-btn">←</button>` : ''}
      <div>
        <div class="view-title">${escapeHtml(title)}</div>
        ${subtitle ? `<div class="view-subtitle">${escapeHtml(subtitle)}</div>` : ''}
      </div>
    </div>
    ${rightHtml ? `<div class="view-header-right">${rightHtml}</div>` : ''}
  `;
  container.appendChild(header);
  if (showBack) {
    header.querySelector('#back-btn').addEventListener('click', () => router.pop());
  }
}

// ============================================================
// === VIEW: CONFIG ===========================================
// ============================================================

function renderConfigView(container) {
  renderViewHeader(container, 'Config', 'Dados e backup');

  const section = document.createElement('div');
  section.className = 'card';
  section.innerHTML = `
    <div class="config-item">
      <div>
        <div class="config-item-label">Exportar backup</div>
        <div class="config-item-desc">Copia para clipboard e baixa arquivo JSON</div>
      </div>
      <button class="btn-primary" id="export-btn">Exportar</button>
    </div>
    <div class="config-item">
      <div>
        <div class="config-item-label">Importar backup</div>
        <div class="config-item-desc">Restaurar dados a partir de arquivo JSON</div>
      </div>
      <button class="btn-ghost" id="import-btn">Importar</button>
    </div>
    <div class="config-item">
      <div>
        <div class="config-item-label">Zerar tudo</div>
        <div class="config-item-desc">Remove todos os planos e registros</div>
      </div>
      <button class="btn-danger" id="reset-btn">Zerar</button>
    </div>
  `;
  container.appendChild(section);

  section.querySelector('#export-btn').addEventListener('click', handleExport);
  section.querySelector('#import-btn').addEventListener('click', handleImportOpen);
  section.querySelector('#reset-btn').addEventListener('click', handleResetAll);
}

function handleExport() {
  const json = exportBackup();
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(json).catch(() => {});
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'treino-backup.json'; a.click();
  URL.revokeObjectURL(url);
}

function handleImportOpen() {
  const dialog = document.getElementById('import-dialog');
  document.getElementById('import-text').value = '';
  document.getElementById('import-file').value = '';
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else {
    const input = window.prompt('Cole o JSON do backup:');
    if (input) applyImport(input);
  }
}

function applyImport(json) {
  try {
    importBackup(json);
    alert('Backup importado com sucesso!');
    renderCurrentView();
    refreshServiceWorkerCache();
  } catch (e) {
    alert(`Erro ao importar: ${e.message}`);
  }
}

function handleResetAll() {
  if (!confirm('Tem certeza? Todos os planos e registros serão apagados.')) return;
  clearAllData();
  router.setTab('plans');
  refreshServiceWorkerCache();
}

function refreshServiceWorkerCache() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.getRegistration().then((reg) => {
    if (!reg) return;
    reg.update().catch(() => {});
    const worker = reg.active || reg.waiting || navigator.serviceWorker.controller;
    if (worker) worker.postMessage({ type: 'REFRESH_CACHE' });
  });
}

// ============================================================
// === GLOBAL EVENTS ==========================================
// ============================================================

function setupGlobalEvents() {
  document.getElementById('bottom-nav').addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item');
    if (!item) return;
    e.preventDefault();
    router.setTab(item.dataset.tab);
  });

  document.getElementById('import-confirm').addEventListener('click', () => {
    const textVal = document.getElementById('import-text').value.trim();
    const dialog = document.getElementById('import-dialog');
    if (textVal) {
      applyImport(textVal);
      dialog.close();
      return;
    }
    const file = document.getElementById('import-file').files[0];
    if (!file) { alert('Cole o JSON ou selecione um arquivo.'); return; }
    const reader = new FileReader();
    reader.onload = () => { applyImport(String(reader.result)); dialog.close(); };
    reader.readAsText(file);
  });

  document.getElementById('import-cancel').addEventListener('click', () => {
    document.getElementById('import-dialog').close();
  });

  window.addEventListener('storage', (e) => {
    if (e.key === PLANS_KEY || e.key === LOGS_KEY) renderCurrentView();
  });
}

// ============================================================
// === VIEW: PLANS LIST =======================================
// ============================================================

function renderPlansListView(container) {
  const plans = loadPlans();

  renderViewHeader(
    container,
    'Meus Planos',
    `${plans.length} plano${plans.length !== 1 ? 's' : ''}`,
    `<button class="btn-primary" id="new-plan-btn">+ Novo</button>`
  );

  container.querySelector('#new-plan-btn').addEventListener('click', () => {
    router.push('template-picker');
  });

  if (plans.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <div class="empty-icon">🏃</div>
      <div class="empty-title">Nenhum plano ainda</div>
      <div class="empty-desc">Toque em <strong>+ Novo</strong> para criar seu primeiro plano de treino.</div>
    `;
    container.appendChild(empty);
    return;
  }

  plans.forEach((plan) => {
    const stats = calcPlanStats(plan);
    const pct = stats.totalTrainings > 0 ? Math.round((stats.completedTrainings / stats.totalTrainings) * 100) : 0;
    const isFinished = stats.completedTrainings === stats.totalTrainings && stats.totalTrainings > 0;

    const card = document.createElement('div');
    card.className = 'card';
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <div class="card-header">
        <div>
          <div class="card-title">${escapeHtml(plan.name)}</div>
          <div class="card-subtitle">${plan.weeks.length} semanas · criado em ${escapeHtml(plan.createdAt)}</div>
        </div>
        <span class="badge ${isFinished ? 'badge-green' : 'badge-cyan'}">
          ${isFinished ? '✓ Concluído' : 'Ativo'}
        </span>
      </div>
      <div class="progress-bar mt-8">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="stat-row">
        <div class="stat"><div class="stat-val accent">${stats.totalKm.toFixed(1)}</div><div class="stat-key">km total</div></div>
        <div class="stat"><div class="stat-val">${stats.completedTrainings}/${stats.totalTrainings}</div><div class="stat-key">treinos</div></div>
        <div class="stat"><div class="stat-val">${stats.completedWeeks}/${plan.weeks.length}</div><div class="stat-key">semanas</div></div>
      </div>
    `;
    card.addEventListener('click', () => router.push('plan-detail', { planId: plan.id, weekIdx: 0 }));
    container.appendChild(card);
  });
}

function calcPlanStats(plan) {
  let totalKm = 0;
  let completedTrainings = 0;
  let completedWeeks = 0;
  const totalTrainings = plan.weeks.reduce((acc, w) => acc + w.trainings.length, 0);

  plan.weeks.forEach((week) => {
    let weekDone = 0;
    week.trainings.forEach((t) => {
      const km = Number(t.entry.km);
      if (!Number.isNaN(km) && km > 0) totalKm += km;
      if (t.entry.done) { completedTrainings++; weekDone++; }
    });
    if (weekDone === week.trainings.length && week.trainings.length > 0) completedWeeks++;
  });

  return { totalKm, completedTrainings, totalTrainings, completedWeeks };
}

// ============================================================
// === INIT ===================================================
// ============================================================

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js', { updateViaCache: 'none' })
      .then((reg) => reg.update().catch(() => {}))
      .catch((err) => console.warn('SW registration failed', err));
  });
}

function init() {
  setupGlobalEvents();
  const hash = (location.hash || '#plans').replace('#', '');
  const tab = TABS.includes(hash) ? hash : 'plans';
  router.currentTab = tab;
  updateBottomNavActive();
  renderCurrentView();
  registerServiceWorker();
}

init();

// ============================================================
// === VIEW: TEMPLATE PICKER ==================================
// ============================================================

function renderTemplatePickerView(container) {
  renderViewHeader(container, 'Novo Plano', 'Escolha um ponto de partida');

  const grid = document.createElement('div');
  grid.className = 'template-grid';

  TEMPLATES.forEach((tpl) => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.innerHTML = `
      <div class="template-name">${escapeHtml(tpl.name)}</div>
      <div class="template-desc">${escapeHtml(tpl.description)}</div>
      <div class="template-meta">
        <span class="badge badge-cyan">${escapeHtml(tpl.duration)}</span>
        ${tpl.trainingsPerWeek > 0 ? `<span class="badge badge-muted">${tpl.trainingsPerWeek}× /semana</span>` : '<span class="badge badge-muted">Livre</span>'}
      </div>
    `;
    card.addEventListener('click', () => {
      router.push('plan-editor', { templateId: tpl.id });
    });
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

// ============================================================
// === VIEW: PLAN EDITOR ======================================
// ============================================================

function renderPlanEditorView(container, params) {
  const isEdit = Boolean(params.planId);
  let plan;

  if (isEdit) {
    plan = getPlanById(params.planId);
    if (!plan) { router.pop(); return; }
    plan = JSON.parse(JSON.stringify(plan));
  } else {
    const tpl = TEMPLATES.find((t) => t.id === params.templateId) || TEMPLATES[3];
    plan = createPlanFromTemplate(tpl, tpl.id === 'custom' ? '' : tpl.name);
  }

  renderViewHeader(container, isEdit ? 'Editar Plano' : 'Criar Plano', '');

  const nameWrap = document.createElement('div');
  nameWrap.innerHTML = `
    <label class="field-label">Nome do plano</label>
    <input type="text" id="plan-name" placeholder="Ex: Minha corrida 10K" value="${escapeHtml(plan.name)}" />
  `;
  container.appendChild(nameWrap);

  const weeksContainer = document.createElement('div');
  weeksContainer.id = 'weeks-container';
  weeksContainer.style.marginTop = '14px';
  container.appendChild(weeksContainer);

  function renderWeeks() {
    weeksContainer.innerHTML = '';
    plan.weeks.forEach((week, wi) => {
      const sec = document.createElement('div');
      sec.className = 'week-section';
      sec.innerHTML = `
        <div class="week-section-header">
          <span class="week-section-title">Semana ${wi + 1}</span>
          <div style="display:flex;gap:6px;">
            <button class="btn-icon add-training-btn" data-week="${wi}" title="Adicionar treino">+</button>
            ${plan.weeks.length > 1 ? `<button class="btn-icon remove-week-btn" data-week="${wi}" title="Remover semana" style="color:var(--danger)">×</button>` : ''}
          </div>
        </div>
      `;

      week.trainings.forEach((t, ti) => {
        const row = document.createElement('div');
        row.className = 'training-editor-row';
        row.innerHTML = `
          <input type="text" class="training-label-input" value="${escapeHtml(t.label)}" placeholder="A" data-week="${wi}" data-training="${ti}" data-field="label" />
          <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
            <input type="text" value="${escapeHtml(t.title)}" placeholder="Título (ex: Base)" data-week="${wi}" data-training="${ti}" data-field="title" />
            <input type="text" value="${escapeHtml(t.description)}" placeholder="Descrição do treino" data-week="${wi}" data-training="${ti}" data-field="description" />
          </div>
          ${week.trainings.length > 1 ? `<button class="btn-icon remove-training-btn" data-week="${wi}" data-training="${ti}" style="color:var(--danger);margin-top:2px;">×</button>` : ''}
        `;
        sec.appendChild(row);
      });

      weeksContainer.appendChild(sec);
    });

    weeksContainer.querySelectorAll('input[data-field]').forEach((input) => {
      input.addEventListener('input', (e) => {
        const wi = Number(e.target.dataset.week);
        const ti = Number(e.target.dataset.training);
        const field = e.target.dataset.field;
        plan.weeks[wi].trainings[ti][field] = e.target.value;
      });
    });

    weeksContainer.querySelectorAll('.add-training-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wi = Number(btn.dataset.week);
        plan.weeks[wi].trainings.push({ id: generateId(), label: '', title: '', description: '', entry: { done: false, date: '', km: '', time: '', bpm: '', notes: '' } });
        renderWeeks();
      });
    });

    weeksContainer.querySelectorAll('.remove-training-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wi = Number(btn.dataset.week);
        const ti = Number(btn.dataset.training);
        plan.weeks[wi].trainings.splice(ti, 1);
        renderWeeks();
      });
    });

    weeksContainer.querySelectorAll('.remove-week-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const wi = Number(btn.dataset.week);
        plan.weeks.splice(wi, 1);
        plan.weeks.forEach((w, i) => { w.week = i + 1; });
        renderWeeks();
      });
    });
  }

  renderWeeks();

  const addWeekBtn = document.createElement('button');
  addWeekBtn.className = 'btn-ghost full-width mt-8';
  addWeekBtn.textContent = '+ Adicionar semana';
  addWeekBtn.addEventListener('click', () => {
    const weekNum = plan.weeks.length + 1;
    plan.weeks.push({
      week: weekNum,
      trainings: [{ id: generateId(), label: 'A', title: '', description: '', entry: { done: false, date: '', km: '', time: '', bpm: '', notes: '' } }],
    });
    renderWeeks();
  });
  container.appendChild(addWeekBtn);

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn-primary full-width mt-12';
  saveBtn.style.marginBottom = '20px';
  saveBtn.textContent = isEdit ? 'Salvar alterações' : 'Criar plano';
  saveBtn.addEventListener('click', () => {
    plan.name = document.getElementById('plan-name').value.trim();
    if (!plan.name) { alert('Informe o nome do plano.'); return; }
    savePlan(plan);
    router.tabStacks.plans = [{ view: 'plans-list', params: {} }];
    renderCurrentView();
  });
  container.appendChild(saveBtn);
}
