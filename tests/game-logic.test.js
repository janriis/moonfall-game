/**
 * Unit tests for Moonfall game logic.
 *
 * Uses Node's built-in test runner (node:test) — no external deps needed.
 * Run with: npm test
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ITEMS,
  freshState,
  chapterTwoState,
  chapterThreeState,
  chapterFourState,
  chapterFiveState,
  chapterSixState,
  addItem,
  removeItem,
  combine,
  findCombination,
} from '../game-logic.js';

// ---------------------------------------------------------------------------
// State factories
// ---------------------------------------------------------------------------

describe('freshState', () => {
  it('starts at chapter 1 in the glade', () => {
    const s = freshState();
    assert.equal(s.chapter, 1);
    assert.equal(s.scene, 'glade');
    assert.equal(s.mode, 'use');
    assert.equal(s.selected, null);
    assert.equal(s.started, false);
    assert.equal(s.sound, true);
  });

  it('starts with a lantern in inventory', () => {
    const s = freshState();
    assert.deepEqual(s.inventory, ['lantern']);
  });

  it('has all expected chapter 1 flags initialized to false', () => {
    const s = freshState();
    const expectedFlags = ['tookGlowcap', 'drewWater', 'litHollow', 'unlockedAstrolabe', 'filledPedestal', 'metMosswick'];
    for (const flag of expectedFlags) {
      assert.equal(s.flags[flag], false, `flag ${flag} should be false`);
    }
  });

  it('has an empty seenRooms array', () => {
    const s = freshState();
    assert.deepEqual(s.seenRooms, []);
  });

  it('returns a fresh object each call (no shared state)', () => {
    const a = freshState();
    const b = freshState();
    a.inventory.push('glowcap');
    assert.equal(b.inventory.length, 1, 'modifying one state should not affect another');
  });

  it('does not share flags between instances', () => {
    const a = freshState();
    const b = freshState();
    a.flags.tookGlowcap = true;
    assert.equal(b.flags.tookGlowcap, false, 'flags should not be shared between instances');
  });

  it('does not share seenRooms between instances', () => {
    const a = freshState();
    const b = freshState();
    a.seenRooms.push('glade');
    assert.equal(b.seenRooms.length, 0, 'seenRooms should not be shared');
  });
});

// ---------------------------------------------------------------------------
// Chapter state factories — comprehensive
// ---------------------------------------------------------------------------

describe('chapterTwoState', () => {
  it('starts at chapter 2 in the causeway', () => {
    const s = chapterTwoState(true);
    assert.equal(s.chapter, 2);
    assert.equal(s.scene, 'causeway');
  });

  it('preserves the sound setting', () => {
    assert.equal(chapterTwoState(false).sound, false);
    assert.equal(chapterTwoState(true).sound, true);
  });

  it('starts with empty inventory', () => {
    assert.deepEqual(chapterTwoState(true).inventory, []);
  });

  it('has all chapter 2 flags initialized to false', () => {
    const s = chapterTwoState(true);
    const expectedFlags = ['tookShard', 'drewDreamdew', 'tookThread', 'revealedSong', 'tunedChime', 'openedGate', 'metSera'];
    for (const flag of expectedFlags) {
      assert.equal(s.flags[flag], false, `flag ${flag} should be false`);
    }
  });

  it('starts in use mode with no selection', () => {
    const s = chapterTwoState(true);
    assert.equal(s.mode, 'use');
    assert.equal(s.selected, null);
  });

  it('is started', () => {
    assert.equal(chapterTwoState(true).started, true);
  });

  it('returns a fresh object each call', () => {
    const a = chapterTwoState(true);
    const b = chapterTwoState(true);
    a.inventory.push('bellShard');
    a.flags.tookShard = true;
    assert.equal(b.inventory.length, 0);
    assert.equal(b.flags.tookShard, false);
  });
});

describe('chapterThreeState', () => {
  it('starts at chapter 3 in lanternCourt', () => {
    const s = chapterThreeState(true);
    assert.equal(s.chapter, 3);
    assert.equal(s.scene, 'lanternCourt');
  });

  it('has all chapter 3 flags initialized to false', () => {
    const s = chapterThreeState(true);
    const expectedFlags = ['tookMote', 'tookPrism', 'madeLens', 'revealedName', 'freedElowen', 'metElowen'];
    for (const flag of expectedFlags) {
      assert.equal(s.flags[flag], false, `flag ${flag} should be false`);
    }
  });

  it('preserves the sound setting', () => {
    assert.equal(chapterThreeState(false).sound, false);
    assert.equal(chapterThreeState(true).sound, true);
  });

  it('returns a fresh object each call', () => {
    const a = chapterThreeState(true);
    const b = chapterThreeState(true);
    a.flags.madeLens = true;
    assert.equal(b.flags.madeLens, false);
  });
});

describe('chapterFourState', () => {
  it('starts at chapter 4 in palaceAtrium', () => {
    const s = chapterFourState(true);
    assert.equal(s.chapter, 4);
    assert.equal(s.scene, 'palaceAtrium');
  });

  it('has all chapter 4 flags initialized to false', () => {
    const s = chapterFourState(true);
    const expectedFlags = ['tookDisc', 'tookThread', 'madeSeal', 'openedDescent', 'tookAsh', 'tookResin', 'madeInk', 'metWarden', 'restoredWard', 'metPalaceElowen'];
    for (const flag of expectedFlags) {
      assert.equal(s.flags[flag], false, `flag ${flag} should be false`);
    }
  });

  it('preserves the sound setting', () => {
    assert.equal(chapterFourState(false).sound, false);
    assert.equal(chapterFourState(true).sound, true);
  });
});

describe('chapterFiveState', () => {
  it('starts at chapter 5 in rootspireApproach', () => {
    const s = chapterFiveState(true);
    assert.equal(s.chapter, 5);
    assert.equal(s.scene, 'rootspireApproach');
  });

  it('has all chapter 5 flags initialized to false', () => {
    const s = chapterFiveState(true);
    const expectedFlags = ['tookStormglass', 'tookRootFilament', 'madeCompass', 'openedStormGate', 'tookNightglass', 'tookDawnPetal', 'madeEclipseLens', 'restoredCrown', 'metTowerElowen', 'metTowerWarden'];
    for (const flag of expectedFlags) {
      assert.equal(s.flags[flag], false, `flag ${flag} should be false`);
    }
  });

  it('preserves the sound setting', () => {
    assert.equal(chapterFiveState(false).sound, false);
    assert.equal(chapterFiveState(true).sound, true);
  });
});

describe('chapterSixState', () => {
  it('starts at chapter 6 in starwayCrossing', () => {
    const s = chapterSixState(true);
    assert.equal(s.chapter, 6);
    assert.equal(s.scene, 'starwayCrossing');
  });

  it('has all chapter 6 flags initialized to false', () => {
    const s = chapterSixState(true);
    const expectedFlags = ['tookClasp', 'tookSilk', 'madeSail', 'launchedFerry', 'tookReed', 'tookShell', 'madeMooncall', 'openedBloom', 'metStarwayElowen', 'metGardenElowen'];
    for (const flag of expectedFlags) {
      assert.equal(s.flags[flag], false, `flag ${flag} should be false`);
    }
  });

  it('preserves the sound setting', () => {
    assert.equal(chapterSixState(false).sound, false);
    assert.equal(chapterSixState(true).sound, true);
  });
});

// ---------------------------------------------------------------------------
// Cross-chapter state consistency
// ---------------------------------------------------------------------------

describe('State consistency across chapters', () => {
  const factories = [
    ['freshState', freshState],
    ['chapterTwoState', () => chapterTwoState(true)],
    ['chapterThreeState', () => chapterThreeState(true)],
    ['chapterFourState', () => chapterFourState(true)],
    ['chapterFiveState', () => chapterFiveState(true)],
    ['chapterSixState', () => chapterSixState(true)],
  ];

  for (const [name, factory] of factories) {
    it(`${name}: has mode='use'`, () => {
      assert.equal(factory().mode, 'use');
    });

    it(`${name}: has selected=null`, () => {
      assert.equal(factory().selected, null);
    });

    it(`${name}: has empty seenRooms`, () => {
      assert.deepEqual(factory().seenRooms, []);
    });

    it(`${name}: has a flags object`, () => {
      assert.ok(typeof factory().flags === 'object' && factory().flags !== null);
    });

    it(`${name}: has an array inventory`, () => {
      assert.ok(Array.isArray(factory().inventory));
    });
  }

  it('all chapters have distinct scene values', () => {
    const scenes = [
      freshState().scene,
      chapterTwoState(true).scene,
      chapterThreeState(true).scene,
      chapterFourState(true).scene,
      chapterFiveState(true).scene,
      chapterSixState(true).scene,
    ];
    assert.equal(new Set(scenes).size, scenes.length, 'all chapter scenes should be unique');
  });

  it('all chapters have distinct chapter numbers 1-6', () => {
    const chapters = [
      freshState().chapter,
      chapterTwoState(true).chapter,
      chapterThreeState(true).chapter,
      chapterFourState(true).chapter,
      chapterFiveState(true).chapter,
      chapterSixState(true).chapter,
    ];
    assert.deepEqual([...chapters].sort(), [1, 2, 3, 4, 5, 6]);
  });
});

// ---------------------------------------------------------------------------
// Inventory helpers
// ---------------------------------------------------------------------------

describe('addItem', () => {
  it('adds an item not already in inventory', () => {
    const s = freshState();
    addItem(s, 'glowcap');
    assert.ok(s.inventory.includes('glowcap'));
    assert.equal(s.inventory.length, 2);
  });

  it('does not add duplicates', () => {
    const s = freshState();
    addItem(s, 'lantern');
    assert.equal(s.inventory.length, 1, 'should not add duplicate lantern');
  });

  it('preserves order (new items go to end)', () => {
    const s = freshState();
    addItem(s, 'glowcap');
    addItem(s, 'starKey');
    assert.deepEqual(s.inventory, ['lantern', 'glowcap', 'starKey']);
  });

  it('can add multiple different items', () => {
    const s = freshState();
    addItem(s, 'glowcap');
    addItem(s, 'starKey');
    addItem(s, 'moonwater');
    assert.equal(s.inventory.length, 4);
  });
});

describe('removeItem', () => {
  it('removes an item from inventory', () => {
    const s = freshState();
    removeItem(s, 'lantern');
    assert.ok(!s.inventory.includes('lantern'));
    assert.equal(s.inventory.length, 0);
  });

  it('is safe to call on an item not in inventory', () => {
    const s = freshState();
    removeItem(s, 'glowcap'); // glowcap not in fresh state
    assert.equal(s.inventory.length, 1);
  });

  it('only removes the first occurrence (no duplicates anyway)', () => {
    const s = freshState();
    addItem(s, 'glowcap');
    removeItem(s, 'glowcap');
    assert.ok(!s.inventory.includes('glowcap'));
    assert.deepEqual(s.inventory, ['lantern']);
  });

  it('can remove all items', () => {
    const s = freshState();
    removeItem(s, 'lantern');
    assert.deepEqual(s.inventory, []);
  });
});

// ---------------------------------------------------------------------------
// Combination logic
// ---------------------------------------------------------------------------

describe('findCombination', () => {
  it('finds lantern + glowcap combination', () => {
    const combo = findCombination('lantern', 'glowcap');
    assert.ok(combo);
    assert.equal(combo.result, 'litLantern');
    assert.equal(combo.flag, null);
  });

  it('is order-independent', () => {
    const a = findCombination('glowcap', 'lantern');
    const b = findCombination('lantern', 'glowcap');
    assert.equal(a.result, b.result);
  });

  it('finds all 9 valid combinations', () => {
    const pairs = [
      ['lantern', 'glowcap'],
      ['bellShard', 'silverThread'],
      ['dawnMote', 'hollowPrism'],
      ['sunDisc', 'royalThread'],
      ['starAsh', 'rootResin'],
      ['stormglass', 'rootFilament'],
      ['nightglass', 'dawnPetal'],
      ['cometClasp', 'starSilk'],
      ['moonReed', 'echoShell'],
    ];
    for (const [a, b] of pairs) {
      const combo = findCombination(a, b);
      assert.ok(combo, `should find combination for ${a} + ${b}`);
      assert.ok(ITEMS[combo.result], `result ${combo.result} should be a valid item`);
    }
  });

  it('returns null for non-combinable items', () => {
    assert.equal(findCombination('lantern', 'starKey'), null);
    assert.equal(findCombination('glowcap', 'moonwater'), null);
  });

  it('returns null for identical items', () => {
    assert.equal(findCombination('lantern', 'lantern'), null);
    assert.equal(findCombination('glowcap', 'glowcap'), null);
  });

  it('returns null for undefined items', () => {
    assert.equal(findCombination('nonexistent', 'lantern'), null);
    assert.equal(findCombination(undefined, 'glowcap'), null);
  });

  it('each combination result is a valid item in ITEMS', () => {
    const pairs = [
      ['lantern', 'glowcap'],
      ['bellShard', 'silverThread'],
      ['dawnMote', 'hollowPrism'],
      ['sunDisc', 'royalThread'],
      ['starAsh', 'rootResin'],
      ['stormglass', 'rootFilament'],
      ['nightglass', 'dawnPetal'],
      ['cometClasp', 'starSilk'],
      ['moonReed', 'echoShell'],
    ];
    for (const [a, b] of pairs) {
      const combo = findCombination(a, b);
      assert.ok(ITEMS[combo.result], `result '${combo.result}' from ${a}+${b} must exist in ITEMS`);
    }
  });

  it('combination ingredients are not the same as the result', () => {
    const pairs = [
      ['lantern', 'glowcap'],
      ['bellShard', 'silverThread'],
      ['dawnMote', 'hollowPrism'],
      ['sunDisc', 'royalThread'],
      ['starAsh', 'rootResin'],
      ['stormglass', 'rootFilament'],
      ['nightglass', 'dawnPetal'],
      ['cometClasp', 'starSilk'],
      ['moonReed', 'echoShell'],
    ];
    for (const [a, b] of pairs) {
      const combo = findCombination(a, b);
      assert.notEqual(combo.result, a, `result should not equal ingredient ${a}`);
      assert.notEqual(combo.result, b, `result should not equal ingredient ${b}`);
    }
  });
});

describe('combine', () => {
  it('combines lantern + glowcap into litLantern', () => {
    const s = freshState();
    // freshState has ['lantern'], add glowcap
    addItem(s, 'glowcap');
    const result = combine(s, 'lantern', 'glowcap');
    assert.ok(result);
    assert.equal(result.result, 'litLantern');
    assert.ok(s.inventory.includes('litLantern'));
    assert.ok(!s.inventory.includes('lantern'));
    assert.ok(!s.inventory.includes('glowcap'));
    assert.equal(s.selected, null);
  });

  it('sets the corresponding flag when a flag is defined', () => {
    const s = chapterThreeState(true);
    addItem(s, 'dawnMote');
    addItem(s, 'hollowPrism');
    const result = combine(s, 'dawnMote', 'hollowPrism');
    assert.equal(result.result, 'memoryLens');
    assert.equal(s.flags.madeLens, true, 'madeLens flag should be set');
  });

  it('does not set a flag when flag is null', () => {
    const s = freshState();
    addItem(s, 'glowcap');
    const result = combine(s, 'lantern', 'glowcap');
    assert.equal(result.flag, null);
    // freshState has no madeLens flag by default, so we check it's not set
    assert.equal(s.flags.madeLens, undefined, 'no flag should be set for lantern+glowcap');
  });

  it('clears selected after successful combination', () => {
    const s = freshState();
    s.selected = 'glowcap';
    addItem(s, 'glowcap');
    combine(s, 'lantern', 'glowcap');
    assert.equal(s.selected, null);
  });

  it('returns null and clears selected for invalid combination', () => {
    const s = freshState();
    s.selected = 'starKey';
    addItem(s, 'starKey');
    const result = combine(s, 'lantern', 'starKey');
    assert.equal(result, null);
    assert.equal(s.selected, null);
  });

  it('does not modify inventory for invalid combination', () => {
    const s = freshState();
    addItem(s, 'starKey');
    const originalInventory = [...s.inventory];
    combine(s, 'lantern', 'starKey');
    assert.deepEqual(s.inventory, originalInventory);
  });

  it('is order-independent (b,a) same as (a,b)', () => {
    const s1 = freshState();
    addItem(s1, 'glowcap');
    combine(s1, 'lantern', 'glowcap');

    const s2 = freshState();
    addItem(s2, 'glowcap');
    combine(s2, 'glowcap', 'lantern');

    assert.deepEqual(s1.inventory, s2.inventory);
  });

  it('removes both ingredients and adds result for all 9 combinations', () => {
    const testCases = [
      { state: freshState(), add: ['glowcap'], a: 'lantern', b: 'glowcap', result: 'litLantern', flag: null },
      { state: chapterTwoState(true), add: ['silverThread'], a: 'bellShard', b: 'silverThread', result: 'mendedChime', flag: null },
      { state: chapterThreeState(true), add: ['dawnMote', 'hollowPrism'], a: 'dawnMote', b: 'hollowPrism', result: 'memoryLens', flag: 'madeLens' },
      { state: chapterFourState(true), add: ['sunDisc', 'royalThread'], a: 'sunDisc', b: 'royalThread', result: 'sunSeal', flag: 'madeSeal' },
      { state: chapterFourState(true), add: ['starAsh', 'rootResin'], a: 'starAsh', b: 'rootResin', result: 'bindingInk', flag: 'madeInk' },
      { state: chapterFiveState(true), add: ['stormglass', 'rootFilament'], a: 'stormglass', b: 'rootFilament', result: 'livingCompass', flag: 'madeCompass' },
      { state: chapterFiveState(true), add: ['nightglass', 'dawnPetal'], a: 'nightglass', b: 'dawnPetal', result: 'eclipseLens', flag: 'madeEclipseLens' },
      { state: chapterSixState(true), add: ['cometClasp', 'starSilk'], a: 'cometClasp', b: 'starSilk', result: 'starSail', flag: 'madeSail' },
      { state: chapterSixState(true), add: ['moonReed', 'echoShell'], a: 'moonReed', b: 'echoShell', result: 'mooncall', flag: 'madeMooncall' },
    ];

    for (const tc of testCases) {
      const s = tc.state;
      for (const item of tc.add) addItem(s, item);
      const result = combine(s, tc.a, tc.b);
      assert.ok(result, `should combine ${tc.a} + ${tc.b}`);
      assert.equal(result.result, tc.result, `result should be ${tc.result}`);
      assert.ok(s.inventory.includes(tc.result), `${tc.result} should be in inventory`);
      assert.ok(!s.inventory.includes(tc.a), `${tc.a} should be removed`);
      assert.ok(!s.inventory.includes(tc.b), `${tc.b} should be removed`);
      if (tc.flag) {
        assert.equal(s.flags[tc.flag], true, `flag ${tc.flag} should be set`);
      }
    }
  });

  it('combine with same item as both args returns null (self-combine)', () => {
    const s = freshState();
    const result = combine(s, 'lantern', 'lantern');
    assert.equal(result, null);
  });

  it('combine returns the full combo object (not just result string)', () => {
    const s = freshState();
    addItem(s, 'glowcap');
    const result = combine(s, 'lantern', 'glowcap');
    assert.ok(typeof result === 'object');
    assert.ok('result' in result);
    assert.ok('flag' in result);
    assert.ok('ingredients' in result);
  });
});

// ---------------------------------------------------------------------------
// ITEMS integrity
// ---------------------------------------------------------------------------

describe('ITEMS', () => {
  it('every item has name, art, and description', () => {
    for (const [id, item] of Object.entries(ITEMS)) {
      assert.ok(item.name, `item ${id} should have a name`);
      assert.ok(item.art, `item ${id} should have art`);
      assert.ok(item.description, `item ${id} should have a description`);
    }
  });

  it('has all combination results defined as items', () => {
    const results = ['litLantern', 'mendedChime', 'memoryLens', 'sunSeal', 'bindingInk', 'livingCompass', 'eclipseLens', 'starSail', 'mooncall'];
    for (const r of results) {
      assert.ok(ITEMS[r], `combination result ${r} should be in ITEMS`);
    }
  });

  it('has all ingredient items defined', () => {
    const ingredients = [
      'lantern', 'glowcap', 'bellShard', 'silverThread',
      'dawnMote', 'hollowPrism', 'sunDisc', 'royalThread',
      'starAsh', 'rootResin', 'stormglass', 'rootFilament',
      'nightglass', 'dawnPetal', 'cometClasp', 'starSilk',
      'moonReed', 'echoShell',
    ];
    for (const ing of ingredients) {
      assert.ok(ITEMS[ing], `ingredient ${ing} should be in ITEMS`);
    }
  });

  it('all item names are non-empty strings', () => {
    for (const [id, item] of Object.entries(ITEMS)) {
      assert.equal(typeof item.name, 'string', `item ${id} name should be a string`);
      assert.ok(item.name.length > 0, `item ${id} name should not be empty`);
    }
  });

  it('all item descriptions are non-empty strings', () => {
    for (const [id, item] of Object.entries(ITEMS)) {
      assert.equal(typeof item.description, 'string', `item ${id} description should be a string`);
      assert.ok(item.description.length > 0, `item ${id} description should not be empty`);
    }
  });

  it('combination results are not also ingredients', () => {
    const results = new Set(['litLantern', 'mendedChime', 'memoryLens', 'sunSeal', 'bindingInk', 'livingCompass', 'eclipseLens', 'starSail', 'mooncall']);
    const ingredientPairs = [
      ['lantern', 'glowcap'],
      ['bellShard', 'silverThread'],
      ['dawnMote', 'hollowPrism'],
      ['sunDisc', 'royalThread'],
      ['starAsh', 'rootResin'],
      ['stormglass', 'rootFilament'],
      ['nightglass', 'dawnPetal'],
      ['cometClasp', 'starSilk'],
      ['moonReed', 'echoShell'],
    ];
    for (const [a, b] of ingredientPairs) {
      assert.ok(!results.has(a), `ingredient ${a} should not be a combination result`);
      assert.ok(!results.has(b), `ingredient ${b} should not be a combination result`);
    }
  });
});