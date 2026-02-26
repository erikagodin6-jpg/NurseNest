const dbg = document.createElement('pre');
dbg.style.cssText = 'position:fixed;inset:0;background:white;color:#111;padding:40px;font-family:monospace;font-size:13px;z-index:99999;overflow:auto;white-space:pre-wrap';
document.body.appendChild(dbg);
function log(msg: string) { dbg.textContent += msg + '\n'; console.log('[dbg]', msg); }

log('main.tsx running - test 2');

async function boot() {
  try {
    log('Testing /@vite/client fetch...');
    const viteRes = await fetch('/@vite/client');
    log('Vite client: ' + viteRes.status + ' size=' + viteRes.headers.get('content-length'));

    log('Testing /@vite/client import...');
    try {
      await import('/@vite/client' as any);
      log('/@vite/client import OK');
    } catch(e: any) {
      log('/@vite/client import FAILED: ' + e.message);
    }

    log('Skipping CSS, importing App directly...');
    const mod = await import('./App');
    log('App imported OK!');

    const { createRoot } = await import('react-dom/client');
    log('react-dom OK');

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
