// popup.js

// Translations (incluindo o russo 'ru')
const translations = {
  en: {
    title: "Change Default Search Engine",
    extensionToggleLabel: "Extension Enabled:",
    languageLabel: "Select Language:",
    engineLabel: "Select Search Engine:",
    customUrlLabel: "Or enter a custom URL:",
    applyButton: "Apply",
    statusSuccess: "Search engine updated successfully!",
    statusDisabled: "Extension is disabled. No changes applied.",
    statusFallback: "Changing the search engine via code is not fully supported. " +
                    "However, chrome_settings_overrides in manifest.json sets a default engine.",
    statusError: "Error changing the search engine: "
  },
  pt: {
    title: "Alterar Mecanismo de Busca Padrão",
    extensionToggleLabel: "Extensão Ativada:",
    languageLabel: "Selecionar Idioma:",
    engineLabel: "Selecionar Mecanismo de Busca:",
    customUrlLabel: "Ou insira uma URL personalizada:",
    applyButton: "Aplicar",
    statusSuccess: "Mecanismo de busca atualizado com sucesso!",
    statusDisabled: "Extensão está desativada. Nenhuma alteração aplicada.",
    statusFallback: "Alterar o mecanismo pelo código não é totalmente suportado. " +
                    "Entretanto, o chrome_settings_overrides em manifest.json define o padrão.",
    statusError: "Erro ao alterar o mecanismo de busca: "
  },
  zh: {
    title: "更改默认搜索引擎",
    extensionToggleLabel: "启用扩展:",
    languageLabel: "选择语言：",
    engineLabel: "选择搜索引擎：",
    customUrlLabel: "或输入自定义URL：",
    applyButton: "应用",
    statusSuccess: "搜索引擎已成功更新！",
    statusDisabled: "扩展已禁用。未应用任何更改。",
    statusFallback: "通过代码更改搜索引擎尚未完全支持。 " +
                    "但是，manifest.json 中的 chrome_settings_overrides 设置了默认引擎。",
    statusError: "更改搜索引擎时出错："
  },
  ru: {
    title: "Изменить поисковую систему по умолчанию",
    extensionToggleLabel: "Расширение включено:",
    languageLabel: "Выберите язык:",
    engineLabel: "Выберите поисковую систему:",
    customUrlLabel: "Или введите пользовательский URL:",
    applyButton: "Применить",
    statusSuccess: "Поисковая система успешно обновлена!",
    statusDisabled: "Расширение отключено. Изменения не применены.",
    statusFallback: "Изменение поисковой системы через код не полностью поддерживается. " +
                    "Однако, chrome_settings_overrides в manifest.json задает систему по умолчанию.",
    statusError: "Ошибка при изменении поисковой системы: "
  },
  it: {
    title: "Cambia Motore di Ricerca Predefinito",
    extensionToggleLabel: "Estensione abilitata:",
    languageLabel: "Seleziona Lingua:",
    engineLabel: "Seleziona Motore di Ricerca:",
    customUrlLabel: "Oppure inserisci un URL personalizzato:",
    applyButton: "Applica",
    statusSuccess: "Motore di ricerca aggiornato con successo!",
    statusDisabled: "Estensione disabilitata. Nessuna modifica applicata.",
    statusFallback: "Cambiare il motore di ricerca tramite codice non è completamente supportato. " +
                    "Tuttavia, chrome_settings_overrides in manifest.json definisce un motore predefinito.",
    statusError: "Errore durante il cambio del motore di ricerca: "
  },
  fr: {
    title: "Changer le Moteur de Recherche par Défaut",
    extensionToggleLabel: "Extension Activée:",
    languageLabel: "Sélectionner la Langue :",
    engineLabel: "Sélectionner le Moteur de Recherche :",
    customUrlLabel: "Ou entrez une URL personnalisée :",
    applyButton: "Appliquer",
    statusSuccess: "Moteur de recherche mis à jour avec succès !",
    statusDisabled: "Extension désactivée. Aucun changement appliqué.",
    statusFallback: "Changer le moteur de recherche via le code n’est pas entièrement pris en charge. " +
                    "Cependant, chrome_settings_overrides dans manifest.json définit un moteur par défaut.",
    statusError: "Erreur lors du changement du moteur de recherche : "
  },
  es: {
    title: "Cambiar Motor de Búsqueda Predeterminado",
    extensionToggleLabel: "Extensión Activada:",
    languageLabel: "Seleccionar Idioma:",
    engineLabel: "Seleccionar Motor de Búsqueda:",
    customUrlLabel: "O introduce una URL personalizada:",
    applyButton: "Aplicar",
    statusSuccess: "¡Motor de búsqueda actualizado con éxito!",
    statusDisabled: "Extensión desactivada. No se aplicaron cambios.",
    statusFallback: "Cambiar el motor de búsqueda mediante código no está totalmente soportado. " +
                    "Sin embargo, chrome_settings_overrides en manifest.json define un motor predeterminado.",
    statusError: "Error al cambiar el motor de búsqueda: "
  }
};

let currentLanguage = 'en';
const toggleCheckbox = document.getElementById('extensionToggleCheckbox');

// Carrega configurações salvas
chrome.storage.sync.get(['language', 'extensionEnabled'], (result) => {
  // 1) Idioma
  if (result.language && translations[result.language]) {
    currentLanguage = result.language;
  } else {
    currentLanguage = 'en';
  }
  document.getElementById('languageSelect').value = currentLanguage;
  translateUI(currentLanguage);

  // 2) Toggle
  if (typeof result.extensionEnabled === 'boolean') {
    toggleCheckbox.checked = result.extensionEnabled;
  } else {
    // Se não existir, define como true por padrão
    toggleCheckbox.checked = true;
  }
});

// Ouvinte para mudança de idioma
document.getElementById("languageSelect").addEventListener("change", (event) => {
  const selectedLang = event.target.value;
  if (translations[selectedLang]) {
    currentLanguage = selectedLang;
    chrome.storage.sync.set({ language: currentLanguage }, () => {
      translateUI(currentLanguage);
    });
  }
});

// Ouvinte para toggle switch (ativar/desativar extensão)
toggleCheckbox.addEventListener('change', () => {
  const isEnabled = toggleCheckbox.checked;
  chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
    // Se desabilitado, avisamos o usuário
    if (!isEnabled) {
      showStatus(translations[currentLanguage].statusDisabled);
    }
  });
});

// Ao clicar em "Apply"
document.getElementById("applyButton").addEventListener("click", async () => {
  const translation = translations[currentLanguage];
  const isEnabled = toggleCheckbox.checked;

  // Se a extensão está desabilitada, não faz nada
  if (!isEnabled) {
    showStatus(translation.statusDisabled);
    return;
  }

  const selectedEngine = document.getElementById("engineSelect").value;
  const customEngine = document.getElementById("customUrl").value.trim();
  const newSearchUrl = customEngine !== "" ? customEngine : selectedEngine;

  try {
    // API restrita - se disponível, forçamos a troca
    if (chrome.searchEngines) {
      await chrome.searchEngines.setDefault({
        name: "Change Default Search Engine",
        keyword: "cdse",
        url: newSearchUrl
      });
      showStatus(translation.statusSuccess);
    } else {
      // Fallback
      showStatus(translation.statusFallback);
    }
  } catch (error) {
    showStatus(translation.statusError + error.message);
  }
});

function translateUI(lang) {
  const t = translations[lang] || translations['en'];

  document.getElementById('title').innerText = t.title;
  document.getElementById('extensionToggleLabel').innerText = t.extensionToggleLabel;
  document.getElementById('languageLabel').innerText = t.languageLabel;
  document.getElementById('engineLabel').innerText = t.engineLabel;
  document.getElementById('customUrlLabel').innerText = t.customUrlLabel;
  document.getElementById('applyButton').innerText = t.applyButton;
  // placeholder do customUrl
  document.getElementById('customUrl').placeholder = t.customUrlLabel;
}

function showStatus(msg) {
  const statusElement = document.getElementById("statusMessage");
  statusElement.innerText = msg;
  setTimeout(() => {
    statusElement.innerText = "";
  }, 5000);
}
