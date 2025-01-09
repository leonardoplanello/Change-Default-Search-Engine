// popup.js

const translations = {
    en: {
      title: "Change Default Search Engine",
      languageLabel: "Select Language:",
      engineLabel: "Select Search Engine:",
      customUrlLabel: "Or enter a custom URL:",
      applyButton: "Apply",
      statusSuccess: "Search engine updated successfully!",
      statusFallback: "Changing the search engine via code is not supported at the moment. " +
                     "However, the chrome_settings_overrides in manifest.json defines a default engine.",
      statusError: "Error changing the search engine: ",
    },
    pt: {
      title: "Alterar Mecanismo de Busca Padrão",
      languageLabel: "Selecionar Idioma:",
      engineLabel: "Selecionar Mecanismo de Busca:",
      customUrlLabel: "Ou insira uma URL personalizada:",
      applyButton: "Aplicar",
      statusSuccess: "Mecanismo de busca atualizado com sucesso!",
      statusFallback: "Alterar o mecanismo de busca via código não é suportado no momento. " +
                     "Entretanto, o chrome_settings_overrides no manifest.json já define um mecanismo padrão.",
      statusError: "Erro ao alterar o mecanismo de busca: ",
    },
    ja: {
      title: "デフォルトの検索エンジンを変更",
      languageLabel: "言語を選択:",
      engineLabel: "検索エンジンを選択:",
      customUrlLabel: "またはカスタムURLを入力:",
      applyButton: "適用",
      statusSuccess: "検索エンジンが正常に更新されました！",
      statusFallback: "コード経由で検索エンジンを変更することは現在サポートされていません。 " +
                     "ただし、manifest.jsonのchrome_settings_overridesでデフォルトのエンジンが定義されています。",
      statusError: "検索エンジンの変更中にエラーが発生しました: ",
    },
    ru: {
      title: "Изменить поисковую систему по умолчанию",
      languageLabel: "Выберите язык:",
      engineLabel: "Выберите поисковую систему:",
      customUrlLabel: "Или введите пользовательский URL:",
      applyButton: "Применить",
      statusSuccess: "Поисковая система успешно обновлена!",
      statusFallback: "Изменение поисковой системы через код в данный момент не поддерживается. " +
                     "Однако в manifest.json в chrome_settings_overrides уже определена поисковая система по умолчанию.",
      statusError: "Ошибка при изменении поисковой системы: ",
    },
    zh: {
      title: "更改默认搜索引擎",
      languageLabel: "选择语言：",
      engineLabel: "选择搜索引擎：",
      customUrlLabel: "或输入自定义URL：",
      applyButton: "应用",
      statusSuccess: "搜索引擎已成功更新！",
      statusFallback: "目前不支持通过代码更改搜索引擎。 " +
                     "但是，manifest.json中的chrome_settings_overrides已定义了默认引擎。",
      statusError: "更改搜索引擎时出错：",
    },
    it: {
      title: "Cambia Motore di Ricerca Predefinito",
      languageLabel: "Seleziona Lingua:",
      engineLabel: "Seleziona Motore di Ricerca:",
      customUrlLabel: "Oppure inserisci un URL personalizzato:",
      applyButton: "Applica",
      statusSuccess: "Motore di ricerca aggiornato con successo!",
      statusFallback: "Cambiare il motore di ricerca tramite codice non è supportato al momento. " +
                     "Tuttavia, chrome_settings_overrides in manifest.json definisce un motore predefinito.",
      statusError: "Errore durante il cambio del motore di ricerca: ",
    },
    fr: {
      title: "Changer le Moteur de Recherche par Défaut",
      languageLabel: "Sélectionner la Langue :",
      engineLabel: "Sélectionner le Moteur de Recherche :",
      customUrlLabel: "Ou entrez une URL personnalisée :",
      applyButton: "Appliquer",
      statusSuccess: "Moteur de recherche mis à jour avec succès !",
      statusFallback: "Changer le moteur de recherche via le code n'est pas supporté pour le moment. " +
                     "Cependant, chrome_settings_overrides dans manifest.json définit un moteur par défaut.",
      statusError: "Erreur lors du changement du moteur de recherche : ",
    },
    es: {
      title: "Cambiar Motor de Búsqueda Predeterminado",
      languageLabel: "Seleccionar Idioma:",
      engineLabel: "Seleccionar Motor de Búsqueda:",
      customUrlLabel: "O introduce una URL personalizada:",
      applyButton: "Aplicar",
      statusSuccess: "¡Motor de búsqueda actualizado con éxito!",
      statusFallback: "Cambiar el motor de búsqueda mediante código no está soportado en este momento. " +
                     "Sin embargo, chrome_settings_overrides en manifest.json define un motor predeterminado.",
      statusError: "Error al cambiar el motor de búsqueda: ",
    }
  };
  
  let currentLanguage = 'en';
  
  // Função para traduzir a interface
  function translateUI(lang) {
    const translation = translations[lang] || translations['en'];
  
    document.getElementById('title').innerText = translation.title;
    document.getElementById('languageLabel').innerText = translation.languageLabel;
    document.getElementById('engineLabel').innerText = translation.engineLabel;
    document.getElementById('customUrlLabel').innerText = translation.customUrlLabel;
    document.getElementById('applyButton').innerText = translation.applyButton;
  
    // Atualizar placeholders se necessário
    document.getElementById('customUrl').placeholder = translation.customUrlLabel;
  }
  
  // Carregar idioma preferido do armazenamento
  chrome.storage.sync.get(['language'], (result) => {
    if (result.language && translations[result.language]) {
      currentLanguage = result.language;
    } else {
      currentLanguage = 'en'; // Padrão
    }
    document.getElementById('languageSelect').value = currentLanguage;
    translateUI(currentLanguage);
  });
  
  // Alterar idioma ao selecionar
  document.getElementById("languageSelect").addEventListener("change", (event) => {
    const selectedLang = event.target.value;
    if (translations[selectedLang]) {
      currentLanguage = selectedLang;
      translateUI(currentLanguage);
      chrome.storage.sync.set({ language: currentLanguage });
    }
  });
  
  // Aplicar mecanismo de busca
  document.getElementById("applyButton").addEventListener("click", async () => {
    const selectedEngine = document.getElementById("engineSelect").value;
    const customEngine = document.getElementById("customUrl").value.trim();
    const translation = translations[currentLanguage] || translations['en'];
  
    // Caso o usuário tenha informado uma URL personalizada, ela tem prioridade.
    const newSearchUrl = customEngine !== "" ? customEngine : selectedEngine;
  
    try {
      // Exemplo hipotético de uso de API restrita:
      // chrome.searchEngines não está disponível na maioria das versões públicas do Chrome,
      // sendo usado aqui apenas para fins ilustrativos.
      if (chrome.searchEngines) {
        await chrome.searchEngines.setDefault({
          name: "Change Default Search Engine",
          keyword: "cdse",
          url: newSearchUrl
        });
        showStatus(translation.statusSuccess);
      } else {
        // Fallback: notificar o usuário de que não é possível alterar dinamicamente via código.
        // A mudança ficará restrita à configuração definida em manifest.json.
        showStatus(translation.statusFallback);
      }
    } catch (error) {
      showStatus(translation.statusError + error.message);
    }
  });
  
  // Função para exibir mensagens de status
  function showStatus(msg) {
    const statusElement = document.getElementById("statusMessage");
    statusElement.innerText = msg;
    setTimeout(() => {
      statusElement.innerText = "";
    }, 5000);
  }
  