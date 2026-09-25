import { voiceLineFor, dialogue } from './voice-lines.js';

const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => [...root.querySelectorAll(q)];

const SCENE_NAMES = {
  glade:'Moonfall Glade', observatory:'The Forgotten Orrery', causeway:"Dreamer's Causeway",
  archive:'The Lantern Archive', lanternCourt:'Lantern Court', hallOfNames:'The Hall of Names',
  palaceAtrium:'The Palace Atrium', heartVault:'The Heart Vault',
  rootspireApproach:'The Rootspire Approach', crownChamber:'The Crown Chamber',
  starwayCrossing:'The Starway Crossing', moonwakeGarden:'The Moonwake Garden',
  moonWoundThreshold:'The Wound Threshold', quietHeart:'The Quiet Heart'
};
const PORTRAITS = {
  Liora:'assets/liora.png', Mosswick:'assets/mosswick.png', 'Sera Vale':'assets/sera.png',
  Elowen:'assets/elowen.png', Warden:'assets/warden.png', Orra:'assets/orra.png'
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
  ],
  rootspireApproach: [
    ['Narration','The Rootspire Approach coils around the highest tower above a city adrift in moonlit cloud. Living roots brace a broken landing, a cracked skyglass beacon leans over the western stair, and a vast storm gate turns its blind wind rose toward the sky.'],
    ['Narration','Rain has given way to a high, cold wind scented with lightning and amber sap. Below, Lantern City burns with scattered points of returning light; above, the tower hums as though a compass needle were trapped inside its stone.']
  ],
  crownChamber: [
    ['Narration','The Crown Chamber stands open to the whole night. A black-and-gold circlet floats above the central dais inside an orrery of captive stars, while a fractured nightglass mirror and a single dawn root-bloom face one another across the polished floor.'],
    ['Narration','Here the wind is perfectly still. Every returning star casts a thread of gold toward the crown, and every thread pulls faintly toward Elowen, waiting for her to become an answer she chose long ago to refuse.']
  ],
  starwayCrossing: [
    ['Narration','The Starway Crossing hangs beyond Lantern City above an endless silver cloud sea. A celestial ferry waits beside the luminous road with its mast bare, while a broken comet clasp and a torn length of constellation silk gleam at opposite edges of the landing.'],
    ['Narration','The air is thin, cold, and startlingly clean. Each tile beneath Liora’s boots answers with a distant note, and the restored compass turns steadily toward a petal-shaped darkness crossing the moon.']
  ],
  moonwakeGarden: [
    ['Narration','The Moonwake Garden rests on a forgotten island of stone beneath the enormous moon. A closed eclipse flower rises at its center around a pearl-bright seed, flanked by a pool of hollow silver reeds and an ancient shrine shaped like a spiral shell.'],
    ['Narration','No wind reaches this place, yet violet leaves drift across the floor. The flower’s vast shadow lies over the moon like a sheltering hand, and somewhere inside its folded petals a small light keeps time with Liora’s heartbeat.']
  ],
  moonWoundThreshold: [
    ['Narration','The fracture opens into a cavern inside the moon. Silver water climbs through the air in slow ribbons, and a narrow road of pale stone bends toward a dark arch. Above it, the wound looks less like a break than a seam carefully held apart.'],
    ['Narration','The air is cool and weightless. The moonseed warms in Liora’s hands, answering a faint hum that seems to come from the stone itself.']
  ],
  quietHeart: [
    ['Narration','Beyond the arch lies a still inner sea. A moonstone loom rises over its shore, its empty spindles poised beneath a canopy of dark crystal. At the back of the chamber, something silver glows inside a folded shell of stone.'],
    ['Narration','The silence here is deep but not empty. Each ripple carries the ghost of a tide, while the moonseed casts a small steady light across the dry basin.']
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
  bindingInk: { name: 'Binding ink', art: '✺', description: 'Star ash suspended in root resin: an ink made to mend celestial wards.' },
  stormglass: { name: 'Stormglass shard', art: '◭', description: 'A blue shard from the tower beacon. It trembles whenever the wind changes its mind.' },
  rootFilament: { name: 'Root filament', art: '⌁', description: 'A living golden thread, supple enough to bend and stubborn enough to point home.' },
  livingCompass: { name: 'Living compass', art: '✥', description: 'Stormglass bound in a living root. Its needle points toward a choice rather than north.' },
  nightglass: { name: 'Nightglass shard', art: '◆', description: 'Dark mirror-glass that reflects what a thing was before anyone named it.' },
  dawnPetal: { name: 'Dawn petal', art: '❋', description: 'A warm root-bloom petal holding the first color of morning.' },
  eclipseLens: { name: 'Eclipse lens', art: '◐', description: 'Nightglass and dawnlight held in balance. It reveals the shape beneath a symbol.' },
  cometClasp: { name: 'Comet clasp', art: '⌾', description: 'A moon-silver fitting made to hold a sail against winds between stars.' },
  starSilk: { name: 'Constellation silk', art: '⋇', description: 'A weightless blue fabric threaded with tiny moving points of light.' },
  starSail: { name: 'Star-sail', art: '⛵', description: 'Constellation silk secured by comet metal. It fills whenever the moon is ahead.' },
  moonReed: { name: 'Moon reed', art: '𝄞', description: 'A hollow silver reed. Even silence leaves a note inside it.' },
  echoShell: { name: 'Echo shell', art: '◔', description: 'A spiral shell carved to remember a song after its singer is gone.' },
  mooncall: { name: 'Mooncall', art: '♫', description: 'A reed flute nested in an echo shell. It carries one patient note without end.' },
  moonseed: { name: 'Sheltered moonseed', art: '✧', description: 'A little pearl of living moonlight. It glows more brightly whenever the compass finds an old road.' },
  tideglass: { name: 'Tideglass lens', art: '◌', description: 'A pale lens that makes the moon’s hidden currents visible.' },
  hushShell: { name: 'Hush-shell', art: '◉', description: 'A small shell that remembers the quiet sound of a tide turning.' },
  tideChime: { name: 'Tide chime', art: '♫', description: 'Tideglass and hush-shell joined into a clear note that the moon remembers.' }
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

const chapterFiveState = sound => ({
  chapter: 5,
  scene: 'rootspireApproach', mode: 'use', selected: null, inventory: [],
  flags: { tookStormglass:false, tookRootFilament:false, madeCompass:false, openedStormGate:false, tookNightglass:false, tookDawnPetal:false, madeEclipseLens:false, restoredCrown:false, metTowerElowen:false, metTowerWarden:false },
  seenRooms: [], started: true, sound
});

const chapterSixState = sound => ({
  chapter: 6,
  scene: 'starwayCrossing', mode: 'use', selected: null, inventory: [],
  flags: { tookClasp:false, tookSilk:false, madeSail:false, launchedFerry:false, tookReed:false, tookShell:false, madeMooncall:false, openedBloom:false, metStarwayElowen:false, metGardenElowen:false },
  seenRooms: [], started: true, sound
});

const chapterSevenState = sound => ({
  chapter: 7,
  scene: 'moonWoundThreshold', mode: 'use', selected: null, inventory: ['moonseed'],
  flags: { mappedWound:false, tookTideglass:false, tookHushShell:false, heardTide:false, madeTideChime:false, raisedTide:false, awakenedMoonlight:false, metOrra:false, metWoundElowen:false, metHeartElowen:false },
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
  if (isContinue && state.chapterSevenComplete) { showChapterSevenEnding(); return; }
  if (isContinue && state.chapterSixComplete && state.chapter === 6) { transitionToChapterSeven(); return; }
  if (isContinue && state.chapterFiveComplete && state.chapter === 5) { transitionToChapterSix(); return; }
  if (isContinue && state.chapterFourComplete && state.chapter === 4) { transitionToChapterFive(); return; }
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
    dialogue('elowen-throne-lock'),
    ['Liora','Then we find its key before whatever is below finds its way up.']
  ]);
}

function beginChapterFive() {
  prepareChapterFive();
  enterChapterFiveScene();
}

function prepareChapterFive() {
  const sound = state.sound;
  state = chapterFiveState(sound);
  save();
  showScreen('play-screen');
  render();
  placeHeroForScene();
  ensureAudio();
}

function enterChapterFiveScene() {
  describeRoom(state.scene, [
    dialogue('warden-crown-remembered'),
    dialogue('elowen-records-cut'),
    dialogue('warden-not-blood')
  ]);
}

function beginChapterSix() {
  prepareChapterSix();
  enterChapterSixScene();
}

function prepareChapterSix() {
  const sound = state.sound;
  state = chapterSixState(sound);
  save();
  showScreen('play-screen');
  render();
  placeHeroForScene();
  ensureAudio();
}

function enterChapterSixScene() {
  describeRoom(state.scene, [
    dialogue('warden-remain-city'),
    dialogue('elowen-compass-road'),
    ['Liora','Keep one light burning. We will follow it home.']
  ]);
}

function beginChapterSeven() {
  prepareChapterSeven();
  enterChapterSevenScene();
}

function prepareChapterSeven() {
  const sound = state.sound;
  state = chapterSevenState(sound);
  save();
  showScreen('play-screen');
  render();
  placeHeroForScene();
  ensureAudio();
}

function enterChapterSevenScene() {
  describeRoom(state.scene, [
    ['Elowen','The compass recognizes this wound. The road was drawn into it long before Lantern City had a name.'],
    ['Liora','Then we follow its oldest direction.'],
    ['Elowen','The moonseed is coming with us. Its light belongs to the road.']
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

function transitionToChapterFive() {
  state.chapterFourComplete = true;
  save();
  runStoryTransition('Above them, the highest tower remembers an heir.', prepareChapterFive, enterChapterFiveScene);
}

function transitionToChapterSix() {
  state.chapterFiveComplete = true;
  save();
  runStoryTransition('Beyond the city, a road of stars remembers the moon.', prepareChapterSix, enterChapterSixScene);
}

function transitionToChapterSeven() {
  state.chapterSixComplete = true;
  save();
  runStoryTransition('Inside the wound, an old tide begins to turn.', prepareChapterSeven, enterChapterSevenScene);
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
  $('#scene').classList.toggle('chapter-seven', state.chapter === 7);
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
  const returningToRootspire = state.scene === 'rootspireApproach' && fromScene === 'crownChamber';
  const returningToStarway = state.scene === 'starwayCrossing' && fromScene === 'moonwakeGarden';
  const positions = {
    glade: returningToGlade ? 88 : 57, observatory:18,
    causeway:returningToCauseway ? 89 : 52, archive:10,
    lanternCourt:returningToLanternCourt ? 90 : 48, hallOfNames:13,
    palaceAtrium:returningToPalace ? 50 : 14, heartVault:12,
    rootspireApproach:returningToRootspire ? 73 : 16, crownChamber:15,
    starwayCrossing:returningToStarway ? 79 : 16, moonwakeGarden:14,
    moonWoundThreshold:14, quietHeart:12
  };
  const x = positions[state.scene];
  hero.classList.remove('walking', 'arriving');
  hero.classList.toggle('face-left', returningToGlade || returningToCauseway || returningToLanternCourt || returningToPalace || returningToRootspire || returningToStarway);
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
  } else if (pair.has('stormglass') && pair.has('rootFilament')) {
    removeItem('stormglass'); removeItem('rootFilament'); addItem('livingCompass');
    state.flags.madeCompass = true; state.selected = null;
    magicEffect(86,82); chime();
    say([['Liora','The root curls around the glass and finds a direction. Not north—the chamber beyond.']]);
  } else if (pair.has('nightglass') && pair.has('dawnPetal')) {
    removeItem('nightglass'); removeItem('dawnPetal'); addItem('eclipseLens');
    state.flags.madeEclipseLens = true; state.selected = null;
    magicEffect(86,82); chime();
    say([['Liora','Night holds the dawn without swallowing it. The glass is showing shapes beneath their names.']]);
  } else if (pair.has('cometClasp') && pair.has('starSilk')) {
    removeItem('cometClasp'); removeItem('starSilk'); addItem('starSail');
    state.flags.madeSail = true; state.selected = null;
    magicEffect(86,82); chime();
    say([['Liora','The clasp catches every silver thread. The sail is weightless, but it is already pulling toward the moon.']]);
  } else if (pair.has('moonReed') && pair.has('echoShell')) {
    removeItem('moonReed'); removeItem('echoShell'); addItem('mooncall');
    state.flags.madeMooncall = true; state.selected = null;
    magicEffect(86,82); chime();
    say([['Liora','The reed settles into the shell. One low note circles inside it, waiting to be released.']]);
  } else if (pair.has('tideglass') && pair.has('hushShell') && state.chapter === 7 && state.flags.heardTide) {
    removeItem('tideglass'); removeItem('hushShell'); addItem('tideChime');
    state.flags.madeTideChime = true; state.selected = null;
    magicEffect(86,82); chime();
    say([['Liora','The shell settles into the lens. One clear note turns inside it, as patient as the moon.']]);
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
    towerDescent:'The roots have closed around the stair below. Whatever the crown wants, it means to be answered here.',
    skyglassBeacon: state.flags.tookStormglass ? 'The beacon frame is empty now, singing softly in the wind.' : 'A cracked blue pane catches every gust and turns it into a different star.',
    rootFilament: state.flags.tookRootFilament ? 'The root has already woven a smooth new skin over the missing thread.' : 'One golden filament has come loose from the climbing roots. It points toward the storm gate.',
    stormGate: state.flags.openedStormGate ? 'The wind rose stands open, its cardinal points rearranged into a stair.' : 'The gate has no lock—only a blind wind rose with an empty needle socket.',
    towerWarden:'Freed from the roots below, the Warden seems less like a jailer here and more like a man arriving late to his own confession.',
    towerElowen:'The roots lean toward Elowen. She refuses to lean back.',
    nightglassMirror: state.flags.tookNightglass ? 'The mirror is one dark tooth shorter. In its remaining facets, the crown looks like an open compass.' : 'The fractured mirror refuses every face. It reflects only the oldest shape of whatever stands before it.',
    dawnBloom: state.flags.tookDawnPetal ? 'The root-bloom has folded around its remaining light.' : 'A flower of living root has opened at the edge of the chamber, holding one petal the color of first light.',
    crownDais: state.flags.restoredCrown ? 'The circlet has opened into celestial rings. Nothing in it resembles a throne now.' : 'The Crown of Night hangs inside a web of stolen constellations. Every point turns toward Elowen.',
    openSky:'For the first time, the sky above the city looks deep instead of sealed. Still, whole constellations remain trapped in the crown.',
    chamberWarden:'The Warden watches the crown with the exhausted attention of an astronomer facing his oldest error.',
    chamberElowen:'Elowen stands before her inheritance and looks only like herself.',
    cityArch:'Lantern City glows behind them, no longer asleep. One high window belongs to the Warden now.',
    cometClasp: state.flags.tookClasp ? 'The damaged pedestal holds only a comet-shaped impression.' : 'A moon-silver clasp lies loose inside the shattered wayfinder instrument.',
    starSilk: state.flags.tookSilk ? 'A few harmless sparks cling to the empty arch.' : 'Constellation silk has snagged high on the arch, rippling in a wind Liora cannot feel.',
    starFerry: state.flags.launchedFerry ? 'The restored ferry waits with its bright sail turned toward the garden.' : 'The old vessel is intact, but its bare mast cannot catch the current flowing toward the moon.',
    starwayElowen:'Elowen watches the road ahead with the wonder of someone who once ordered every ferry grounded.',
    moonReeds: state.flags.tookReed ? 'The remaining reeds hum together around one quiet absence.' : 'Hollow silver reeds sing whenever moonlight touches the pool.',
    echoShellShrine: state.flags.tookShell ? 'The spiral cradle is empty, but the shrine still returns every footstep as music.' : 'A pale echo shell rests in the shrine’s spiral center, holding the memory of a tide.',
    eclipseBloom: state.flags.openedBloom ? 'The vast petals are open. At their center, an empty cradle points toward the wounded moon.' : 'The eclipse flower folds around a pearl-bright seed. Its shadow feels protective, not hungry.',
    moonScar: state.flags.openedBloom ? 'Without the flower’s shadow, a silver-black fracture is visible across the moon.' : 'The flower’s silhouette hides the center of the moon. Light gathers around every petal.',
    woundFissure: state.flags.mappedWound ? 'Through the tideglass, the fracture resolves into a road of old lunar markings.' : 'The silver-black seam is too bright to read with the naked eye.',
    moonHeartPassage: state.flags.mappedWound ? 'A narrow arch appears behind the silver current, following the compass’s oldest mark.' : 'The moonseed glows toward a hidden route, but the fracture is still too bright to read.',
    tideglassCrystal: state.flags.tookTideglass ? 'A faint ring remains where the lens rested in the stone.' : 'A round lens of pale glass is caught in the moonstone, clouded by a slow-moving tide.',
    hushShellShrine: state.flags.tookHushShell ? 'The empty cradle rings with the memory of a quiet tide.' : 'A small shell rests in the center of a spiral stone cradle.',
    quietSeam:'A low hum trembles through the wall. It sounds like a tide remembered from far away.',
    dryBasin: state.flags.raisedTide ? 'Silver water circles the basin, and a fine moon-thread floats above its surface.' : 'A circular basin waits beneath the loom, dry as a forgotten shore.',
    lunarLoom: state.flags.awakenedMoonlight ? 'The loom stands open. One strand of moonlight has returned to its spindle.' : state.flags.raisedTide ? 'A single moon-thread glimmers above the basin, ready to guide the loom.' : 'The empty spindles point toward a cocoon sealed inside the crystal canopy.',
    moonlightCocoon: state.flags.awakenedMoonlight ? 'Within the open shell, moonlight turns like a calm sea beneath ice.' : 'A soft radiance stirs behind the dark crystal, waiting for a remembered tide.',
    orra:'A moon moth, old as the first lunar map, watches the loom with gentle patience.',
    woundElowen:'Elowen keeps the compass steady while the road inside the moon comes into focus.',
    heartElowen:'The moonseed casts a small light across Elowen’s hands. She follows its glow toward the sleeping loom.',
    gardenElowen:'Elowen listens to the closed flower as carefully as she once listened at the memory mirror.',
    mosswick:'A forest keeper, judging by the leaves, bells, and complete lack of ordinary pockets.',
    sera:'She is translucent at the edges, but her expression is considerably more solid.',
    elowen: state.flags.freedElowen ? 'Elowen is older than Liora remembers, and real enough to cast a shadow.' : 'A woman waits inside the mirror, lit at the edges like a memory refusing to fade.'
  };
  say([['Liora',text[id]]]);
}

function useHotspot(id) {
  const item = state.selected;
  state.selected = null;
  if (id === 'observatory' || id === 'glade' || id === 'archive' || id === 'causeway' || id === 'lanternCourt' || id === 'hallOfNames' || id === 'palaceAtrium' || id === 'rootspireApproach' || id === 'starwayCrossing' || id === 'moonwakeGarden' || id === 'moonWoundThreshold' || id === 'quietHeart') { changeScene(id); return; }
  if (state.chapter === 7) { useChapterSevenHotspot(id, item); render(); return; }
  if (state.chapter === 6) { useChapterSixHotspot(id, item); render(); return; }
  if (state.chapter === 5) { useChapterFiveHotspot(id, item); render(); return; }
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
      lantern: dialogue('mosswick-lantern'),
      glowcap: dialogue('mosswick-glowcap'),
      litLantern: dialogue('mosswick-lit-lantern'),
      starKey: dialogue('mosswick-star-key'),
      moonwater: dialogue('mosswick-moonwater')
    };
    say([reactions[item] || dialogue('mosswick-default')]);
    return;
  }
  const f = state.flags;
  if (!f.metMosswick) {
    f.metMosswick = true;
    say([dialogue('mosswick-soft-steps'), ['Liora','You knew I was coming?'], dialogue('mosswick-mushrooms-knew')]);
  } else if (!f.tookGlowcap) {
    say([dialogue('mosswick-smallest-lights')]);
  } else if (state.inventory.includes('glowcap') && state.inventory.includes('lantern')) {
    say([dialogue('mosswick-introduce-them')]);
  } else if (!f.litHollow) {
    say([dialogue('mosswick-hollow-guards')]);
  } else if (!f.drewWater) {
    say([dialogue('mosswick-ask-the-well')]);
  } else {
    say([dialogue('mosswick-eastern-path')]);
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
      say([['Liora','The note passes through the gate like sunrise through glass.'],dialogue('unknown-liora')], transitionToChapterThree);
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
      say([['Liora','The loom catches the light and draws one golden thread from the mirror.'],dialogue('elowen-name-sigil')]);
    } else if (state.flags.revealedName) say([['Liora','The loom has already woven everything the lens remembered.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The cradle is shaped for a lens. The loom needs a memory it can see.']]);
  } else if (id === 'memoryMirror') {
    if (item === 'nameSigil' && !state.flags.freedElowen) {
      state.flags.freedElowen=true; removeItem('nameSigil'); magicEffect(51,35); chime(); save();
      say([
        dialogue('elowen-name-remembered'),
        ['Liora','Elowen.'],
        dialogue('elowen-palace-warning')
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
      dawnMote: dialogue('elowen-dawn-mote'),
      hollowPrism: dialogue('elowen-hollow-prism'),
      memoryLens: dialogue('elowen-memory-lens'),
      nameSigil: dialogue('elowen-name-sigil')
    };
    say([reactions[item] || dialogue('elowen-default')]);
    return;
  }
  const f = state.flags;
  if (f.freedElowen) {
    say([dialogue('elowen-little-night')]);
  } else if (!f.metElowen) {
    f.metElowen = true;
    say([
      dialogue('elowen-hope'),
      ['Liora','Elowen? You vanished the night the north road died.'],
      dialogue('elowen-city-took-name')
    ]);
  } else if (!f.tookMote || !f.tookPrism) {
    say([dialogue('elowen-lantern-sundial')]);
  } else if (!f.madeLens) {
    say([dialogue('elowen-light-remembers')]);
  } else if (!f.revealedName) {
    say([dialogue('elowen-loom-lens')]);
  } else {
    say([dialogue('elowen-bring-sigil')]);
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
      say([['Liora','The throne accepts the seal.'],dialogue('elowen-dais-turning')]);
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
        dialogue('warden-no-awake'),
        dialogue('elowen-roots-tower'),
        dialogue('warden-crown-heir')
      ], transitionToChapterFive);
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
      sunDisc: dialogue('elowen-sun-mosaic'),
      royalThread: dialogue('elowen-banner-weave'),
      sunSeal: dialogue('elowen-seal-throne'),
      starAsh: dialogue('elowen-ash-needs-living'),
      rootResin: dialogue('elowen-resin-and-ash'),
      bindingInk: dialogue('elowen-use-ink')
    };
    say([reactions[item] || dialogue('elowen-palace-taken-enough')]);
    return;
  }
  const f = state.flags;
  if (inVault) {
    if (!f.metWarden) say([dialogue('elowen-royal-astronomer')]);
    else if (!f.tookAsh || !f.tookResin) say([dialogue('elowen-rewrite-lines')]);
    else if (!f.madeInk) say([dialogue('elowen-mix-ward-failing')]);
    else say([dialogue('elowen-cannot-break')]);
  } else if (!f.metPalaceElowen) {
    f.metPalaceElowen = true;
    say([dialogue('elowen-throne-lock')]);
  } else if (!f.tookDisc) {
    say([dialogue('elowen-sun-mosaic')]);
  } else if (!f.tookThread) {
    say([dialogue('elowen-banner-weave')]);
  } else if (!f.madeSeal) {
    say([dialogue('elowen-bind-disc')]);
  } else {
    say([dialogue('elowen-seal-throne')]);
  }
}

function talkToWarden(item) {
  if (item) {
    const reactions = {
      sunDisc: dialogue('warden-sunlight'),
      starAsh: dialogue('warden-first-star'),
      rootResin: dialogue('warden-roots-remember'),
      bindingInk: dialogue('warden-honest-ink')
    };
    say([reactions[item] || dialogue('warden-default')]);
    return;
  }
  const f = state.flags;
  if (!f.metWarden) {
    f.metWarden = true;
    say([
      dialogue('warden-do-not-mend'),
      dialogue('elowen-you-closed-sky'),
      dialogue('warden-held-sky')
    ]);
  } else if (!f.tookAsh || !f.tookResin) {
    say([dialogue('warden-resin-and-stars')]);
  } else if (!f.madeInk) {
    say([dialogue('warden-mix-warning')]);
  } else {
    say([dialogue('warden-last-choice')]);
  }
}

function useChapterFiveHotspot(id, item) {
  if (id === 'towerElowen' || id === 'chamberElowen') {
    talkToTowerElowen(item, id === 'chamberElowen');
  } else if (id === 'towerWarden' || id === 'chamberWarden') {
    talkToTowerWarden(item, id === 'chamberWarden');
  } else if (id === 'skyglassBeacon') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookStormglass) {
      state.flags.tookStormglass=true; addItem('stormglass'); chime();
      say([['Liora','A loose shard. It catches the wind and points to stars I cannot see.']]);
    } else say([['Liora','The beacon has given us its last clear piece.']]);
  } else if (id === 'rootFilament') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookRootFilament) {
      state.flags.tookRootFilament=true; addItem('rootFilament'); chime();
      say([['Liora','The root lets one golden thread unwind into my hand. It keeps turning toward the gate.']]);
    } else say([['Liora','The living weave has already sealed itself.']]);
  } else if (id === 'stormGate') {
    if (item === 'livingCompass' && !state.flags.openedStormGate) {
      state.flags.openedStormGate=true; removeItem('livingCompass'); magicEffect(63,35); chime(); save();
      say([
        ['Liora','The compass chooses a point the old wind rose forgot.'],
        dialogue('warden-road-concealed')
      ]);
    } else if (state.flags.openedStormGate && !item) {
      changeScene('crownChamber');
    } else if (state.flags.openedStormGate) wrongItem(item,id);
    else if (item) wrongItem(item,id);
    else say([['Liora','The wind rose needs a needle that can listen to both the storm and the roots.']]);
  } else if (id === 'nightglassMirror') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookNightglass) {
      state.flags.tookNightglass=true; addItem('nightglass'); chime();
      say([['Liora','This shard reflects the crown as a set of open rings—not a thing anyone could wear.']]);
    } else say([['Liora','The remaining glass is fixed too deeply in the frame.']]);
  } else if (id === 'dawnBloom') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookDawnPetal) {
      state.flags.tookDawnPetal=true; addItem('dawnPetal'); chime();
      say([['Liora','One petal opens into my palm. The light inside it feels new enough to forgive an old mistake.']]);
    } else say([['Liora','The bloom closes around the light it has left.']]);
  } else if (id === 'crownDais') {
    if (item === 'eclipseLens' && !state.flags.restoredCrown) {
      state.flags.restoredCrown=true; removeItem('eclipseLens'); magicEffect(53,31); chime(); save();
      say([
        ['Liora','The lens is showing me the first design. It was never a crown.'],
        dialogue('elowen-crown-compass'),
        dialogue('warden-give-sky'),
        ['Liora','Every road belongs to the traveler.']
      ], showChapterFiveEnding);
    } else if (state.flags.restoredCrown) {
      say([['Liora','The rings point outward now. The Crown of Night has remembered how to guide without ruling.']]);
    } else if (item) wrongItem(item,id);
    else say([['Liora','The crown only shows the shape its rulers gave it. We need a way to see what it was before.']]);
  } else if (id === 'towerDescent' || id === 'openSky') {
    inspect(id);
  }
}

function talkToTowerElowen(item, inChamber) {
  if (item) {
    const reactions = {
      stormglass: dialogue('elowen-stormglass'),
      rootFilament: dialogue('elowen-root-filament'),
      livingCompass: dialogue('elowen-living-compass'),
      nightglass: dialogue('elowen-nightglass'),
      dawnPetal: dialogue('elowen-dawn-petal'),
      eclipseLens: dialogue('elowen-eclipse-lens')
    };
    say([reactions[item] || dialogue('elowen-tower-default')]);
    return;
  }
  const f = state.flags;
  if (!f.metTowerElowen) {
    f.metTowerElowen = true;
    say([
      dialogue('elowen-chose-hiding'),
      ['Liora','Because the crown would have claimed you?'],
      dialogue('elowen-refused-throne')
    ]);
  } else if (!inChamber && !f.openedStormGate) {
    say([dialogue('elowen-living-compass-hint')]);
  } else if (inChamber && (!f.tookNightglass || !f.tookDawnPetal)) {
    say([dialogue('elowen-mirror-bloom')]);
  } else if (inChamber && !f.madeEclipseLens) {
    say([dialogue('elowen-balance-lens')]);
  } else if (inChamber) {
    say([dialogue('elowen-refuse-heir')]);
  } else {
    say([dialogue('elowen-no-name')]);
  }
}

function talkToTowerWarden(item, inChamber) {
  if (item) {
    const reactions = {
      stormglass: dialogue('warden-stormglass'),
      rootFilament: dialogue('warden-root-filament'),
      livingCompass: dialogue('warden-living-compass'),
      nightglass: dialogue('warden-nightglass'),
      dawnPetal: dialogue('warden-dawn-petal'),
      eclipseLens: dialogue('warden-eclipse-lens')
    };
    say([reactions[item] || dialogue('warden-tower-default')]);
    return;
  }
  const f = state.flags;
  if (!f.metTowerWarden) {
    f.metTowerWarden = true;
    say([
      dialogue('warden-elowen-astronomer'),
      ['Liora','So you closed the sky.'],
      dialogue('warden-mercy-cowardice')
    ]);
  } else if (!inChamber && !f.openedStormGate) {
    say([dialogue('warden-living-needle')]);
  } else if (inChamber && !f.madeEclipseLens) {
    say([dialogue('warden-nightglass-memory')]);
  } else if (inChamber) {
    say([dialogue('warden-compass-before-crown')]);
  } else {
    say([dialogue('warden-door-open')]);
  }
}

function useChapterSixHotspot(id, item) {
  if (id === 'starwayElowen' || id === 'gardenElowen') {
    talkToMoonwayElowen(item, id === 'gardenElowen');
  } else if (id === 'cometClasp') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookClasp) {
      state.flags.tookClasp=true; addItem('cometClasp'); chime();
      say([['Liora','The broken instrument lets go of one comet clasp. It is cold, but much too light to be ordinary metal.']]);
    } else say([['Liora','Only the empty comet-shaped cradle remains.']]);
  } else if (id === 'starSilk') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookSilk) {
      state.flags.tookSilk=true; addItem('starSilk'); chime();
      say([['Liora','The silk slips free without tearing. Its little stars rearrange themselves around my hands.']]);
    } else say([['Liora','The arch holds only a few fading sparks now.']]);
  } else if (id === 'starFerry') {
    if (item === 'starSail' && !state.flags.launchedFerry) {
      state.flags.launchedFerry=true; removeItem('starSail'); magicEffect(72,35); chime(); save();
      say([
        ['Liora','The sail finds the mast by itself.'],
        dialogue('elowen-current-remembers')
      ]);
    } else if (state.flags.launchedFerry && !item) {
      changeScene('moonwakeGarden');
    } else if (state.flags.launchedFerry) wrongItem(item,id);
    else if (item) wrongItem(item,id);
    else say([['Liora','The ferry has a mast and a moonward keel, but nothing left to catch the star-current.']]);
  } else if (id === 'moonReeds') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookReed) {
      state.flags.tookReed=true; addItem('moonReed'); chime();
      say([['Liora','One reed comes free with a note still trembling inside it.']]);
    } else say([['Liora','The pool needs the rest of its silver choir.']]);
  } else if (id === 'echoShellShrine') {
    if (item) return wrongItem(item,id);
    if (!state.flags.tookShell) {
      state.flags.tookShell=true; addItem('echoShell'); chime();
      say([['Liora','The shell is empty, yet I can hear a distant tide turning inside it.']]);
    } else say([['Liora','The shrine repeats the tide-song the shell left behind.']]);
  } else if (id === 'eclipseBloom') {
    if (item === 'mooncall' && !state.flags.openedBloom) {
      state.flags.openedBloom=true; removeItem('mooncall'); magicEffect(53,31); chime(); save();
      say([
        ['Liora','The bloom is answering.'],
        dialogue('elowen-moonseed-hidden'),
        ['Liora','Then the shadow was shelter, not hunger.'],
        ['Narration','The pearl-bright seed rises from the opening petals and takes its place among the stars. The great shadow withdraws from the moon.'],
        dialogue('elowen-look-behind'),
        ['Narration','Across the moon’s unveiled face runs a silver-black fracture wide enough to swallow a road. The restored compass points directly into it.']
      ], showChapterSixEnding);
    } else if (state.flags.openedBloom) {
      say([['Liora','The flower is only a flower now. Its empty cradle faces the wound in the moon.']]);
    } else if (item) wrongItem(item,id);
    else say([['Liora','The petals close tighter at every loud sound. It may open for a gentler call.']]);
  } else if (id === 'cityArch' || id === 'moonScar') {
    inspect(id);
  }
}

function useChapterSevenHotspot(id, item) {
  const f = state.flags;
  if (id === 'woundElowen' || id === 'heartElowen') {
    if (item) {
      const response = item === 'tideglass' ? 'The compass turns beneath the glare. Look through something that can read a tide.'
        : item === 'hushShell' ? 'The humming seam is keeping a note for us. Let the hush-shell listen.'
          : item === 'tideChime' ? 'The moonseed is answering the open loom. Play the tide chime there.'
            : 'Keep the moonseed close. Its light is the only thing here that has never forgotten the way.';
      say([['Elowen', response]]);
      return;
    }
    if (id === 'woundElowen') {
      if (!f.metWoundElowen) {
        f.metWoundElowen = true;
        say([['Elowen','Keep the moonseed close. Its light is the only thing here that has never forgotten the way.']]);
      } else if (!f.mappedWound) say([['Elowen','The compass turns beneath the glare. Look through something that can read a tide.']]);
      else say([['Elowen','The old mark leads inward. I can feel the current waiting beyond the arch.']]);
    } else {
      if (!f.metHeartElowen) {
        f.metHeartElowen = true;
        say([['Elowen','This loom is older than the city. It feels like a map made to be heard.']]);
      } else if (!f.heardTide) say([['Elowen','The humming seam is keeping a note for us. Let the hush-shell listen.']]);
      else if (!f.madeTideChime) say([['Elowen','Now join the tideglass to the shell. The loom will need a voice, not a key.']]);
      else if (!f.raisedTide) say([['Elowen','The clear note should wake the dry basin first.']]);
      else say([['Elowen','The moonseed is answering the open loom. Play the tide chime there.']]);
    }
  } else if (id === 'orra') {
    if (item) {
      const response = item === 'hushShell' ? 'Let the shell hear the seam’s low note. Then it will remember the tide.'
        : item === 'tideglass' ? 'A useful lens. The fracture is an old road, but the current is hidden in its glare.'
          : item === 'tideChime' ? 'The first tide has answered. The same note can open the moonlight loom.'
            : 'The moonseed carries the light that the heart has kept safe.';
      say([['Orra', response]]);
      return;
    }
    if (!f.metOrra) {
      f.metOrra = true;
      say([
        ['Orra','A seed from the Moonwake. I have not heard a small light choose its own way in a very long while.'],
        ['Liora','What happened to the moon?'],
        ['Orra','Its light folded itself behind the wound when the old tide rose too quickly.'],
        ['Elowen','The fracture is a road and a seal.'],
        ['Orra','A remembered tide can loosen it. The loom will not answer force.']
      ]);
    } else if (!f.heardTide) say([['Orra','Let the hush-shell listen at the seam. Its quiet note will join the tideglass.']]);
    else if (!f.madeTideChime) say([['Orra','The shell has heard the tide. Join it to the lens, and the chime will remember.']]);
    else if (!f.raisedTide) say([['Orra','Give the tide chime to the dry basin. Let the water rise at its own pace.']]);
    else if (!f.awakenedMoonlight) say([['Orra','The moonseed knows what the loom is protecting. Play the same note at its heart.']]);
    else say([['Orra','One strand has woken. The moon can begin to remember its own light.']]);
  } else if (id === 'tideglassCrystal') {
    if (item) return wrongItem(item,id);
    if (!f.tookTideglass) {
      f.tookTideglass = true; addItem('tideglass'); chime();
      say([['Liora','The lens comes free, and a slow silver current appears inside it.']]);
    } else say([['Liora','Only a pale ring remains in the stone.']]);
  } else if (id === 'woundFissure') {
    if (item === 'tideglass' && !f.mappedWound) {
      f.mappedWound = true; magicEffect(51,22); chime();
      say([['Elowen','There—the fracture folds into a road. The compass was made to follow this mark.']]);
    } else if (f.mappedWound && !item) say([['Liora','The lens shows a path through the glare and into the moon.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The wound is too bright to read. I need something that can see the hidden tide.']]);
  } else if (id === 'moonHeartPassage') {
    if (item) return wrongItem(item,id);
    if (f.mappedWound) changeScene('quietHeart');
    else say([['Liora','The arch is hidden in the glare. I should read the fracture with the tideglass first.']]);
  } else if (id === 'hushShellShrine') {
    if (item) return wrongItem(item,id);
    if (!f.tookHushShell) {
      f.tookHushShell = true; addItem('hushShell'); chime();
      say([['Liora','The little shell is quiet, but it feels as though it is waiting to hear something.']]);
    } else say([['Liora','The shell has already found its way into my pack.']]);
  } else if (id === 'quietSeam') {
    if (item === 'hushShell' && !f.heardTide) {
      f.heardTide = true; magicEffect(26,42); chime();
      say([['Orra','There. The shell has heard the tide turning beneath the stone.']]);
    } else if (f.heardTide && !item) say([['Liora','The seam’s note is resting safely inside the shell.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','A low hum trembles through the wall. It sounds like a tide remembered from far away.']]);
  } else if (id === 'dryBasin') {
    if (item === 'tideChime' && !f.raisedTide) {
      f.raisedTide = true; magicEffect(51,71); chime();
      say([['Liora','The basin answers. Silver water rises around the loom, carrying one bright thread to the surface.']]);
    } else if (f.raisedTide && !item) say([['Liora','The tide is here. A fine thread of moonlight waits above the basin.']]);
    else if (item) wrongItem(item,id);
    else say([['Liora','The basin is dry. The loom needs the sound of the remembered tide.']]);
  } else if (id === 'lunarLoom' || id === 'moonlightCocoon') {
    if (item === 'tideChime' && f.raisedTide && !f.awakenedMoonlight) {
      f.awakenedMoonlight = true; save(); magicEffect(53,36); chime();
      say([
        ['Liora','The note passes through the loom. The dark shell opens like a slow-held breath.'],
        ['Narration','The moonlight was never stolen. It curled inward when the tide became too wild.'],
        ['Elowen','One strand has found its way home. We can carry it back to the surface.'],
        ['Narration','The moonseed shines beside the newly awakened thread. Deep inside the moon, its hidden light begins to stir.']
      ], showChapterSevenEnding);
    } else if (f.awakenedMoonlight) say([['Liora','The cocoon has opened. Moonlight moves quietly within the crystal shell.']]);
    else if (item) wrongItem(item,id);
    else if (!f.raisedTide) say([['Liora','The loom is waiting for the remembered tide.']]);
    else say([['Liora','The moonseed glows toward the sleeping shell. The tide chime can carry its note to the loom.']]);
  }
}

function talkToMoonwayElowen(item, inGarden) {
  if (item) {
    const reactions = {
      cometClasp: dialogue('elowen-comet-clasp'),
      starSilk: dialogue('elowen-star-silk'),
      starSail: dialogue('elowen-star-sail'),
      moonReed: dialogue('elowen-moon-reed'),
      echoShell: dialogue('elowen-echo-shell'),
      mooncall: dialogue('elowen-mooncall')
    };
    say([reactions[item] || dialogue('elowen-moonway-default')]);
    return;
  }
  const f = state.flags;
  if (!f.metStarwayElowen) {
    f.metStarwayElowen = true;
    say([
      dialogue('elowen-ferries-grounded'),
      ['Liora','To keep people from leaving?'],
      dialogue('elowen-roads-leash')
    ]);
  } else if (!inGarden && !f.launchedFerry) {
    say([dialogue('elowen-sail-hint')]);
  } else if (inGarden && (!f.tookReed || !f.tookShell)) {
    if (!f.metGardenElowen) f.metGardenElowen = true;
    say([dialogue('elowen-bloom-tide-call')]);
  } else if (inGarden && !f.madeMooncall) {
    say([dialogue('elowen-reed-shell')]);
  } else if (inGarden) {
    say([dialogue('elowen-play-softly')]);
  } else {
    say([dialogue('elowen-road-ours')]);
  }
}

function talkToSera(item) {
  if (item) {
    const reactions = {
      bellShard: dialogue('sera-bell-shard'),
      dreamdew: dialogue('sera-dreamdew'),
      silverThread: dialogue('sera-silver-thread'),
      mendedChime: dialogue('sera-mended-chime'),
      tunedChime: dialogue('sera-tuned-chime')
    };
    say([reactions[item] || dialogue('sera-default')]);
    return;
  }
  const f = state.flags;
  if (!f.metSera) {
    f.metSera = true;
    say([dialogue('sera-living-visitor'), ['Liora','Are you the archivist?'], dialogue('sera-introduction')]);
  } else if (!f.tookThread) {
    say([dialogue('sera-tapestry')]);
  } else if (!f.revealedSong) {
    say([dialogue('sera-chart')]);
  } else if (!f.tunedChime) {
    say([dialogue('sera-resonator')]);
  } else {
    say([dialogue('sera-waking-song')]);
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
    'sunSeal:brokenWard':'The palace seal opened the descent. It was never meant to mend this circle.',
    'stormglass:stormGate':'The glass can read the storm, but it needs something living to hold a direction.',
    'rootFilament:stormGate':'The root remembers the way, but the wind rose needs a needle it can see.',
    'nightglass:crownDais':'The shard sees the crown’s first shape, but there is not enough light to reveal it.',
    'dawnPetal:crownDais':'The petal brings new light, but the crown reflects only its own old story.',
    'livingCompass:crownDais':'The compass has already found the chamber. It cannot reveal what the crown used to be.',
    'eclipseLens:stormGate':'The gate needs direction, not revelation.',
    'cometClasp:starFerry':'The clasp fits the mast, but bare metal cannot catch a current.',
    'starSilk:starFerry':'The silk reaches the mast, but the star-current tears it free without a proper clasp.',
    'moonReed:eclipseBloom':'The reed makes one gentle note, but it fades before the flower can answer.',
    'echoShell:eclipseBloom':'The shell remembers a song, but it has no breath with which to sing it.',
    'starSail:eclipseBloom':'The sail belongs to open currents, not closed petals.',
    'mooncall:starFerry':'The ferry needs a sail, not a serenade.'
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
  transitionToChapterFive();
}

function showChapterFiveEnding() {
  transitionToChapterSix();
}

function showChapterSixEnding() {
  state.chapterSixComplete = true; save();
  setEnding({
    eyebrow:'The shadow was shelter', title:'The Wound Above',
    text:'The moonseed rises into the restored sky and the eclipse flower releases its gentle shadow. Behind it, a fracture opens across the moon—and the celestial compass points straight into the silver-black wound.',
    end:'To be continued', button:'Play from the beginning', className:'chapter-six-ending', action:()=>begin(false)
  });
}

function showChapterSevenEnding() {
  state.chapterSevenComplete = true; save();
  setEnding({
    eyebrow:'The light was waiting', title:'The Quiet Heart',
    text:'Inside the moon, the old tide turns once more. The moonlight was never lost; it folded itself safely behind the wound. One strand wakes beside the moonseed, and the hidden heart begins to glow.',
    end:'To be continued', button:'Play from the beginning', className:'chapter-seven-ending', action:()=>begin(false)
  });
}

function hint() {
  const f=state.flags; let msg;
  if(state.chapter===6){
    if(!f.tookClasp) msg='The broken wayfinder pedestal still holds a loose comet clasp.';
    else if(!f.tookSilk) msg='Constellation silk is caught on the arch at the far right.';
    else if(state.inventory.includes('cometClasp')&&state.inventory.includes('starSilk')) msg='Secure the constellation silk with the comet clasp.';
    else if(!f.launchedFerry) msg='Fit the finished star-sail to the ferry’s bare mast.';
    else if(state.scene==='starwayCrossing') msg='The restored star-ferry can carry you to the Moonwake Garden.';
    else if(!f.tookReed) msg='The tide pool holds hollow reeds that sing in moonlight.';
    else if(!f.tookShell) msg='An echo shell rests inside the spiral shrine.';
    else if(state.inventory.includes('moonReed')&&state.inventory.includes('echoShell')) msg='Join the singing reed to the echo shell.';
    else msg='Play the mooncall for the closed eclipse flower.';
    toast(msg,4000); $('#scene').classList.add('show-hotspots'); setTimeout(()=>$('#scene').classList.remove('show-hotspots'),1800); return;
  }
  if(state.chapter===7){
    if(!f.tookTideglass) msg='A pale lens is caught in the moonstone at the threshold.';
    else if(!f.mappedWound) msg='Look through the tideglass at the bright fracture to find its hidden road.';
    else if(state.scene==='moonWoundThreshold') msg='The arch revealed by the compass leads into the Quiet Heart.';
    else if(!f.tookHushShell) msg='A small shell rests in the spiral cradle beneath the moonstone loom.';
    else if(!f.heardTide) msg='Let the hush-shell listen to the humming seam.';
    else if(state.inventory.includes('tideglass')&&state.inventory.includes('hushShell')) msg='Join the tideglass lens and the shell after it has heard the seam.';
    else if(!f.raisedTide) msg='Play the tide chime at the dry basin to call the old current.';
    else if(!f.awakenedMoonlight) msg='The loom is ready. Carry the chime’s note to its sleeping heart.';
    else msg='One strand of moonlight has awakened. The moonseed will guide the next road.';
    toast(msg,4000); $('#scene').classList.add('show-hotspots'); setTimeout(()=>$('#scene').classList.remove('show-hotspots'),1800); return;
  }
  if(state.chapter===5){
    if(!f.tookStormglass) msg='The cracked beacon still holds one loose shard of skyglass.';
    else if(!f.tookRootFilament) msg='A golden filament has come loose from the roots beside the gate.';
    else if(state.inventory.includes('stormglass')&&state.inventory.includes('rootFilament')) msg='Bind the stormglass with the living root filament.';
    else if(!f.openedStormGate) msg='The living compass belongs in the storm gate’s empty needle socket.';
    else if(state.scene==='rootspireApproach') msg='The open storm gate leads into the tower’s crown chamber.';
    else if(!f.tookNightglass) msg='The fractured mirror has one loose shard of nightglass.';
    else if(!f.tookDawnPetal) msg='The root-bloom holds a petal filled with new light.';
    else if(state.inventory.includes('nightglass')&&state.inventory.includes('dawnPetal')) msg='Join the dawn petal to the nightglass shard.';
    else msg='Hold the eclipse lens before the Crown of Night.';
    toast(msg,4000); $('#scene').classList.add('show-hotspots'); setTimeout(()=>$('#scene').classList.remove('show-hotspots'),1800); return;
  }
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
function ambientTone(){tone(state.scene==='glade'?174:state.scene==='hallOfNames'?196:state.scene==='heartVault'?147:state.scene==='rootspireApproach'?165:state.scene==='crownChamber'?247:state.scene==='starwayCrossing'?294:state.scene==='moonwakeGarden'?207:state.scene==='moonWoundThreshold'?185:state.scene==='quietHeart'?164:220,.9,'sine',.018);}
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
$('#restart-button').addEventListener('click',()=>{$('#menu-dialog').close();state.chapter===7?beginChapterSeven():state.chapter===6?beginChapterSix():state.chapter===5?beginChapterFive():state.chapter===4?beginChapterFour():state.chapter===3?beginChapterThree():state.chapter===2?beginChapterTwo():begin(false);});
$('#quit-button').addEventListener('click',()=>{$('#menu-dialog').close();showScreen('title-screen');$('#continue-game').hidden=!loadState()?.started;});
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='h')hint();if(e.key==='Escape'&&!$('#menu-dialog').open)$('#menu-dialog').showModal();if((e.key===' '||e.key==='Enter')&&!$('#dialogue').hidden){e.preventDefault();advanceDialogue();}});

seedFireflies();
$('#continue-game').hidden = !loadState()?.started;
if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
