// 급여계산기 서비스워커: 앱 껍데기만 저장하고, 데이터(Supabase)와 AI 호출은 절대 저장하지 않습니다.
// 코드를 고쳐 다시 올릴 때는 VERSION 숫자를 올리세요.
const VERSION = 'pod12-salary-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
const CDN_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('.supabase.co')) return; // 데이터는 항상 네트워크
  if (url.origin === self.location.origin){
    // 화면·파일은 네트워크 우선(항상 최신), 오프라인이면 저장본
    e.respondWith(fetch(req).then(res => {
      if (res && res.ok){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  if (CDN_HOSTS.includes(url.hostname)){
    // 라이브러리/폰트는 저장본 우선
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')){ const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
