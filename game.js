import { voiceLineFor } from './voice-lines.js';

const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

const SCENE_NAMES = {
  glade:'Moonfall Glade', observatory:'The Forgotten Orrery', causeway:"Dreamer's Causeway",
  archive:'The Lantern Archive', lanternCourt:'Lantern Court', hallOfNames:'The Hall of Names',
  palaceAtrium:'The Palace Atrium', heartVault:'The Heart Vault'
};
const PORTRAITS = {
  Liora:'assets/liora.png', Mosswick:'assets/mosswick.png', 'Sera Vale':'assets/sera.png',
  Elowen:'assets/elowen.png', Warden:'assets/warden.png'
};
const ROOM_DESCRIPTIONS = {
  glade: [
    ['Narration','Moonfall Glade opens beneath an ancient tree whose roots rise like the walls of a ruined sanctuary. An old wishing well leans beneath the waterfall mist, while pale mushrooms gather around a hollow black enough to swallow the fireflies.'],
    ['Narration','The air smells of wet stone, pine needles, and cold earth. Water murmurs beyond the branches, but the starless canopy makes every familiar forest sound feel hushed and watchful.']
  ],
  observatory: [
    ['Narration','The Forgotten Orrery stands roofless above the forest, its broken arches framing a sky with too many empty places. Tarnished celestial rings surround a crystal pedestal, and the sleeping city glimmers faintly beyond the cliffs.'],
    ['Narration','Wind moves through the mechanism with the low breath of a pipe organ. Dust, brass, and old rain sharpen the air, giving the ruin the solemn stillness of a machine waiting to remember its purpose.']
  ],
  causeway: [
    ['Narration','The Dreamer’s Causeway stretches across a gulf of silver mist toward a monumental gate engraved with moons and wandering stars. A fountain spills luminous water to the west; to the east, a broken bell-keeper watches over the stair descending beneath the city.'],
    ['Narration','Moonlight pools on the wet stones, reflecting one solitary golden window above the sealed doors. The distant waterfalls roar below, yet the city itself holds its breath as though listening for a song it once knew.']
  ],
  archive: [
    ['Narration','The Lantern Archive is a cathedral of maps, brass instruments, and books stacked into shadow. A torn midnight tapestry hangs beside an enormous dust-veiled star chart, while a ringed resonator gleams among the shelves.'],
    ['Narration','Candle smoke and old parchment warm the cool mineral air. Every footstep travels beneath the high vaults, stirring motes of blue light and the uneasy feeling that the room has been awake for centuries.']
  ],
  lanternCourt: [
    ['Narration','Lantern Court opens just beyond the city gate, a broad terrace suspended over silver cloud. A bronze tree spreads across the western wall, its glass fruit dark except for one stubborn spark, while a shattered sundial leans toward an arched hall on the east.'],
    ['Narration','Rain has polished the stones to mirrors. The waking lamps give off the scent of warm metal and cedar oil, but no footsteps answer Liora’s own; the whole plaza feels like a stage holding its breath before the missing actor returns.']
  ],
  hallOfNames: [
    ['Narration','The Hall of Names rises around a vast oval mirror, its dark surface holding more depth than the room behind it. Memorial tablets climb the blue-stone walls, and a brass loom of crystal threads waits beneath the eastern gallery.'],
    ['Narration','Moonbeams lie cold across the marble, threaded with dust and the faint perfume of old paper. Somewhere inside the mirror, a woman’s outline gathers whenever Liora moves, always half a heartbeat late.']
  ],
  palaceAtrium: [
    ['Narration','The Palace Atrium opens beneath broken vaults and a moon that seems much too close. A shattered sun mosaic spreads across the western floor, a torn royal banner hangs to the east, and an empty black throne watches over a sealed stair descending into the palace foundations.'],
    ['Narration','Rain drifts through the arches in silver threads, carrying the cold scent of marble and old smoke. Beneath the throne, a slow amber pulse moves through the stone like a heartbeat trying not to be heard.']
  ],
  heartVault: [
    ['Narration','The Heart Vault is carved around a fractured golden ward, its broken circles spanning the obsidian floor. A dead celestial brazier smolders to the west, luminous resin bleeds from a silver root to the east, and a tall man stands bound within the root-crystal prison beyond.'],
    ['Narration','The chamber tastes of metal and storms. Each pulse beneath the floor makes the living roots tighten around their prisoner, while dust falls from the arches in time with a heartbeat too vast to belong to any human body.']
  ]
};

const ITEMS = {
  lantern: { name: 'Unlit lantern', art: '🏮', description: 'A tiny brass lantern. It needs a living light.' },
  glowcap: { name: 'Glowcap', art: '🍄', description: 'It pulses softly, as if dreaming of dawn.' },
  litLantern: { name: 'Gleam lantern', art: '✨', description: 'Glowcap light, safely held in brass.' },
  starKey: { name: 'Star key', art: '🗝️', description: 'A silver key cut into seven little rays.' },
  moonwater: { name: 'Moonwater', art: '💧', description: 'Water that reflects a sky hidden from the world.' },
  bellShard: { name: 'Bell shard', art: '🔔', description: 'A silver tongue from a broken bell. It remembers one unfinished note.' },
  dreamdew: { name: 'Dreamdew', art: '🫧', description: 'Fountain water bright with the dreams of a sleeping city.' },
  silverThread: { name: 'Silver thread', art: '🧵', description: 'Strong as wire and soft as moonlight.' },
  mendedChime: { name: 'Mended chime', art: '🎐', description: 'Whole again, though it has forgotten which note to sing.' },
  tunedChime: { name: 'Awakened chime', art: '🎶', description: 'It trembles with the first four notes of morning.' },
  dawnMote: { name: 'Dawn mote', art: '✦', description: 'A single waking spark from the lantern tree. It leans toward familiar faces.' },
  hollowPrism: { name: 'Hollow prism', art: '◇', description: 'A memory prism with an empty heart and edges cold as rain.' },
  memoryLens: { name: 'Memory lens', art: '◈', description: 'Living light turns inside the prism, searching for someone it remembers.' },
  nameSigil: { name: 'Name sigil', art: '☼', description: 'Elowen’s true name, woven into warm glass.' },
  sunDisc: { name: 'Sun disc', art: '◉', description: 'The heart of the shattered palace mosaic, cold despite its golden face.' },
  royalThread: { name: 'Royal thread', art: '〰', description: 'A silver-gold thread woven to carry an oath without breaking.' },
  sunSeal: { name: 'Sun seal', art: '☀', description: 'The royal thread binds the disc into a seal shaped for the throne.' },
  starAsh: { name: 'Star ash', art: '⁙', description: 'Cold ash that still glitters with the memory of distant suns.' },
  rootResin: { name: 'Root resin', art: '◒', description: 'Amber resin from a living root, warm and stubbornly bright.' },
  bindingInk: { name: 'Binding ink', art: '✺', description: 'Star ash suspended in root resin: an ink made to mend celestial wards.' }
};

const freshState = () => ({
  chapter: 1,
  scene: 'glade', mode: 'use', selected: null, inventory: ['lantern'],
  flags: { tookGlowcap:false, drewWater:false, litHollow:false, unlockedAstrolabe:false, filledPedestal:false, metMosswick:false },
  seenRooms: [], started: false, sound: true
});

const chapterTwoState = sound => ({
  chapter: 2,
  scene: 'causeway', mode: 'use', selected: null, inventory: [],
  flags: { tookShard:false, drewDreamdew:false, tookThread:false, revealedSong:false, tunedChime:false, openedGate:false, metSera:false },
  seenRooms: [], started: true, sound
});

const chapterThreeState = sound => ({
  chapter: 3,
  scene: 'lanternCourt', mode: 'use', selected: null, inventory: [],
  flags: { tookMote:false, tookPrism:false, madeLens:false, revealedName:false, freedElowen:false, metElowen:false },
  seenRooms: [], started: true, sound
});

const chapterFourState = sound => ({
  chapter: 4,
  scene: 'palaceAtrium', mode: 'use', selected: null, inventory: [],
  flags: { tookDisc:false, tookThread:false, madeSeal:false, openedDescent:false, tookAsh:false, tookResin:false, madeInk:false, metWarden:false, restoredWard:false, metPalaceElowen:false },
  seenRooms: [], started: true, sound
});

let state = freshState();
let dialogueQueue = [];
let dialogueCallback = null;
let audio = null;
const voiceAudio = $('#npc-voice');
let busy = false;

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('moonfall-save')) || null;
    if (saved && !saved.chapter) saved.chapter = 1;
    return saved;
  } catch { return null; }
}
function save() { localStorage.setItem('moonfall-save', JSON.stringify(state)); }
function reset() { localStorage.removeItem('moonfall-save'); state = freshState(); render(); placeHeroForScene(); }

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === id));
}

function begin(isContinue = false) {
  if (isContinue && loadState()) state = loadState();
  else { state = freshState(); state.started = true; save(); }
  if (isContinue && state.chapterFourComplete) { showChapterFourEnding(); return; }
  if (isContinue && state.chapterThreeComplete && state.chapter === 3) { transitionToChapterFour(); return; }
  if (isContinue && state.chapterTwoComplete && state.chapter === 2) { transitionToChapterThree(); return; }
  if (isContinue && state.chapterOneComplete && state.chapter === 1) { transitionToChapterTwo(); return; }
  showScreen('play-screen');
  render();
  placeHeroForScene();
  ensureAudio();
  const opening = !isContinue ? [
    ['Liora', 'The starfall ended here. I can feel it humming beneath the roots.'],
    ['Liora', 'If I find the fallen light before moonset, perhaps the forest will remember the sky.']
  ] : [];
  describeRoom(state.scene, opening);
}

function beginChapterTwo() {
  prepareChapterTwo();
  enterChapterTwoScene();
}

function prepareChapterTwo() {
  const sound = state.sound;
  state = chapterTwoState(sound);
  save();
  showScreen('play-screen');
  render();
  placeHeroForScene();
  ensureAudio();
}

function enterChapterTwoScene() {
  describeRoom(state.scene, [
    ['Liora', 'One window woke when the star returned. Every other light in the city still sleeps.'],
    ['Liora', 'The gate is listening for something. Perhaps the city has not forgotten every song.']
  ]);
}

function beginChapterThree() {
  prepareChapterThree();
  enterChapterThreeScene();
}

function prepareChapterThree() {
  const sound = state.sound;
  state = chapterThreeState(sound);
  save();
  showScreen('play-screen');
  render();
  placeHeroForScene();
  ensureAudio();
}

function enterChapterThreeScene() {
  describeRoom(state.scene, [
    ['Liora','That voice came from somewhere beyond the square.'],
    ['Liora','These lanterns are waking one by one, as though showing me the way.']
  ]);
}

function beginChapterFour() {
  prepareChapterFour();
  enterChapterFourScene();
}

function prepareChapterFour() {
  const sound = state.sound;
  state = chapterFourState(sound);
  save();
  showScreen('play-screen');
  render();
  placeHeroForScene();
  ensureAudio();
}

function enterChapterFourScene() {
  describeRoom(state.scene, [
    ['Elowen','I came this far once. The throne never had a king—only a lock.'],
    ['Liora','Then we find its key before whatever is below finds its way up.']
  ]);
}

function runStoryTransition(message, prepare, enter) {
  $('#story-transition p').textContent = message;
  const transition = $('#story-transition');
  transition.setAttribute('aria-hidden', 'false');
  transition.classList.add('show');
  setTimeout(() => {
    prepare();
    transition.classList.add('reveal');
    setTimeout(() => {
      transition.classList.remove('show', 'reveal');
      transition.setAttribute('aria-hidden', 'true');
      enter();
    }, 850);
  }, 950);
}

function transitionToChapterTwo() {
  state.chapterOneComplete = true;
  save();
  runStoryTransition('Beyond the forest, one window answers.', prepareChapterTwo, enterChapterTwoScene);
}

function transitionToChapterThree() {
  state.chapterTwoComplete = true;
  save();
  runStoryTransition('Beyond the gate, a forgotten voice waits.', prepareChapterThree, enterChapterThreeScene);
}

function transitionToChapterFour() {
  state.chapterThreeComplete = true;
  save();
  runStoryTransition('Above them, the empty throne begins to breathe.', prepareChapterFour, enterChapterFourScene);
}

function describeRoom(scene, followingLines = []) {
  state.seenRooms ||= [];
  const firstVisit = !state.seenRooms.includes(scene);
  if (firstVisit) {
    state.seenRooms.push(scene);
    save();
  }
  const lines = [...(firstVisit ? ROOM_DESCRIPTIONS[scene] || [] : []), ...followingLines];
  if (lines.length) say(lines);
}

function render() {
  $('#scene').className = `scene ${state.scene}`;
  $('#location-name').textContent = SCENE_NAMES[state.scene];
  $('.chapter').textContent = 'Moonfall';
  $$('.verb').forEach(v => v.classList.toggle('active', v.dataset.mode === state.mode));
  renderInventory();
  $('#sound-button').textContent = state.sound ? '♪' : '×';
  $('#title-sound').textContent = state.sound ? '♪' : '×';
  $('#command-readout').textContent = state.selected ? `Use ${ITEMS[state.selected].name} with…` : state.mode === 'look' ? 'Look at…' : 'Explore';
  save();
}

function placeHeroForScene(fromScene = null) {
  const hero = $('#hero');
  const returningToGlade = state.scene === 'glade' && fromScene === 'observatory';
  const returningToCauseway = state.scene === 'causeway' && fromScene === 'archive';
  const returningToLanternCourt = state.scene === 'lanternCourt' && fromScene === 'hallOfNames';
  const returningToPalace = state.scene === 'palaceAtrium' && fromScene === 'heartVault';
  const positions = {
    glade: returningToGlade ? 88 : 57, observatory:18,
    causeway:returningToCauseway ? 89 : 52, archive:10,
    lanternCourt:returningToLanternCourt ? 90 : 48, hallOfNames:13,
    palaceAtrium:returningToPalace ? 50 : 14, heartVault:12
  };
  const x = positions[state.scene];
  hero.classList.remove('walking', 'arriving');
  hero.classList.toggle('face-left', returningToGlade || returningToCauseway || returningToLanternCourt || returningToPalace);
  hero.style.setProperty('--walk-duration', '0ms');
  hero.style.setProperty('--hero-x', `${x}%`);
}

function renderInventory() {
  const inventory = $('#inventory');
  inventory.innerHTML = '';
  state.inventory.forEach(id => {
    const item = ITEMS[id];
    const button = document.createElement('button');
    button.className = `slot${state.selected === id ? ' selected' : ''}`;
    button.dataset.item = id;
    button.setAttribute('aria-label', item.name);
    button.setAttribute('aria-pressed', state.selected === id ? 'true' : 'false');
    button.innerHTML = `<span class="item-art">${item.art}</span><span class="item-name">${item.name}</span>`;
    button.addEventListener('click', () => onItem(id));
    inventory.append(button);
  });
  while (inventory.children.length < 3) { const empty=document.createElement('div'); empty.className='empty-slot'; inventory.append(empty); }
}

function onItem(id) {
  ensureAudio(); clickTone();
  if (state.mode === 'look' && !state.selected) { say([['Liora', ITEMS[id].description]]); return; }
  if (state.selected && state.selected !== id) { combine(state.selected, id); return; }
  state.mode = 'use';
  state.selected = state.selected === id ? null : id;
  render();
}

function combine(a, b) {
  const pair = new Set([a,b]);
  if (pair.has('lantern') && pair.has('glowcap')) {
    removeItem('lantern'); removeItem('glowcap'); addItem('litLantern'); state.selected = null;
    magicEffect(86, 82); chime();
    say([['Liora', 'There. A little piece of morning, tucked into a lantern.']]);
  } else if (pair.has('bellShard') && pair.has('silverThread')) {
    removeItem('bellShard'); removeItem('silverThread'); addItem('mendedChime'); state.selected = null;
    magicEffect(84,82); chime();
    say([['Liora', 'The silver thread holds. The little bell is whole—but its voice is still lost.']]);
  } else if (pair.has('dawnMote') && pair.has('hollowPrism')) {
    removeItem('dawnMote'); removeItem('hollowPrism'); addItem('memoryLens');
    state.flags.madeLens = true; state.selected = null;
    magicEffect(86, 82); chime();
    say([['Liora','The mote settles inside the prism. Now the glass is looking back.']]);
  } else if (pair.has('sunDisc') && pair.has('royalThread')) {
    removeItem('sunDisc'); removeItem('royalThread'); addItem('sunSeal');
    state.flags.madeSeal = true; state.selected = null;
    magicEffect(86,82); chime();
    say([['Liora','The royal thread closes every fracture. The disc feels warm now—like a small, patient sun.']]);
  } else if (pair.has('starAsh') && pair.has('rootResin')) {
    removeItem('starAsh'); removeItem('rootResin'); addItem('bindingInk');
    state.flags.madeInk = true; state.selected = null;
    magicEffect(86,82); chime();
    say([['Liora','The resin drinks the ash. Every golden drop arranges itself into a tiny constellation.']]);
  } else {
    state.selected = null; say([['Liora', `Those two have very little to say to each other.`]]);
  }
  render();
}

function addItem(id) { if (!state.inventory.includes(id)) state.inventory.push(id); }
function removeItem(id) { state.inventory = state.inventory.filter(x => x !== id); }

function say(lines, callback = null) {
  dialogueQueue = lines.slice(); dialogueCallback = callback; advanceDialogue();
}
function stopVoice() {
  voiceAudio.pause();
  voiceAudio.currentTime = 0;
}
function playVoice(speaker, text) {
  stopVoice();
  if (!state.sound) return;
  const line = voiceLineFor(speaker, text);
  if (!line) return;
  voiceAudio.src = line.file;
  voiceAudio.volume = speaker === 'Sera Vale' ? 0.88 : speaker === 'Elowen' ? 0.9 : speaker === 'Warden' ? 0.91 : 0.94;
  voiceAudio.play().catch(() => { voiceAudio.removeAttribute('src'); });
}
function advanceDialogue() {
  stopVoice();
  if (dialogueQueue.length) {
    const [speaker,text] = dialogueQueue.shift();
    const portrait = $('#portrait-image');
    const isNarration = speaker === 'Narration';
    portrait.parentElement.classList.toggle('narrator', isNarration);
    portrait.src = isNarration ? 'assets/moon-icon.svg' : PORTRAITS[speaker] || 'assets/liora.png';
    portrait.className = isNarration ? 'narrator-icon' : speaker === 'Liora' ? '' : 'npc-portrait';
    $('#speaker').textContent = speaker; $('#dialogue-text').textContent = text; $('#dialogue').hidden = false;
    playVoice(speaker, text);
  } else {
    $('#dialogue').hidden = true; const cb = dialogueCallback; dialogueCallback = null; if (cb) cb();
  }
}

function inspect(id) {
  const text = {
    well:'The stones are worn smooth. The bucket smells of rain and old wishes.',
    hollow: state.flags.litHollow ? 'The hollow is empty now, but still warm.' : 'The roots curl around a darkness too deep to search by hand.',
    mushrooms: state.flags.tookGlowcap ? 'Only silver spores remain.' : 'Glowcaps. Grandmother called them “the dawn’s lost buttons.”',
    observatory:'A steep path climbs toward the old observatory.',
    glade:'The glade glows below, held in the branches like a secret.',
    astrolabe: state.flags.unlockedAstrolabe ? 'The celestial rings turn freely. Their center points toward the crystal.' : 'An orrery of impossible skies. A seven-rayed keyhole sleeps in its base.',
    pedestal: state.flags.filledPedestal ? 'Moonwater shines beneath the crystal, waiting for the mechanism.' : 'A shallow silver basin cups the crystal. It is completely dry.',
    castle:'No lamps burn in the city. Whatever stole the stars stole its dreams as well.',
    fountain: state.flags.drewDreamdew ? 'The fountain is quieter now. Pale dreams still circle beneath the water.' : 'The water is full of sleeping faces that vanish when I try to focus on them.',
    brokenBell: state.flags.tookShard ? 'The stone bell-keeper offers an empty hand to the night.' : 'The bell is cracked. Its silver tongue lies loose beneath the statue.',
    cityGate: state.flags.openedGate ? 'Warm light spills through the open gate.' : 'No lock, no handle—only a celestial seal shaped like ripples of sound.',
    archivePath:'The stair descends into the archive beneath the city wall.',
    cityWindow:'One light in an ocean of dark windows. Someone—or something—is awake.',
    tapestry: state.flags.tookThread ? 'The old tapestry hangs a little more honestly without its loose thread.' : 'A map of the dawn sky, unraveling from a single silver thread.',
    starMap: state.flags.revealedSong ? 'Four constellations shine in sequence: Wren, Crown, River, Sun.' : 'Centuries of dust hide whatever the great chart was meant to teach.',
    resonator: state.flags.tunedChime ? 'The brass rings are still humming the note they gave the chime.' : 'A machine for teaching music to metal. Its central cradle is empty.',
    causewayPath:'Moonlight waits at the top of the archive stairs.',
    lanternTree: state.flags.tookMote ? 'The bronze branches cradle dark lamps and one small empty socket.' : 'Hundreds of glass lanterns hang from the bronze boughs. One still carries a living spark.',
    sundial: state.flags.tookPrism ? 'Rain gathers in the sundial’s empty crystal cradle.' : 'The broken sundial points below the horizon. A clear, hollow prism rests where its shadow should fall.',
    palace:'The palace towers rise beyond the court. Far below them, something answers the rain with a slow pulse.',
    hallOfNames:'An arched passage leads into a hall where the city once kept its memories.',
    lanternCourt:'The court’s amber lamps tremble beyond the open arch.',
    memoryMirror: state.flags.freedElowen ? 'The mirror reflects only the room now. Elowen stands on this side of the glass.' : 'Its silver surface holds a woman’s outline, but refuses to reflect Liora.',
    nameLoom: state.flags.revealedName ? 'The last crystal thread still glows with the shape of Elowen’s name.' : 'Threads of glass cross an empty brass frame. A round cradle waits beneath them.',
    sunMosaic: state.flags.tookDisc ? 'The shattered mosaic surrounds a round absence where its sun once rested.' : 'A golden sun lies broken across the floor. Its central disc is loose enough to lift.',
    royalBanner: state.flags.tookThread ? 'The torn banner stirs in the rain, one bright thread lighter.' : 'Silver-gold thread runs through the royal banner in an unbroken spiral.',
    throne: state.flags.openedDescent ? 'The empty throne stands above an open stair descending into amber darkness.' : 'It is less a seat than a lock made to resemble one. A round seal socket waits beneath its arms.',
    palaceDescent: state.flags.openedDescent ? 'The stair descends beneath the throne, each step pulsing with low amber light.' : 'A circular door is set into the dais below the throne. It has no handle.',
    palaceSky:'The moon hangs over the ruined towers, but the stars seem to bend away from the palace.',
    starBrazier: state.flags.tookAsh ? 'Only a faint violet glow remains in the celestial brazier.' : 'The brazier has been cold for centuries, yet its ash still glitters like a buried night sky.',
    rootVein: state.flags.tookResin ? 'The wounded root has sealed itself with a thin skin of silver.' : 'Amber resin wells from a split in the living root, keeping time with the pulse below.',
    brokenWard: state.flags.restoredWard ? 'The ward is whole, and every line now points toward the tower above.' : 'The golden circle has split in seven places. Its symbols are not carved—they were written.',
    vaultPrison:'Silver roots and crystal bars form a prison around the Warden. Neither seems entirely willing to hold him.',
    warden:'He wears the ruined heavens like armor. The roots bind his body, but not his attention.',
    palaceElowen:'Elowen studies the palace with the wary recognition of someone returning to a nightmare.',
    vaultElowen:'Elowen keeps one hand near her wayfinder tools and the other clenched at her side.',
    mosswick:'A forest keeper, judging by the leaves, bells, and complete lack of ordinary pockets.',
    sera:'She is translucent at the edges, but her expression is considerably more solid.',
    elowen: state.flags.freedElowen ? 'Elowen is older than Liora remembers, and real enough to cast a shadow.' : 'A woman waits inside the mirror, lit at the edges like a memory refusing to fade.'
  };
  say([['Liora',text[id]]]);
}

function useHotspot(id) {
  const item = state.selected;
  state.selected = null;
  if (id === 'observatory' || id === 'glade' || id === 'archive' || id === 'causeway' || id === 'lanternCourt' || id === 'hallOfNames' || id === 'palaceAtrium') { changeScene(id); return; }
  if (state.chapter === 4) { useChapterFourHotspot(id, item); render(); return; }
  if (state.chapter === 3) { useChapterThreeHotspot(id, item); render(); return; }
  if (state.chapter === 2) { useChapterTwoHotspot(id, item); render(); return; }
  if (id === 'mosswick') {
    talkToMosswick(item);
  } else if (id === 'mushrooms') {
    if (item) return wrongItem(item, id);
    if (!state.flags.tookGlowcap) { state.flags.tookGlowcap=true; addItem('glowcap'); chime(); say([['Liora','One will be enough. The rest can keep the beetles company.']]); }
    else say([['Liora','I should leave the little colony in peace.']]);
  } else if (id === 'well') {
    if (item) return wrongItem(item,id);
    if (!state.flags.drewWater) { state.flags.drewWater=true; addItem('moonwater'); chime(); say([['Liora','The bucket is full of moonlight—but there is no moon above the trees. Curious.']]); }
    else say([['Liora','I have enough moonwater. Wishes should not be greedy.']]);
  } else if (id === 'hollow') {
    if (item === 'litLantern' && !state.flags.litHollow) {
      state.flags.litHollow=true; removeItem('litLantern'); addItem('starKey'); magicEffect(52,55); chime();
      say([['Liora','The light wakes something beneath the roots…'],['Liora','A seven-rayed key. Someone hid it here for a night exactly like this.']]);
    } else if (state.flags.litHollow) say([['Liora','Nothing else remains in the hollow.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','Not with bare hands. Something moved in there, and it had opinions.']]);
  } else if (id === 'astrolabe') {
    if (item === 'starKey' && !state.flags.unlockedAstrolabe) {
      state.flags.unlockedAstrolabe=true; removeItem('starKey'); magicEffect(48,35); chime();
      say([['Liora','The key turns as if the lock has been waiting centuries.'],['Liora','The rings are aligned. Now they need something to catch their light.']], checkVictory);
    } else if (state.flags.unlockedAstrolabe) say([['Liora','The rings are ready. The crystal must be awakened.']], checkVictory);
    else if (item) wrongItem(item,id);
    else say([['Liora','Locked. The keyhole is shaped like a seven-pointed star.']]);
  } else if (id === 'pedestal') {
    if (item === 'moonwater' && !state.flags.filledPedestal) {
      state.flags.filledPedestal=true; removeItem('moonwater'); magicEffect(54,61); chime();
      say([['Liora','The moonwater rises around the crystal instead of spilling.'],['Liora','It is ready—but the great rings must be unlocked.']], checkVictory);
    } else if (state.flags.filledPedestal) { say([['Liora','The crystal hums with a note I can feel in my teeth.']],checkVictory); }
    else if (item) wrongItem(item,id);
    else say([['Liora','The basin is empty. The crystal reflects nothing at all.']]);
  } else if (id === 'castle') inspect(id);
  render();
}

function talkToMosswick(item) {
  if (item) {
    const reactions = {
      lantern:'Brass remembers every flame it has carried. Yours is waiting for a kinder sort of fire.',
      glowcap:'A fine little dawn-button. Best give it a safe house before asking it into the dark.',
      litLantern:'Now that is a civilized light. The root hollow may grumble, but it will let you look.',
      starKey:'Seven rays. Orrery work. I wondered when that old lock would begin dreaming again.',
      moonwater:'Careful with that. The well keeps the sky it wishes we still had.'
    };
    say([['Mosswick',reactions[item] || 'Useful, perhaps. But not to an old keeper with too many pockets already.']]);
    return;
  }
  const f = state.flags;
  if (!f.metMosswick) {
    f.metMosswick = true;
    say([['Mosswick','Soft steps, wayfinder. The roots have been nervous since the sky went quiet.'],['Liora','You knew I was coming?'],['Mosswick','No. But the mushrooms did, and they are terrible at keeping secrets.']]);
  } else if (!f.tookGlowcap) {
    say([['Mosswick','When the heavens go dark, look for the smallest lights. They are usually less dramatic and more helpful.']]);
  } else if (state.inventory.includes('glowcap') && state.inventory.includes('lantern')) {
    say([['Mosswick','A wandering glow and an empty lantern? Introduce them. Politely.']]);
  } else if (!f.litHollow) {
    say([['Mosswick','The hollow guards what the observatory lost. Bring a light that will not scorch the roots.']]);
  } else if (!f.drewWater) {
    say([['Mosswick','You found the key. Good. Do not leave without asking the old well what sky it remembers.']]);
  } else {
    say([['Mosswick','Up the eastern path, then. If the orrery complains, remind it that centuries are no excuse for bad manners.']]);
  }
}

function useChapterTwoHotspot(id, item) {
  if (id === 'sera') {
    talkToSera(item);
  } else if (id === 'fountain') {
    if (item) return wrongItem(item,id);
    if (!state.flags.drewDreamdew) {
      state.flags.drewDreamdew=true; addItem('dreamdew'); chime();
      say([['Liora','The water gathers into a weightless drop. It feels like holding someone else’s almost-remembered dream.']]);
    } else say([['Liora','One dream is enough to borrow.']]);
  } else if (id === 'brokenBell') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookShard) {
      state.flags.tookShard=true; addItem('bellShard'); chime();
      say([['Liora','A silver bell tongue. Even broken things can remember how they once sang.']]);
    } else say([['Liora','Only the cracked bell remains.']]);
  } else if (id === 'tapestry') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookThread) {
      state.flags.tookThread=true; addItem('silverThread'); chime();
      say([['Liora','Silver thread, spun thin enough to stitch a whisper.']]);
    } else say([['Liora','I should leave the rest of the dawn sky intact.']]);
  } else if (id === 'starMap') {
    if (item === 'dreamdew' && !state.flags.revealedSong) {
      state.flags.revealedSong=true; removeItem('dreamdew'); magicEffect(52,36); chime();
      say([['Liora','The dreamdew runs upward across the glass…'],['Liora','Four constellations wake in order. It is not a map—it is a melody.']]);
    } else if (state.flags.revealedSong) say([['Liora','Wren, Crown, River, Sun. I can almost hear the shape of it.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The star chart is hidden beneath dust that refuses to move.']]);
  } else if (id === 'resonator') {
    if (item === 'mendedChime' && state.flags.revealedSong && !state.flags.tunedChime) {
      state.flags.tunedChime=true; removeItem('mendedChime'); addItem('tunedChime'); magicEffect(84,42); chime();
      say([['Liora','The rings turn through Wren, Crown, River, Sun.'],['Liora','There—the chime remembers morning.']]);
    } else if (item === 'mendedChime') {
      say([['Liora','The machine can tune it, but I do not know the melody yet.']]);
    } else if (state.flags.tunedChime) say([['Liora','Its lesson is finished. The awakened chime belongs at the gate.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The empty cradle is just the size of a hand bell.']]);
  } else if (id === 'cityGate') {
    if (item === 'tunedChime' && !state.flags.openedGate) {
      state.flags.openedGate=true; removeItem('tunedChime'); magicEffect(50,40); chime(); save();
      say([['Liora','The note passes through the gate like sunrise through glass.'],['Unknown voice','Liora? Is that truly you?']], transitionToChapterThree);
    } else if (state.flags.openedGate) say([['Liora','The city is awake—and someone inside knows my name.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The seal is listening. It needs the song the city used to wake.']]);
  } else if (id === 'cityWindow') {
    inspect(id);
  }
}

function useChapterThreeHotspot(id, item) {
  if (id === 'elowen') {
    talkToElowen(item);
  } else if (id === 'lanternTree') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookMote) {
      state.flags.tookMote=true; addItem('dawnMote'); magicEffect(19,36); chime();
      say([['Liora','One lantern is still awake. Its spark comes willingly, as if it recognizes me.']]);
    } else say([['Liora','The remaining lanterns are dark, but no longer feel empty.']]);
  } else if (id === 'sundial') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookPrism) {
      state.flags.tookPrism=true; addItem('hollowPrism'); chime();
      say([['Liora','A hollow prism. The glass is cold, but something inside it is waiting for light.']]);
    } else say([['Liora','Only rain and a broken shadow remain in the cradle.']]);
  } else if (id === 'nameLoom') {
    if (item === 'memoryLens' && !state.flags.revealedName) {
      state.flags.revealedName=true; removeItem('memoryLens'); addItem('nameSigil');
      magicEffect(84,43); chime();
      say([['Liora','The loom catches the light and draws one golden thread from the mirror.'],['Elowen','I can feel my name inside it. Bring it to the mirror, Liora.']]);
    } else if (state.flags.revealedName) say([['Liora','The loom has already woven everything the lens remembered.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The cradle is shaped for a lens. The loom needs a memory it can see.']]);
  } else if (id === 'memoryMirror') {
    if (item === 'nameSigil' && !state.flags.freedElowen) {
      state.flags.freedElowen=true; removeItem('nameSigil'); magicEffect(51,35); chime(); save();
      say([
        ['Elowen','My name… I remember it.'],
        ['Liora','Elowen.'],
        ['Elowen','And I remember who closed the sky. The one beneath the palace is waking.']
      ], transitionToChapterFour);
    } else if (state.flags.freedElowen) say([['Liora','The glass is only a mirror now. That may be the kindest thing it has been in centuries.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The mirror holds her shape, but not the name that would let her cross.']]);
  } else if (id === 'palace') {
    inspect(id);
  }
}

function talkToElowen(item) {
  if (item) {
    const reactions = {
      dawnMote:'That light followed us on the north road. It may still remember who walked beside you.',
      hollowPrism:'The city used those prisms to keep memories from fading. This one has been empty too long.',
      memoryLens:'Hold it to the loom. If any thread of me remains, the glass will find it.',
      nameSigil:'I can feel my name inside it. Bring it to the mirror, Liora.'
    };
    say([['Elowen',reactions[item] || 'Keep it close. Objects remember more here than people do.']]);
    return;
  }
  const f = state.flags;
  if (f.freedElowen) {
    say([['Elowen','The palace is our road now. We have very little night left.']]);
  } else if (!f.metElowen) {
    f.metElowen = true;
    say([
      ['Elowen','You heard me. I had almost forgotten what hope sounded like.'],
      ['Liora','Elowen? You vanished the night the north road died.'],
      ['Elowen','The city took my name before it took the stars. Without it, I cannot cross the glass.']
    ]);
  } else if (!f.tookMote || !f.tookPrism) {
    say([['Elowen','The lantern tree kept one waking spark. The sundial kept the glass that once carried it.']]);
  } else if (!f.madeLens) {
    say([['Elowen','Light remembers faces. Join the mote to the hollow prism and let it remember mine.']]);
  } else if (!f.revealedName) {
    say([['Elowen','The loom can pull a true name from memory, but only if you give it a lens.']]);
  } else {
    say([['Elowen','Bring the sigil to the mirror. Speak nothing—the glass has listened to enough lies.']]);
  }
}

function useChapterFourHotspot(id, item) {
  if (id === 'palaceElowen' || id === 'vaultElowen') {
    talkToPalaceElowen(item, id === 'vaultElowen');
  } else if (id === 'warden') {
    talkToWarden(item);
  } else if (id === 'sunMosaic') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookDisc) {
      state.flags.tookDisc=true; addItem('sunDisc'); chime();
      say([['Liora','The center comes free. It is heavier than gold and colder than moonlight.']]);
    } else say([['Liora','Only the broken rays remain in the floor.']]);
  } else if (id === 'royalBanner') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookThread) {
      state.flags.tookThread=true; addItem('royalThread'); chime();
      say([['Liora','One thread unwinds without tearing. It was woven to hold something together.']]);
    } else say([['Liora','The rest of the banner can keep its last few secrets.']]);
  } else if (id === 'palaceDescent') {
    if (item === 'sunSeal' && !state.flags.openedDescent) {
      state.flags.openedDescent=true; removeItem('sunSeal'); magicEffect(51,43); chime(); save();
      say([['Liora','The throne accepts the seal.'],['Elowen','There—the whole dais is turning. The way below is open.']]);
    } else if (state.flags.openedDescent && !item) {
      changeScene('heartVault');
    } else if (state.flags.openedDescent) {
      wrongItem(item,id);
    } else if (item) wrongItem(item,id);
    else say([['Liora','The throne and the door are one mechanism. Its empty socket is shaped like a small sun.']]);
  } else if (id === 'starBrazier') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookAsh) {
      state.flags.tookAsh=true; addItem('starAsh'); chime();
      say([['Liora','The ash is cold, but each grain leaves a point of light on my palm.']]);
    } else say([['Liora','The remaining ash is too faint to carry.']]);
  } else if (id === 'rootVein') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookResin) {
      state.flags.tookResin=true; addItem('rootResin'); chime();
      say([['Liora','The resin gathers without burning me. The roots want the circle mended.']]);
    } else say([['Liora','The root has already closed its wound.']]);
  } else if (id === 'brokenWard') {
    if (item === 'bindingInk' && !state.flags.restoredWard) {
      state.flags.restoredWard=true; removeItem('bindingInk'); magicEffect(50,64); chime(); save();
      say([
        ['Liora','The ward is whole.'],
        ['Warden','No. It is awake.'],
        ['Elowen','Liora—the roots are moving toward the tower.'],
        ['Warden','Then the Crown of Night has found its heir.']
      ], showChapterFourEnding);
    } else if (state.flags.restoredWard) say([['Liora','Every repaired line points upward now. Toward the highest tower.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The broken lines need something that can bind living root to fallen starlight.']]);
  } else if (id === 'palaceSky' || id === 'throne' || id === 'vaultPrison') {
    inspect(id);
  }
}

function talkToPalaceElowen(item, inVault) {
  if (item) {
    const reactions = {
      sunDisc:'That mosaic once marked the sun at the center of every royal oath.',
      royalThread:'The banner still carries the old binding weave. Join its thread to the broken disc.',
      sunSeal:'Set the seal into the throne. It should remember how to descend.',
      starAsh:'The dead brazier remembers the stars. We need something living to make that memory hold.',
      rootResin:'The roots have resin. Mix it with the brazier’s ash and we may be able to rewrite the ward.',
      bindingInk:'Use it on the broken circle. Quickly—the pulse is getting stronger.'
    };
    say([['Elowen',reactions[item] || 'Keep it. The palace has already taken enough from us.']]);
    return;
  }
  const f = state.flags;
  if (inVault) {
    if (!f.metWarden) say([['Elowen','He is the royal astronomer. I saw him at the north road before the sky closed.']]);
    else if (!f.tookAsh || !f.tookResin) say([['Elowen','The roots have resin. The brazier has ash. Together they could rewrite the broken lines.']]);
    else if (!f.madeInk) say([['Elowen','Mix the resin with the star ash. The ward is losing another line with every pulse.']]);
    else say([['Elowen','The ward is failing. Whatever the Warden says, we cannot let it break.']]);
  } else if (!f.metPalaceElowen) {
    f.metPalaceElowen = true;
    say([['Elowen','I came this far once. The throne never had a king—only a lock.']]);
  } else if (!f.tookDisc) {
    say([['Elowen','That mosaic once marked the sun at the center of every royal oath.']]);
  } else if (!f.tookThread) {
    say([['Elowen','The banner still carries the old binding weave. Join its thread to the broken disc.']]);
  } else if (!f.madeSeal) {
    say([['Elowen','Bind the disc with the royal thread. A repaired symbol may still command the throne.']]);
  } else {
    say([['Elowen','Set the seal into the throne. It should remember how to descend.']]);
  }
}

function talkToWarden(item) {
  if (item) {
    const reactions = {
      sunDisc:'Sunlight has no authority here. It never did.',
      starAsh:'That ash came from the first star the palace taught to kneel.',
      rootResin:'The roots remember every promise the crown broke.',
      bindingInk:'An honest ink. A dangerous rarity.'
    };
    say([['Warden',reactions[item] || 'Another palace relic. Keep it, if you enjoy carrying old mistakes.']]);
    return;
  }
  const f = state.flags;
  if (!f.metWarden) {
    f.metWarden = true;
    say([
      ['Warden','Do not mend the circle, wayfinder. Its silence is the only mercy this city has left.'],
      ['Elowen','You closed the sky.'],
      ['Warden','I held it shut. There is a difference, though history seldom keeps it.']
    ]);
  } else if (!f.tookAsh || !f.tookResin) {
    say([['Warden','The roots bleed resin where the ward has split. The dead brazier remembers the stars.']]);
  } else if (!f.madeInk) {
    say([['Warden','Mix them if you mean to bind me. But ask yourself why the city placed its crown underground.']]);
  } else {
    say([['Warden','You have made the ink. Whether you repair the ward or free it is the last honest choice this palace will offer.']]);
  }
}

function talkToSera(item) {
  if (item) {
    const reactions = {
      bellShard:'A bell tongue without its bell. Repair its body before you ask the resonator to teach it.',
      dreamdew:'Dreamdew reveals memories that dust has convinced itself to forget. The star map is very dusty.',
      silverThread:'Archive silver. It was woven to bind sound, light, and overdue manuscripts.',
      mendedChime:'Nicely repaired. Now uncover the waking sequence and let the resonator do its work.',
      tunedChime:'Wren, Crown, River, Sun. The gate will remember that voice.'
    };
    say([['Sera Vale',reactions[item] || 'That belongs to your journey, not my catalogue. A refreshing change.']]);
    return;
  }
  const f = state.flags;
  if (!f.metSera) {
    f.metSera = true;
    say([['Sera Vale','A living visitor. The archive will be insufferably pleased with itself.'],['Liora','Are you the archivist?'],['Sera Vale','An echo of one. Sera Vale—assistant keeper, third class, permanently overdue.']]);
  } else if (!f.tookThread) {
    say([['Sera Vale','The tapestry has been unraveling for eighty-seven years. At this point, one loose thread is practically a donation.']]);
  } else if (!f.revealedSong) {
    say([['Sera Vale','The chart does not need cleaning. It needs to remember being clean. Dreams are good at that sort of contradiction.']]);
  } else if (!f.tunedChime) {
    say([['Sera Vale','The resonator knows the revealed sequence. Give it a whole chime and a moment to be smug.']]);
  } else {
    say([['Sera Vale','Take the waking song to the gate. And if anyone asks, the archive was never asleep—merely indexing its eyelids.']]);
  }
}

function wrongItem(item, target) {
  const lines = {
    'moonwater:hollow':'The roots drink ordinary rain. This water belongs to the sky.',
    'glowcap:hollow':'It would be crushed in there. I need something to hold its glow.',
    'lantern:hollow':'A lantern without light is only a decorative box.',
    'starKey:pedestal':'The key scratches the silver, but nothing answers.',
    'moonwater:astrolabe':'Pouring water into antique machinery is rarely the heroic answer.',
    'dreamdew:resonator':'The brass rings need a note, not a drink.',
    'bellShard:resonator':'The shard will fall from the cradle unless I mend it first.',
    'mendedChime:cityGate':'It has a voice now, but it does not yet know the waking song.',
    'dawnMote:nameLoom':'The spark remembers light, but the loom needs something that can focus it.',
    'hollowPrism:nameLoom':'Empty glass cannot show the loom whose name to weave.',
    'memoryLens:memoryMirror':'The lens reveals memory. I still need the loom to give that memory a name.',
    'sunDisc:palaceDescent':'The broken disc cannot command the throne until its fractures are bound.',
    'royalThread:palaceDescent':'The thread carries an oath, but the throne needs the symbol that oath belonged to.',
    'starAsh:brokenWard':'The ash remembers starlight, but it will scatter before I can write with it.',
    'rootResin:brokenWard':'The resin can bind living things, but the ward was written with stars.',
    'sunSeal:brokenWard':'The palace seal opened the descent. It was never meant to mend this circle.'
  };
  say([['Liora', lines[`${item}:${target}`] || `The ${ITEMS[item].name.toLowerCase()} does not belong there.`]]);
}

function interact(id, element) {
  if (busy || !$('#dialogue').hidden) return;
  ensureAudio(); clickTone();
  const rect = element.getBoundingClientRect(), scene = $('#scene').getBoundingClientRect();
  const x = Math.max(9,Math.min(91,((rect.left+rect.width/2-scene.left)/scene.width)*100));
  walkTo(x, () => state.mode === 'look' && !state.selected ? inspect(id) : useHotspot(id));
}

function walkTo(x, callback) {
  busy = true;
  const hero = $('#hero');
  const current = parseFloat(getComputedStyle(hero).getPropertyValue('--hero-x')) || 50;
  const distance = Math.abs(x - current);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reducedMotion ? 0 : Math.round(Math.max(650, Math.min(2600, 360 + distance * 26)));

  hero.classList.remove('arriving');
  hero.classList.toggle('face-left', x < current);
  hero.style.setProperty('--walk-duration', `${duration}ms`);
  hero.classList.add('walking');
  footstepSequence(duration);

  const finishWalk = () => {
    clearTimeout(fallback);
    hero.removeEventListener('transitionend', onTransitionEnd);
    hero.classList.remove('walking');
    hero.classList.add('arriving');
    setTimeout(() => hero.classList.remove('arriving'), reducedMotion ? 0 : 180);
    busy = false;
    callback();
  };
  const onTransitionEnd = event => {
    if (event.propertyName === 'left') finishWalk();
  };
  const fallback = setTimeout(finishWalk, duration + 80);

  hero.addEventListener('transitionend', onTransitionEnd);
  void hero.offsetWidth;
  hero.style.setProperty('--hero-x', `${x}%`);
}

function changeScene(scene) {
  busy=true; $('#scene').style.opacity='0';
  const fromScene = state.scene;
  setTimeout(()=>{state.scene=scene; render(); placeHeroForScene(fromScene); $('#scene').style.opacity='1'; busy=false; ambientTone(); toast(SCENE_NAMES[scene]); describeRoom(scene);},360);
}

function checkVictory() {
  if (!state.flags.unlockedAstrolabe || !state.flags.filledPedestal) return;
  setTimeout(()=>{
    magicEffect(54,48); chime();
    say([['Liora','The fallen light is climbing…'],['Liora','Go on, little star. The sky has missed you.']],transitionToChapterTwo);
  },250);
}

function setEnding({ eyebrow, title, text, end, button, className, action }) {
  $('#ending-eyebrow').textContent = eyebrow;
  $('#ending-title').textContent = title;
  $('#ending-copy').textContent = text;
  $('#ending-chapter').textContent = end;
  $('#play-again').textContent = button;
  $('#ending-screen').className = `screen ending ${className}`;
  endingAction = action;
  showScreen('ending-screen');
}

function showChapterOneEnding() {
  transitionToChapterTwo();
}

function showChapterTwoEnding() {
  transitionToChapterThree();
}

function showChapterThreeEnding() {
  transitionToChapterFour();
}

function showChapterFourEnding() {
  state.chapterFourComplete = true; save();
  setEnding({
    eyebrow:'The ward awakens', title:'The Crown Below',
    text:'The repaired circle sends living roots racing upward through the palace walls. High above, the darkest tower kindles with a crown-shaped constellation—and somewhere in the city, an unseen heir opens their eyes.',
    end:'To be continued', button:'Play from the beginning', className:'chapter-four-ending', action:()=>begin(false)
  });
}

function hint() {
  const f=state.flags; let msg;
  if(state.chapter===4){
    if(!f.tookDisc) msg='The shattered sun mosaic has a loose center.';
    else if(!f.tookThread) msg='The torn royal banner still holds one unbroken thread.';
    else if(state.inventory.includes('sunDisc')&&state.inventory.includes('royalThread')) msg='Bind the broken sun disc with the royal thread.';
    else if(!f.openedDescent) msg='The repaired sun seal belongs in the throne’s empty socket.';
    else if(state.scene==='palaceAtrium') msg='The open stair beneath the throne leads into the palace foundations.';
    else if(!f.tookAsh) msg='The cold celestial brazier still remembers the stars.';
    else if(!f.tookResin) msg='A living root is bleeding amber resin.';
    else if(state.inventory.includes('starAsh')&&state.inventory.includes('rootResin')) msg='Mix the star ash with the root resin to make binding ink.';
    else msg='Use the binding ink to rewrite the fractured ward circle.';
    toast(msg,4000); $('#scene').classList.add('show-hotspots'); setTimeout(()=>$('#scene').classList.remove('show-hotspots'),1800); return;
  }
  if(state.chapter===3){
    if(!f.tookMote) msg='One lamp in the bronze tree still holds a waking spark.';
    else if(!f.tookPrism) msg='The broken sundial cradles a piece of empty glass.';
    else if(state.inventory.includes('dawnMote')&&state.inventory.includes('hollowPrism')) msg='Join the waking spark to the hollow prism.';
    else if(state.scene==='lanternCourt') msg='The Hall of Names waits through the arch at the far right.';
    else if(!f.revealedName) msg='The name loom needs a lens filled with memory.';
    else if(!f.freedElowen) msg='Bring the woven name sigil to the memory mirror.';
    else msg='The road continues toward the palace.';
    toast(msg,4000); $('#scene').classList.add('show-hotspots'); setTimeout(()=>$('#scene').classList.remove('show-hotspots'),1800); return;
  }
  if(state.chapter===2){
    if(!f.tookShard) msg='The broken bell still has one useful piece.';
    else if(!f.drewDreamdew) msg='The fountain holds more than water.';
    else if(state.scene==='causeway'&&!f.tookThread) msg='The archive stair descends at the far right.';
    else if(!f.tookThread) msg='Something silver is unraveling from the old tapestry.';
    else if(state.inventory.includes('bellShard')&&state.inventory.includes('silverThread')) msg='Try mending the bell shard with something strong and fine.';
    else if(!f.revealedSong) msg='The dusty star map needs something that remembers hidden things.';
    else if(!f.tunedChime) msg='The brass resonator can teach a repaired chime the revealed melody.';
    else if(state.scene==='archive') msg='The awakened chime belongs at the city gate.';
    else msg='Let the gate hear the awakened chime.';
    toast(msg,4000); $('#scene').classList.add('show-hotspots'); setTimeout(()=>$('#scene').classList.remove('show-hotspots'),1800); return;
  }
  if(!f.tookGlowcap) msg='Some lights grow close to the ground.';
  else if(state.inventory.includes('glowcap')&&state.inventory.includes('lantern')) msg='Try combining two things in your inventory.';
  else if(!f.litHollow) msg='The root hollow needs a safe, living light.';
  else if(!f.drewWater) msg='Old wells remember more than rain.';
  else if(state.scene==='glade') msg='The observatory waits beyond the path to the right.';
  else if(!f.unlockedAstrolabe) msg='The star key resembles a lock in the great mechanism.';
  else if(!f.filledPedestal) msg='The dry silver basin needs something that reflects a hidden sky.';
  else msg='Touch the awakened crystal.';
  toast(msg,4000); $('#scene').classList.add('show-hotspots'); setTimeout(()=>$('#scene').classList.remove('show-hotspots'),1800);
}

function toast(text,time=2200){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),time);}
function magicEffect(x,y){const e=$('#item-effect');e.style.left=`${x}%`;e.style.top=`${y}%`;e.classList.remove('play');void e.offsetWidth;e.classList.add('play');}

function ensureAudio(){
  if(!state.sound)return;
  audio ||= new (window.AudioContext||window.webkitAudioContext)();
  if(audio.state==='suspended')audio.resume();
}
function tone(freq,duration=.12,type='sine',gain=.035,delay=0){if(!state.sound||!audio)return;const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(0,audio.currentTime+delay);g.gain.linearRampToValueAtTime(gain,audio.currentTime+delay+.02);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+delay+duration);o.connect(g).connect(audio.destination);o.start(audio.currentTime+delay);o.stop(audio.currentTime+delay+duration);}
function clickTone(){tone(260,.07,'triangle',.018)}
function footstepSequence(duration){
  if(!state.sound||!audio||duration<250)return;
  const steps=Math.max(2,Math.round(duration/360));
  for(let i=0;i<steps;i++)tone(i%2?82:96,.045,'triangle',.007,.12+i*(duration/steps)/1000);
}
function chime(){[523,659,784,1046].forEach((f,i)=>tone(f,.55,'sine',.035,i*.09));}
function ambientTone(){tone(state.scene==='glade'?174:state.scene==='hallOfNames'?196:state.scene==='heartVault'?147:220,.9,'sine',.018);}
function toggleSound(){state.sound=!state.sound;if(state.sound){ensureAudio();chime();}else stopVoice();render();toast(state.sound?'Sound on':'Sound off');}

function seedFireflies(){const box=$('#fireflies');for(let i=0;i<18;i++){const f=document.createElement('i');f.className='firefly';f.style.left=`${7+Math.random()*86}%`;f.style.top=`${22+Math.random()*65}%`;f.style.setProperty('--d',`${2+Math.random()*4}s`);f.style.animationDelay=`${-Math.random()*5}s`;box.append(f);}}

$('#new-game').addEventListener('click',()=>begin(false));
$('#continue-game').addEventListener('click',()=>begin(true));
let endingAction = () => begin(false);
$('#play-again').addEventListener('click',()=>endingAction());
$('#dialogue').addEventListener('click',advanceDialogue);
$$('.hotspot').forEach(h=>h.addEventListener('click',()=>interact(h.dataset.id,h)));
$$('.verb').forEach(v=>v.addEventListener('click',()=>{state.mode=v.dataset.mode;state.selected=null;clickTone();render();}));
$('#hint-button').addEventListener('click',hint);
$('#sound-button').addEventListener('click',toggleSound); $('#title-sound').addEventListener('click',toggleSound);
$('#menu-button').addEventListener('click',()=>$('#menu-dialog').showModal());
$('#resume-button').addEventListener('click',()=>$('#menu-dialog').close());
$('#restart-button').addEventListener('click',()=>{$('#menu-dialog').close();state.chapter===4?beginChapterFour():state.chapter===3?beginChapterThree():state.chapter===2?beginChapterTwo():begin(false);});
$('#quit-button').addEventListener('click',()=>{$('#menu-dialog').close();showScreen('title-screen');$('#continue-game').hidden=!loadState()?.started;});
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='h')hint();if(e.key==='Escape'&&!$('#menu-dialog').open)$('#menu-dialog').showModal();if((e.key===' '||e.key==='Enter')&&!$('#dialogue').hidden){e.preventDefault();advanceDialogue();}});

seedFireflies();
$('#continue-game').hidden = !loadState()?.started;
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
