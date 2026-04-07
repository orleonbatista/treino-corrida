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
