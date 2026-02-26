import { createRoot } from "react-dom/client";
import "./index.css";

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
  caches.keys().then((names) => {
    names.forEach((name) => caches.delete(name));
  });
}

function logDebug(msg: string) {
  const el = document.getElementById('debug-log');
  if (el) el.textContent += msg + '\n';
  console.log('[main]', msg);
}

logDebug('main.tsx executing...');

try {
  logDebug('Importing App...');
  import("./App").then((mod) => {
    logDebug('App imported successfully');
    try {
      const App = mod.default;
      const root = createRoot(document.getElementById("root")!);
      logDebug('createRoot done, calling render...');
      root.render(<App />);
      logDebug('render() called');
    } catch (e: any) {
      logDebug('RENDER ERROR: ' + e.message);
      logDebug(e.stack);
    }
  }).catch((e: any) => {
    logDebug('APP IMPORT ERROR: ' + e.message);
    logDebug(e.stack);
  });
} catch (e: any) {
  logDebug('SYNC ERROR: ' + e.message);
  logDebug(e.stack);
}
