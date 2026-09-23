const CACHE='moonfall-v16';
const VOICE_FILES=[
  'mosswick-soft-steps','mosswick-mushrooms-knew','mosswick-smallest-lights','mosswick-introduce-them',
  'mosswick-hollow-guards','mosswick-ask-the-well','mosswick-eastern-path','mosswick-lantern',
  'mosswick-glowcap','mosswick-lit-lantern','mosswick-star-key','mosswick-moonwater','mosswick-default',
  'sera-living-visitor','sera-introduction','sera-tapestry','sera-chart','sera-resonator','sera-waking-song',
  'sera-bell-shard','sera-dreamdew','sera-silver-thread','sera-mended-chime','sera-tuned-chime','sera-default',
  'unknown-liora',
  'elowen-hope','elowen-city-took-name','elowen-lantern-sundial','elowen-light-remembers',
  'elowen-loom-lens','elowen-bring-sigil','elowen-dawn-mote','elowen-hollow-prism',
  'elowen-memory-lens','elowen-name-sigil','elowen-default','elowen-name-remembered',
  'elowen-palace-warning','elowen-little-night','elowen-throne-lock','elowen-dais-turning',
  'elowen-roots-tower','elowen-sun-mosaic','elowen-banner-weave','elowen-seal-throne',
  'elowen-ash-needs-living','elowen-resin-and-ash','elowen-use-ink','elowen-palace-taken-enough',
  'elowen-royal-astronomer','elowen-you-closed-sky','elowen-rewrite-lines','elowen-mix-ward-failing','elowen-cannot-break',
  'elowen-bind-disc','warden-do-not-mend','warden-held-sky','warden-resin-and-stars',
  'warden-mix-warning','warden-last-choice','warden-no-awake','warden-crown-heir',
  'warden-sunlight','warden-first-star','warden-roots-remember','warden-honest-ink','warden-default',
  'warden-crown-remembered','elowen-records-cut','warden-not-blood','warden-road-concealed',
  'elowen-crown-compass','warden-give-sky','elowen-stormglass','elowen-root-filament',
  'elowen-living-compass','elowen-nightglass','elowen-dawn-petal','elowen-eclipse-lens',
  'elowen-tower-default','elowen-chose-hiding','elowen-refused-throne','elowen-living-compass-hint',
  'elowen-mirror-bloom','elowen-balance-lens','elowen-refuse-heir','elowen-no-name',
  'warden-stormglass','warden-root-filament','warden-living-compass','warden-nightglass',
  'warden-dawn-petal','warden-eclipse-lens','warden-tower-default','warden-elowen-astronomer',
  'warden-mercy-cowardice','warden-living-needle','warden-nightglass-memory','warden-compass-before-crown',
  'warden-door-open','warden-remain-city','elowen-compass-road','elowen-current-remembers',
  'elowen-moonseed-hidden','elowen-look-behind','elowen-comet-clasp','elowen-star-silk',
  'elowen-star-sail','elowen-moon-reed','elowen-echo-shell','elowen-mooncall',
  'elowen-moonway-default','elowen-ferries-grounded','elowen-roads-leash','elowen-sail-hint',
  'elowen-bloom-tide-call','elowen-reed-shell','elowen-play-softly','elowen-road-ours'
].map(name=>`./assets/voices/${name}.mp3`);
const FILES=['./','./index.html','./styles.css?v=16','./game.js?v=16','./voice-lines.js','./manifest.webmanifest','./assets/glade.png','./assets/observatory.png','./assets/causeway.png','./assets/archive.png','./assets/lantern-court.png','./assets/hall-of-names.png','./assets/palace-atrium.png','./assets/heart-vault.png','./assets/rootspire-approach.png','./assets/crown-chamber.png','./assets/starway-crossing.png','./assets/moonwake-garden.png','./assets/liora.png','./assets/mosswick.png','./assets/sera.png','./assets/elowen.png','./assets/warden.png','./assets/cursor.svg','./assets/moon-icon.svg',...VOICE_FILES];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',e=>e.respondWith(
  fetch(e.request)
    .then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(e.request,copy));return response;})
    .catch(()=>caches.match(e.request))
));
