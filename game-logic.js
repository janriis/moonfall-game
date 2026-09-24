/**
 * Pure game logic for Moonfall — extracted from game.js so it can be
 * unit-tested in Node without a DOM.
 *
 * game.js re-exports everything from here via `import * as logic from './game-logic.js'`
 * and uses the functions/objects directly.
 *
 * This module must NOT import or reference any browser/DOM APIs.
 */

// ---------------------------------------------------------------------------
// Items
// ---------------------------------------------------------------------------

export const ITEMS = {
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
  nameSigil: { name: 'Name sigil', art: '☼', description: 'Elowen\u2019s true name, woven into warm glass.' },
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
  mooncall: { name: 'Mooncall', art: '♫', description: 'A reed flute nested in an echo shell. It carries one patient note without end.' }
};

// ---------------------------------------------------------------------------
// State factories
// ---------------------------------------------------------------------------

export const freshState = () => ({
  chapter: 1,
  scene: 'glade', mode: 'use', selected: null, inventory: ['lantern'],
  flags: { tookGlowcap:false, drewWater:false, litHollow:false, unlockedAstrolabe:false, filledPedestal:false, metMosswick:false },
  seenRooms: [], started: false, sound: true
});

export const chapterTwoState = sound => ({
  chapter: 2,
  scene: 'causeway', mode: 'use', selected: null, inventory: [],
  flags: { tookShard:false, drewDreamdew:false, tookThread:false, revealedSong:false, tunedChime:false, openedGate:false, metSera:false },
  seenRooms: [], started: true, sound
});

export const chapterThreeState = sound => ({
  chapter: 3,
  scene: 'lanternCourt', mode: 'use', selected: null, inventory: [],
  flags: { tookMote:false, tookPrism:false, madeLens:false, revealedName:false, freedElowen:false, metElowen:false },
  seenRooms: [], started: true, sound
});

export const chapterFourState = sound => ({
  chapter: 4,
  scene: 'palaceAtrium', mode: 'use', selected: null, inventory: [],
  flags: { tookDisc:false, tookThread:false, madeSeal:false, openedDescent:false, tookAsh:false, tookResin:false, madeInk:false, metWarden:false, restoredWard:false, metPalaceElowen:false },
  seenRooms: [], started: true, sound
});

export const chapterFiveState = sound => ({
  chapter: 5,
  scene: 'rootspireApproach', mode: 'use', selected: null, inventory: [],
  flags: { tookStormglass:false, tookRootFilament:false, madeCompass:false, openedStormGate:false, tookNightglass:false, tookDawnPetal:false, madeEclipseLens:false, restoredCrown:false, metTowerElowen:false, metTowerWarden:false },
  seenRooms: [], started: true, sound
});

export const chapterSixState = sound => ({
  chapter: 6,
  scene: 'starwayCrossing', mode: 'use', selected: null, inventory: [],
  flags: { tookClasp:false, tookSilk:false, madeSail:false, launchedFerry:false, tookReed:false, tookShell:false, madeMooncall:false, openedBloom:false, metStarwayElowen:false, metGardenElowen:false },
  seenRooms: [], started: true, sound
});

// ---------------------------------------------------------------------------
// Inventory helpers
// ---------------------------------------------------------------------------

export function addItem(state, id) {
  if (!state.inventory.includes(id)) state.inventory.push(id);
}

export function removeItem(state, id) {
  state.inventory = state.inventory.filter(x => x !== id);
}

// ---------------------------------------------------------------------------
// Item combination logic
// Returns { matched: true, result: itemId, flag: string|null } or { matched: false }
// ---------------------------------------------------------------------------

const COMBINATIONS = [
  { ingredients: ['lantern', 'glowcap'],      result: 'litLantern',    flag: null },
  { ingredients: ['bellShard', 'silverThread'], result: 'mendedChime', flag: null },
  { ingredients: ['dawnMote', 'hollowPrism'],  result: 'memoryLens',   flag: 'madeLens' },
  { ingredients: ['sunDisc', 'royalThread'],   result: 'sunSeal',       flag: 'madeSeal' },
  { ingredients: ['starAsh', 'rootResin'],     result: 'bindingInk',    flag: 'madeInk' },
  { ingredients: ['stormglass', 'rootFilament'], result: 'livingCompass', flag: 'madeCompass' },
  { ingredients: ['nightglass', 'dawnPetal'],  result: 'eclipseLens',   flag: 'madeEclipseLens' },
  { ingredients: ['cometClasp', 'starSilk'],   result: 'starSail',      flag: 'madeSail' },
  { ingredients: ['moonReed', 'echoShell'],    result: 'mooncall',      flag: 'madeMooncall' },
];

export function findCombination(a, b) {
  const pair = new Set([a, b]);
  for (const combo of COMBINATIONS) {
    if (combo.ingredients.every(ing => pair.has(ing))) {
      return combo;
    }
  }
  return null;
}

/**
 * Attempts to combine two items in the given state's inventory.
 * Mutates state: removes ingredients, adds result, sets flag, clears selection.
 * Returns the combination result if matched, or null if no match.
 */
export function combine(state, a, b) {
  const combo = findCombination(a, b);
  if (!combo) {
    state.selected = null;
    return null;
  }
  removeItem(state, a);
  removeItem(state, b);
  addItem(state, combo.result);
  state.selected = null;
  if (combo.flag) state.flags[combo.flag] = true;
  return combo;
}