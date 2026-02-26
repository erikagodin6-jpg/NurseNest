const dbg = document.createElement('pre');
dbg.style.cssText = 'position:fixed;inset:0;background:white;color:#111;padding:40px;font-family:monospace;font-size:13px;z-index:99999;overflow:auto;white-space:pre-wrap';
document.body.appendChild(dbg);
function log(msg: string) { dbg.textContent += msg + '\n'; console.log('[dbg]', msg); }

log('main.tsx running - test 4');

async function boot() {
  try {
    log('Test: Load /@vite/client as blob URL...');
    const res = await fetch('/@vite/client');
    const code = await res.text();
    log('Fetched /@vite/client: ' + code.length + ' chars');

    const blob = new Blob([code], { type: 'text/javascript' });
    const blobUrl = URL.createObjectURL(blob);
    try {
      await import(/* @vite-ignore */ blobUrl);
      log('Blob import of /@vite/client: OK');
    } catch(e: any) {
      log('Blob import FAILED: ' + e.message);
      if (e.stack) log(e.stack.substring(0, 500));
    }

    log('Test: Direct import of /@vite/client...');
    try {
      await import(/* @vite-ignore */ '/@vite/client');
      log('Direct import: OK');
    } catch(e: any) {
      log('Direct import FAILED: ' + e.message);
    }

    log('Test: Check if it is a CORS issue...');
    try {
      const res2 = await fetch('/@vite/client', { mode: 'cors' });
      log('CORS headers: ' + res2.headers.get('access-control-allow-origin'));
      log('Content-Type: ' + res2.headers.get('content-type'));
    } catch(e: any) {
      log('CORS fetch failed: ' + e.message);
    }

    log('Test: Load via script tag...');
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
      import("/@vite/client").then(() => {
        document.getElementById('debug-result').textContent = 'INLINE SCRIPT IMPORT: OK';
      }).catch(e => {
        document.getElementById('debug-result').textContent = 'INLINE SCRIPT IMPORT FAILED: ' + e.message;
      });
    `;
    const resultDiv = document.createElement('div');
    resultDiv.id = 'debug-result';
    resultDiv.textContent = 'Waiting...';
    dbg.appendChild(resultDiv);
    document.head.appendChild(script);

  } catch (e: any) {
    log('OUTER ERROR: ' + e.message);
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
