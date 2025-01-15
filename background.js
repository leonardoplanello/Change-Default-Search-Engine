// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Change Default Search Engine instalado com sucesso!");
  // Podemos tentar "reaaplicar" a prioridade aqui, mas não há garantia.
  // Em versões corporativas do Chrome, pode haver APIs específicas (chrome.settingsPrivate), 
  // mas no público em geral, é bem limitado.
});

chrome.runtime.onStartup.addListener(() => {
  // Sempre que o navegador inicia, podemos verificar configurações, mas a API pode ser restrita.
  console.log("Chrome iniciou - background ativo. Verificando status da extensão.");
});

// (Opcional) Podemos monitorar quando outras extensões são instaladas ou removidas.
// Entretanto, as permissões para isso são limitadas no Chrome.
