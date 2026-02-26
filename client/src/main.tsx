function logDebug(msg: string) {
  const el = document.getElementById('debug-log');
  if (el) el.textContent += msg + '\n';
  console.log('[main]', msg);
}

logDebug('main.tsx executing (minimal)...');

import("./index.css").then(() => {
  logDebug('CSS loaded');
}).catch((e: any) => {
  logDebug('CSS FAILED: ' + e.message);
});

import("react-dom/client").then((reactDom) => {
  logDebug('react-dom loaded');
  import("./App").then((mod) => {
    logDebug('App loaded');
    try {
      const App = mod.default;
      const root = reactDom.createRoot(document.getElementById("root")!);
      root.render(<App />);
      logDebug('render() called');
    } catch (e: any) {
      logDebug('RENDER ERROR: ' + e.message + '\n' + e.stack);
    }
  }).catch((e: any) => {
    logDebug('APP IMPORT FAILED: ' + e.message + '\n' + e.stack);
  });
}).catch((e: any) => {
  logDebug('REACT-DOM FAILED: ' + e.message);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  });
  caches.keys().then((names) => {
    names.forEach((n) => caches.delete(n));
  });
}
