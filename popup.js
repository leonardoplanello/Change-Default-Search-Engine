// popup.js

const translations = {
  en: {
    title: "Change Default Search Engine (Dynamic)",
    extensionToggleLabel: "Extension Enabled:",
    languageLabel: "Select Language:",
    engineLabel: "Select Search Engine:",
    customUrlLabel: "Or enter a custom URL:",
    applyButton: "Apply",
    statusSuccess: "Search engine updated successfully!",
    statusDisabled: "Extension is disabled. Doing nothing.",
    statusFallback: "chrome.searchEngines API not available, or conflict with other extensions. " +
                    "Please set your default search engine manually in Chrome settings, or disable DuckDuckGo extension.",
    statusError: "Error changing the search engine: ",
    conflictWarning: "Potential conflict with DuckDuckGo extension or another search engine extension. " +
                     "If you cannot search, try disabling other extensions or re-installing this one last."
  },
  pt: {
    title: "Alterar Mecanismo de Busca (Dinâmico)",
    extensionToggleLabel: "Extensão Ativada:",
    languageLabel: "Selecionar Idioma:",
    engineLabel: "Selecionar Mecanismo de Busca:",
    customUrlLabel: "Ou insira uma URL personalizada:",
    applyButton: "Aplicar",
    statusSuccess: "Mecanismo de busca atualizado com sucesso!",
    statusDisabled: "Extensão está desativada. Nenhuma ação será feita.",
    statusFallback: "A API chrome.searchEngines não está disponível ou há conflito com outras extensões. " +
                    "Defina manualmente seu mecanismo de busca nas configurações do Chrome ou desative a extensão DuckDuckGo.",
    statusError: "Erro ao alterar o mecanismo de busca: ",
    conflictWarning: "Possível conflito com a extensão DuckDuckGo ou outra que altera o mecanismo de busca. " +
                     "Se você não consegue pesquisar, tente desativar outras extensões ou reinstalar esta por último."
  },
  zh: {
    title: "更改默认搜索引擎（动态）",
    extensionToggleLabel: "启用扩展:",
    languageLabel: "选择语言：",
    engineLabel: "选择搜索引擎：",
    customUrlLabel: "或输入自定义URL：",
    applyButton: "应用",
    statusSuccess: "搜索引擎已成功更新！",
    statusDisabled: "扩展已禁用。不执行任何操作。",
    statusFallback: "chrome.searchEngines API 不可用，或与其他扩展冲突。 " +
                    "请在 Chrome 设置中手动设置搜索引擎，或禁用 DuckDuckGo。",
    statusError: "更改搜索引擎时出错：",
    conflictWarning: "可能与 DuckDuckGo 扩展或其他搜索引擎扩展冲突。 " +
                     "如果无法搜索，请尝试禁用其他扩展或最后重新安装此扩展。"
  },
  ru: {
    title: "Изменить поисковую систему (Динамически)",
    extensionToggleLabel: "Расширение включено:",
    languageLabel: "Выберите язык:",
    engineLabel: "Выберите поисковую систему:",
    customUrlLabel: "Или введите пользовательский URL:",
    applyButton: "Применить",
    statusSuccess: "Поисковая система успешно обновлена!",
    statusDisabled: "Расширение отключено. Никаких действий не выполняется.",
    statusFallback: "API chrome.searchEngines недоступен или существует конфликт с другими расширениями. " +
                    "Установите поисковую систему вручную в настройках Chrome или отключите расширение DuckDuckGo.",
    statusError: "Ошибка при изменении поисковой системы: ",
    conflictWarning: "Возможен конфликт с расширением DuckDuckGo или другим, изменяющим поиск. " +
                     "Если вы не можете искать, попробуйте отключить другие расширения или переустановить это последним."
  },
  it: {
    title: "Cambia Motore di Ricerca (Dinamico)",
    extensionToggleLabel: "Estensione abilitata:",
    languageLabel: "Seleziona Lingua:",
    engineLabel: "Seleziona Motore di Ricerca:",
    customUrlLabel: "Oppure inserisci un URL personalizzato:",
    applyButton: "Applica",
    statusSuccess: "Motore di ricerca aggiornato con successo!",
    statusDisabled: "Estensione disabilitata. Nessuna azione eseguita.",
    statusFallback: "L'API chrome.searchEngines non è disponibile o c'è un conflitto con altre estensioni. " +
                    "Imposta manualmente il motore di ricerca nelle impostazioni di Chrome o disabilita DuckDuckGo.",
    statusError: "Errore durante il cambio del motore di ricerca: ",
    conflictWarning: "Possibile conflitto con l'estensione DuckDuckGo o altre che modificano il motore di ricerca. " +
                     "Se non riesci a cercare, prova a disabilitare altre estensioni o reinstallare questa per ultima."
  },
  fr: {
    title: "Changer le Moteur de Recherche (Dynamique)",
    extensionToggleLabel: "Extension Activée:",
    languageLabel: "Sélectionner la Langue :",
    engineLabel: "Sélectionner le Moteur de Recherche :",
    customUrlLabel: "Ou entrez une URL personnalisée :",
    applyButton: "Appliquer",
    statusSuccess: "Moteur de recherche mis à jour avec succès !",
    statusDisabled: "Extension désactivée. Aucune action n’est réalisée.",
    statusFallback: "L’API chrome.searchEngines n’est pas disponible ou conflit avec d’autres extensions. " +
                    "Définissez manuellement votre moteur de recherche dans les paramètres de Chrome ou désactivez DuckDuckGo.",
    statusError: "Erreur lors du changement du moteur de recherche : ",
    conflictWarning: "Conflit potentiel avec l’extension DuckDuckGo ou une autre qui modifie le moteur de recherche. " +
                     "Si vous ne pouvez pas rechercher, essayez de désactiver d’autres extensions ou réinstaller celle-ci en dernier."
  },
  es: {
    title: "Cambiar Motor de Búsqueda (Dinámico)",
    extensionToggleLabel: "Extensión Activada:",
    languageLabel: "Seleccionar Idioma:",
    engineLabel: "Seleccionar Motor de Búsqueda:",
    customUrlLabel: "O introduce una URL personalizada:",
    applyButton: "Aplicar",
    statusSuccess: "¡Motor de búsqueda actualizado con éxito!",
    statusDisabled: "Extensión desactivada. No se realiza ninguna acción.",
    statusFallback: "La API chrome.searchEngines no está disponible o hay un conflicto con otras extensiones. " +
                    "Configura manualmente tu motor de búsqueda en la configuración de Chrome o deshabilita DuckDuckGo.",
    statusError: "Error al cambiar el motor de búsqueda: ",
    conflictWarning: "Posible conflicto con la extensión DuckDuckGo u otra que modifica el motor de búsqueda. " +
                     "Si no puedes buscar, intenta deshabilitar otras extensiones o reinstalar esta al final."
  }
};

let currentLanguage = 'en';
// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById("extensionToggleCheckbox");
  const applyButton = document.getElementById("applyButton");
  const statusMessage = document.getElementById("statusMessage");
  const engineSelect = document.getElementById("engineSelect");

  // Carrega config do storage
  chrome.storage.sync.get(['extensionEnabled'], (res) => {
    if (typeof res.extensionEnabled === 'boolean') {
      toggleCheckbox.checked = res.extensionEnabled;
    } else {
      // se não definido, assume true
      toggleCheckbox.checked = true;
    }
  });

  toggleCheckbox.addEventListener('change', () => {
    const isEnabled = toggleCheckbox.checked;
    chrome.storage.sync.set({ extensionEnabled: isEnabled }, () => {
      if (!isEnabled) {
        showStatus("Extension OFF. We'll stop forcing Overwrite on DuckDuckGo.");
      } else {
        showStatus("Extension ON. We'll force Overwrite on DuckDuckGo (via manifest + background).");
      }
    });
  });

  applyButton.addEventListener('click', async () => {
    const isEnabled = toggleCheckbox.checked;
    if (!isEnabled) {
      showStatus("Extension is OFF. Turn it ON first.");
      return;
    }

    // Tentar trocar dinamicamente
    if (!chrome.searchEngines) {
      // Em muitos Chromes públicos, a API é indisponível
      showStatus("Dynamic change not possible (API chrome.searchEngines missing). " + 
        "But manifest is set to override. If DuckDuckGo reappears, reinstall or update this extension last.");
      return;
    }

    const newUrl = engineSelect.value;
    try {
      await chrome.searchEngines.setDefault({
        name: "Change Default Search Engine Overwrites DuckDuckGo",
        keyword: "cdse",
        url: newUrl
      });
      showStatus("Successfully set engine to: " + newUrl);
    } catch (err) {
      showStatus("Error setting engine: " + err.message);
    }
  });

  function showStatus(msg) {
    statusMessage.innerText = msg;
    setTimeout(() => {
      statusMessage.innerText = "";
    }, 5000);
  }
});
