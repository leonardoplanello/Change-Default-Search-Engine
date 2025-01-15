// background.js

// Intervalo em minutos (por ex., a cada 1 minuto) para checar e re-forçar
const REAPPLY_INTERVAL_MINUTES = 1;
let reapplyIntervalId = null;

// Quando a extensão é instalada ou atualizada
chrome.runtime.onInstalled.addListener((details) => {
  console.log("[ChangeDefaultSearchEngine] Instalada/Atualizada. (Sobrescrevendo DuckDuckGo...)");
  // No onInstalled, já estamos definindo is_default=true via manifest.json
  // Então, teoricamente, já ganhamos do DuckDuckGo.
});

// Quando o Chrome inicia
chrome.runtime.onStartup.addListener(() => {
  console.log("[ChangeDefaultSearchEngine] Chrome iniciou. Verificando status e toggle...");
  // Podemos iniciar um loop se a extensão estiver habilitada
  ensureReapplyLoop();
});

// Função para iniciar ou parar o loop
function ensureReapplyLoop() {
  chrome.storage.sync.get(['extensionEnabled'], (res) => {
    const isEnabled = res.extensionEnabled !== false; // se não definido, assume true
    if (isEnabled) {
      if (!reapplyIntervalId) {
        reapplyIntervalId = setInterval(() => reapplySearchEngine(), REAPPLY_INTERVAL_MINUTES * 60 * 1000);
        console.log("[ChangeDefaultSearchEngine] Loop de re-aplicação INICIADO.");
      }
    } else {
      if (reapplyIntervalId) {
        clearInterval(reapplyIntervalId);
        reapplyIntervalId = null;
        console.log("[ChangeDefaultSearchEngine] Loop de re-aplicação PARADO. Extensão OFF.");
      }
    }
  });
}

// Função que tenta re-aplicar o motor de busca caso o DuckDuckGo Extension tenha tomado o controle
async function reapplySearchEngine() {
  console.log("[ChangeDefaultSearchEngine] Reaplicando motor de busca se necessário...");

  // Infelizmente, sem a API 'chrome.searchEngines' ou 'chrome.settingsPrivate', 
  // não há como ver diretamente qual está setado no momento. 
  // O 'chrome_settings_overrides' do manifest já define is_default, 
  // mas se o DGG (DuckDuckGo) for reativado e reescrever, a gente não tem API oficial. 
  // A única 'tentativa' é a API searchEngines (se existir).
  
  if (!chrome.searchEngines) {
    console.log("[ChangeDefaultSearchEngine] API searchEngines indisponível. Não podemos re-forçar por código. " +
                "Mas is_default:true no manifest ainda vale se o usuário reinstalar/atualizar esta extensão por último.");
    return;
  }
  try {
    await chrome.searchEngines.setDefault({
      name: "Change Default Search Engine Overwrites DuckDuckGo",
      keyword: "cdse",
      url: "https://www.google.com/search?q=%s"
    });
    console.log("[ChangeDefaultSearchEngine] Reaplicado com sucesso via chrome.searchEngines.");
  } catch (error) {
    console.warn("[ChangeDefaultSearchEngine] Erro ao re-aplicar via searchEngines:", error);
  }
}

// Verifica toggle no carregamento do Service Worker
ensureReapplyLoop();

// Podemos também escutar mudanças no Storage (se o toggle for ligado/desligado no popup)
chrome.storage.onChanged.addListener((changes) => {
  if (changes.extensionEnabled) {
    ensureReapplyLoop();
  }
});
