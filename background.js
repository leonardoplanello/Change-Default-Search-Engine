// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Change Default Search Engine (dinâmico) instalado com sucesso.");
});

chrome.runtime.onStartup.addListener(() => {
  console.log("Chrome iniciou - background ativo. (Nenhuma ação forçada se toggle estiver OFF.)");
});
