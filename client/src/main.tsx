const dbg = document.createElement('pre');
dbg.style.cssText = 'position:fixed;inset:0;background:white;color:#111;padding:40px;font-family:monospace;font-size:13px;z-index:99999;overflow:auto;white-space:pre-wrap';
document.body.appendChild(dbg);
function log(msg: string) { dbg.textContent += msg + '\n'; console.log('[dbg]', msg); }

log('main.tsx running');

async function boot() {
  try {
    log('Fetching /src/index.css via fetch()...');
    const cssRes = await fetch('/src/index.css');
    log('CSS fetch: ' + cssRes.status + ' ' + cssRes.headers.get('content-type') + ' size=' + cssRes.headers.get('content-length'));
    if (!cssRes.ok) {
      const body = await cssRes.text();
      log('CSS error body: ' + body.substring(0, 500));
    }

    log('Fetching /src/App.tsx via fetch()...');
    const appRes = await fetch('/src/App.tsx');
    log('App fetch: ' + appRes.status + ' ' + appRes.headers.get('content-type') + ' size=' + appRes.headers.get('content-length'));
    if (!appRes.ok) {
      const body = await appRes.text();
      log('App error body: ' + body.substring(0, 500));
    }

    log('Fetching /src/lib/i18n.tsx via fetch()...');
    const i18nRes = await fetch('/src/lib/i18n.tsx');
    log('i18n fetch: ' + i18nRes.status + ' ' + i18nRes.headers.get('content-type') + ' size=' + i18nRes.headers.get('content-length'));

    log('Now trying dynamic import of CSS...');
    await import('./index.css');
    log('CSS import OK');

    log('Now trying dynamic import of App...');
    const mod = await import('./App');
    log('App import OK');

    const { createRoot } = await import('react-dom/client');
    log('react-dom OK, rendering...');

    dbg.remove();
    const App = mod.default;
    createRoot(document.getElementById("root")!).render(<App />);
    log('render() called');
  } catch (e: any) {
    log('ERROR: ' + e.message);
    if (e.stack) log(e.stack);
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  });
  caches.keys().then((names) => {
    names.forEach((n) => caches.delete(n));
  });
}

boot();
