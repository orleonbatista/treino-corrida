const STORAGE_KEY = 'treino_corrida_v1';
const APP_VERSION = 1;
const SAVE_DEBOUNCE_MS = 400;

const PLAN = [
  {
    week: 1,
    trainings: [
      { id: 'A', title: 'A Base', description: '3 km leve contínuo (BPM ~135–150; pace 9:45–10:30)' },
      { id: 'B', title: 'B Intervalado', description: '5× (400m forte + 400m caminhada) • forte pace 7:00–8:00' },
      { id: 'C', title: 'C Longo intercalado', description: '6 km • 5 min correndo leve + 2 min caminhando (repetir)' },
    ],
  },
  {
    week: 2,
    trainings: [
      { id: 'A', title: 'A Base', description: '3 km leve contínuo' },
      { id: 'B', title: 'B Intervalado', description: '5× (400m forte + 400m caminhada)' },
      { id: 'C', title: 'C Longo intercalado', description: '6 km • 5/2 (correr/caminhar)' },
    ],
  },
  {
    week: 3,
    trainings: [
      { id: 'A', title: 'A Base', description: '4 km leve contínuo' },
      { id: 'B', title: 'B Intervalado', description: '6× (400m forte + 400m caminhada)' },
      { id: 'C', title: 'C Longo intercalado', description: '7 km • 5/2' },
    ],
  },
  {
    week: 4,
    trainings: [
      { id: 'A', title: 'A Base', description: '4 km leve contínuo' },
      { id: 'B', title: 'B Intervalado', description: '6× (400m forte + 400m caminhada)' },
      { id: 'C', title: 'C Longo intercalado', description: '7 km • 5/2' },
    ],
  },
  {
    week: 5,
    trainings: [
      { id: 'A', title: 'A Base', description: '5 km contínuo leve' },
      { id: 'B', title: 'B Intervalado', description: '8× (400m forte + 400m caminhada)' },
      { id: 'C', title: 'C Longo intercalado', description: '8 km • 5/2' },
    ],
  },
  {
    week: 6,
    trainings: [
      { id: 'A', title: 'A Base', description: '5 km contínuo leve' },
      { id: 'B', title: 'B Intervalado', description: '8× (400m forte + 400m caminhada)' },
      { id: 'C', title: 'C Longo intercalado', description: '8 km • 5/2' },
    ],
  },
  {
    week: 7,
    trainings: [
      { id: 'A', title: 'A Base', description: '6 km contínuo leve' },
      { id: 'B', title: 'B Intervalado', description: '6× (600m forte + 400m caminhada)' },
      { id: 'C', title: 'C Longo intercalado', description: '9–10 km • 5/2' },
    ],
  },
  {
    week: 8,
    trainings: [
      { id: 'A', title: 'A Base', description: '6 km contínuo leve' },
      { id: 'B', title: 'B Intervalado', description: '6× (600m forte + 400m caminhada)' },
      { id: 'C', title: 'C Longo intercalado', description: '9–10 km • 5/2' },
    ],
  },
];

const DEFAULT_ENTRY = { done: false, date: '', km: '', time: '', bpm: '', notes: '' };

const state = {
  selectedWeek: 1,
  data: createInitialData(),
  saveTimer: null,
};

const el = {
  weekSelect: document.querySelector('#week-select'),
  overallSummary: document.querySelector('#overall-summary'),
  weekSummary: document.querySelector('#week-summary'),
  weekTrainings: document.querySelector('#week-trainings'),
  template: document.querySelector('#training-card-template'),
  exportBtn: document.querySelector('#export-btn'),
  importBtn: document.querySelector('#import-btn'),
  resetBtn: document.querySelector('#reset-btn'),
  importDialog: document.querySelector('#import-dialog'),
  importText: document.querySelector('#import-text'),
  importFile: document.querySelector('#import-file'),
  importCancel: document.querySelector('#import-cancel'),
  importConfirm: document.querySelector('#import-confirm'),
};

function createTrainingKey(week, trainingId) {
  return `w${week}_${trainingId}`;
}

function createInitialData() {
  const items = {};
  PLAN.forEach((weekObj) => {
    weekObj.trainings.forEach((training) => {
      items[createTrainingKey(weekObj.week, training.id)] = { ...DEFAULT_ENTRY };
    });
  });
  return items;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (!isValidBackup(parsed)) return;
    state.data = { ...createInitialData(), ...parsed.items };
  } catch (error) {
    console.warn('Falha ao ler storage', error);
  }
}

function saveState() {
  const payload = {
    version: APP_VERSION,
    updatedAt: new Date().toISOString(),
    items: state.data,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function debounceSave() {
  clearTimeout(state.saveTimer);
  state.saveTimer = setTimeout(saveState, SAVE_DEBOUNCE_MS);
}

function parseTimeToSeconds(timeText) {
  if (!timeText || typeof timeText !== 'string') return null;
  const cleaned = timeText.trim();
  if (!cleaned) return null;

  const parts = cleaned.split(':').map((part) => Number(part));
  if (parts.some((part) => Number.isNaN(part) || part < 0)) return null;

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

function formatTimeFromDigits(input) {
  const digits = String(input || '').replace(/\D/g, '').slice(0, 6);
  if (!digits) return '';

  if (digits.length <= 4) {
    const padded = digits.padStart(4, '0');
    const mm = Number(padded.slice(0, 2));
    const ss = Number(padded.slice(2, 4));
    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }

  const padded = digits.padStart(6, '0');
  const hh = Number(padded.slice(0, 2));
  const mm = Number(padded.slice(2, 4));
  const ss = Number(padded.slice(4, 6));
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

function formatSeconds(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return '--:--';
  const safe = Math.round(totalSeconds);
  const hh = Math.floor(safe / 3600);
  const mm = Math.floor((safe % 3600) / 60);
  const ss = safe % 60;
  if (hh > 0) {
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

function formatPace(seconds, km) {
  if (!seconds || !km || km <= 0) return '--:--/km';
  const paceTotalSeconds = Math.round(seconds / km);
  const paceMin = Math.floor(paceTotalSeconds / 60);
  const paceRemainSec = paceTotalSeconds % 60;
  return `${paceMin}:${String(paceRemainSec).padStart(2, '0')}/km`;
}

function sumWeek(week) {
  let totalKm = 0;
  let totalSeconds = 0;
  let completed = 0;

  const weekPlan = PLAN.find((item) => item.week === week);
  weekPlan.trainings.forEach((training) => {
    const entry = state.data[createTrainingKey(week, training.id)] || DEFAULT_ENTRY;
    const km = Number(entry.km);
    const seconds = parseTimeToSeconds(entry.time);

    if (!Number.isNaN(km) && km > 0) totalKm += km;
    if (seconds) totalSeconds += seconds;
    if (entry.done) completed += 1;
  });

  return { totalKm, totalSeconds, completed };
}

function sumOverall() {
  let totalKm = 0;
  let totalSeconds = 0;
  let completed = 0;

  PLAN.forEach((weekObj) => {
    const totals = sumWeek(weekObj.week);
    totalKm += totals.totalKm;
    totalSeconds += totals.totalSeconds;
    completed += totals.completed;
  });

  return { totalKm, totalSeconds, completed, totalTrainings: PLAN.length * 3 };
}

function renderWeekSelector() {
  el.weekSelect.innerHTML = '';
  PLAN.forEach((weekObj) => {
    const option = document.createElement('option');
    option.value = weekObj.week;
    option.textContent = `Semana ${weekObj.week}`;
    if (weekObj.week === state.selectedWeek) option.selected = true;
    el.weekSelect.appendChild(option);
  });
}

function renderSummaries() {
  const weekTotals = sumWeek(state.selectedWeek);
  const overall = sumOverall();

  el.weekSummary.innerHTML = `
    <h2>Semana ${state.selectedWeek}</h2>
    <p><strong>Progresso:</strong> ${weekTotals.completed}/3 concluídos</p>
    <p><strong>Total km:</strong> ${weekTotals.totalKm.toFixed(2)} km</p>
    <p><strong>Total tempo:</strong> ${formatSeconds(weekTotals.totalSeconds)}</p>
  `;

  el.overallSummary.innerHTML = `
    <h2>Total geral</h2>
    <p><strong>Progresso:</strong> ${overall.completed}/${overall.totalTrainings} concluídos</p>
    <p><strong>Total km:</strong> ${overall.totalKm.toFixed(2)} km</p>
    <p><strong>Total tempo:</strong> ${formatSeconds(overall.totalSeconds)}</p>
  `;
}

function bindField(card, selector, eventName, callback) {
  const target = card.querySelector(selector);
  target.addEventListener(eventName, callback);
  return target;
}

function renderWeekTrainings() {
  el.weekTrainings.innerHTML = '';
  const weekPlan = PLAN.find((item) => item.week === state.selectedWeek);

  weekPlan.trainings.forEach((training) => {
    const key = createTrainingKey(state.selectedWeek, training.id);
    const entry = state.data[key] || { ...DEFAULT_ENTRY };
    const card = el.template.content.firstElementChild.cloneNode(true);

    card.querySelector('.training-title').textContent = `${training.title}`;
    card.querySelector('.training-description').textContent = training.description;

    const done = bindField(card, '.field-done', 'change', (event) => {
      state.data[key].done = event.target.checked;
      debounceSave();
      renderSummaries();
    });
    done.checked = Boolean(entry.done);

    const date = bindField(card, '.field-date', 'input', (event) => {
      state.data[key].date = event.target.value;
      debounceSave();
    });
    date.value = entry.date || '';

    const km = bindField(card, '.field-km', 'input', (event) => {
      state.data[key].km = event.target.value;
      updatePace(card, key);
      debounceSave();
      renderSummaries();
    });
    km.value = entry.km || '';

    const time = bindField(card, '.field-time', 'input', (event) => {
      const formattedTime = formatTimeFromDigits(event.target.value);
      event.target.value = formattedTime;
      state.data[key].time = formattedTime;
      updatePace(card, key);
      debounceSave();
      renderSummaries();
    });
    time.value = formatTimeFromDigits(entry.time || '');

    const bpm = bindField(card, '.field-bpm', 'input', (event) => {
      state.data[key].bpm = event.target.value;
      debounceSave();
    });
    bpm.value = entry.bpm || '';

    const notes = bindField(card, '.field-notes', 'input', (event) => {
      state.data[key].notes = event.target.value;
      debounceSave();
    });
    notes.value = entry.notes || '';

    updatePace(card, key);

    el.weekTrainings.appendChild(card);
  });
}

function updatePace(card, key) {
  const paceInput = card.querySelector('.field-pace');
  const entry = state.data[key] || DEFAULT_ENTRY;
  const km = Number(entry.km);
  const seconds = parseTimeToSeconds(entry.time);
  paceInput.value = formatPace(seconds, km);
}

function handleExport() {
  const payload = {
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    items: state.data,
  };
  const json = JSON.stringify(payload, null, 2);

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(json).catch(() => {});
  }

  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'treino-backup.json';
  anchor.click();
  URL.revokeObjectURL(url);
}

function isValidBackup(candidate) {
  if (!candidate || typeof candidate !== 'object') return false;
  if (typeof candidate.version !== 'number') return false;
  if (!candidate.items || typeof candidate.items !== 'object') return false;
  return true;
}

function applyImportedPayload(payload) {
  if (!isValidBackup(payload)) {
    alert('JSON inválido. Verifique o formato do backup.');
    return;
  }

  const next = createInitialData();
  Object.keys(next).forEach((key) => {
    const imported = payload.items[key];
    if (!imported || typeof imported !== 'object') return;
    next[key] = {
      done: Boolean(imported.done),
      date: typeof imported.date === 'string' ? imported.date : '',
      km: imported.km ?? '',
      time: typeof imported.time === 'string' ? imported.time : '',
      bpm: imported.bpm ?? '',
      notes: typeof imported.notes === 'string' ? imported.notes : '',
    };
  });

  state.data = next;
  saveState();
  render();
  alert('Backup importado com sucesso.');
}

function handleImportOpen() {
  el.importText.value = '';
  el.importFile.value = '';

  if (typeof el.importDialog.showModal === 'function') {
    el.importDialog.showModal();
  } else {
    const input = window.prompt('Cole aqui o JSON do backup:');
    if (!input) return;
    try {
      applyImportedPayload(JSON.parse(input));
    } catch {
      alert('Não foi possível ler o JSON informado.');
    }
  }
}

function handleImportConfirm() {
  const textValue = el.importText.value.trim();
  if (textValue) {
    try {
      applyImportedPayload(JSON.parse(textValue));
      el.importDialog.close();
    } catch {
      alert('JSON inválido.');
    }
    return;
  }

  const file = el.importFile.files[0];
  if (!file) {
    alert('Cole o JSON ou selecione um arquivo para importar.');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      applyImportedPayload(parsed);
      el.importDialog.close();
    } catch {
      alert('Arquivo JSON inválido.');
    }
  };
  reader.readAsText(file);
}

function handleResetAll() {
  if (!confirm('Tem certeza que deseja apagar todos os dados?')) return;
  state.data = createInitialData();
  saveState();
  render();
}

function setupEvents() {
  el.weekSelect.addEventListener('change', (event) => {
    state.selectedWeek = Number(event.target.value);
    render();
  });

  el.exportBtn.addEventListener('click', handleExport);
  el.importBtn.addEventListener('click', handleImportOpen);
  el.resetBtn.addEventListener('click', handleResetAll);

  el.importConfirm.addEventListener('click', handleImportConfirm);
  el.importCancel.addEventListener('click', () => el.importDialog.close());
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.warn('Falha ao registrar SW', error);
    });
  });
}

function render() {
  renderWeekSelector();
  renderSummaries();
  renderWeekTrainings();
}

function init() {
  loadState();
  setupEvents();
  render();
  registerServiceWorker();
}

init();
