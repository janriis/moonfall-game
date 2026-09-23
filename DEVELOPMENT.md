# Moonfall development status

Last updated: 2026-09-23

## Current phase

The game is a complete browser-playable vertical slice through four internal story chapters. Players never see chapter numbers: each part flows into the next as a new scene. The current build ends after Liora and Elowen repair the ward in the Heart Vault and awaken a root-road leading toward the highest tower.

The next development session should begin with planning the Crown of Night and tower sequence described under **Resume here next session**.

## Playable route

There are eight finished rooms:

1. **Moonfall Glade** — meet Mosswick, collect a glowcap and moonwater, make a gleam lantern, and recover the star key.
2. **The Forgotten Orrery** — unlock the mechanism, fill its crystal basin, and return the fallen light to the sky.
3. **Dreamer's Causeway** — collect dreamdew and the broken bell shard, then investigate the sealed city gate.
4. **The Lantern Archive** — meet Sera Vale, collect silver thread, reveal the waking melody, repair and tune the chime.
5. **Lantern Court** — enter the city, collect the dawn mote and hollow prism, then combine them into a memory lens.
6. **The Hall of Names** — meet Elowen inside the mirror, use the lens in the name loom, and return her name sigil to the mirror.
7. **The Palace Atrium** — recover the broken sun disc and royal thread, repair the sun seal, and open the descent beneath the empty throne.
8. **The Heart Vault** — meet the Warden, combine star ash with living root resin, and rewrite the fractured celestial ward.

The completed story beat is: the Warden admits that he held the sky shut, the repaired ward awakens instead of merely closing, and its roots climb toward the tower after the Crown of Night finds an unknown heir.

## Core systems

- Point-and-click movement uses distance-scaled CSS transitions and a visible stepping animation.
- Rooms crossfade; major story boundaries use a full-screen poetic transition without chapter labels.
- Every room has detailed atmosphere narration on its first visit only. `state.seenRooms` prevents repeats.
- Use and Look modes share scene hotspots. Inventory objects can be used on scenery, NPCs, or each other.
- Contextual hints follow puzzle progress and briefly reveal hotspots.
- Progress auto-saves to browser `localStorage` under `moonfall-save`.
- The service worker caches the full game, artwork, and voices for offline play.
- Sound includes procedural UI, footsteps, ambient tones, and bundled NPC speech.

## Story state and saves

`game.js` owns the runtime state. Each internal chapter has a fresh-state factory:

- `freshState()` — Glade and Orrery
- `chapterTwoState(sound)` — Causeway and Archive
- `chapterThreeState(sound)` — Lantern Court and Hall of Names
- `chapterFourState(sound)` — Palace Atrium and Heart Vault

Scene transitions preserve the sound setting but deliberately start a new inventory and flag set. Older completed saves are forwarded into the next playable scene when Continue is selected, including builds that stopped after the Hall of Names.

Important completion flags are `chapterOneComplete`, `chapterTwoComplete`, `chapterThreeComplete`, and `chapterFourComplete`. The final flag reopens the current ending card on Continue.

## NPC voices

NPC speech is generated locally with the Apache-2.0-licensed Kokoro model through `kokoro-js`; the shipped game plays static MP3 files and needs no account, API key, or network connection.

Voice assignments:

- Mosswick — `bm_fable`, speed `0.90`
- Sera Vale — `bf_emma`, speed `0.98`, light spectral echo
- Elowen and the unknown city voice — `af_heart`, speed `0.96`/`0.94`, restrained memory echo
- The Warden — `am_onyx`, speed `0.88`, low chamber echo

Dialogue lookup is exact: every voiced `speaker` and `text` pair in `game.js` must exactly match an entry in `voice-lines.js`. After adding or editing voiced lines, run:

```bash
npm run generate:voices
```

Existing clips are skipped. Use `npm run generate:voices -- --force` only when intentionally replacing all performances. The first generation downloads the model to the ignored `.cache/kokoro/` directory.

## Files and assets

- `index.html` — semantic screens, scene hotspots, NPC placement, menus
- `styles.css` — scene art, responsive UI, walking/NPC animation, transitions
- `game.js` — state, puzzles, narration, dialogue, movement, sound, saves
- `voice-lines.js` — exact dialogue-to-audio manifest
- `scripts/generate-voices.mjs` — Kokoro-to-MP3 generation and voice effects
- `sw.js` — offline precache list; bump its cache version whenever shipped files change
- `server.mjs` — local static server
- `assets/` — original generated raster art, SVG UI assets, and bundled voice clips

The newest generated art is:

- `assets/lantern-court.png`
- `assets/hall-of-names.png`
- `assets/elowen.png`
- `assets/palace-atrium.png`
- `assets/heart-vault.png`
- `assets/warden.png`

All raster art was created for Moonfall from original prompts. No art from the games that inspired its presentation is included.

## Verification

Current build status (2026-09-23): `npm run check` passes, all 68 manifest voice files exist, and the new palace sequence has completed a browser playthrough through **The Crown Below** with no game-origin console errors. Migration from a Chapter III completion save into the Palace Atrium works, and resuming inside the Heart Vault does not repeat its room narration.

Run these checks before handing off a build:

```bash
npm run check
npm start
```

In the browser, verify a new game, Continue, room narration, return visits, movement speed, all inventory-combination puzzles, NPC conversations, sound-off behavior, scene transitions, and the final ending card. When a file or voice changes, also confirm the current service-worker cache version and precache list.

## Known maintenance risks

- Voiced dialogue is intentionally duplicated between `game.js` and `voice-lines.js`; punctuation changes can silently break lookup.
- The service-worker version and file list are updated manually.
- Gameplay does not yet have automated end-to-end tests.
- The current story stops when the repaired ward sends roots toward the highest tower; the Crown of Night and its heir are not yet revealed.
- Google Fonts are optional network resources. Offline play uses the serif fallback.

## Resume here next session

Start with the next seamless scene after the Heart Vault:

1. Decide the identity and motive of the Crown of Night’s heir, then outline a two-room tower puzzle arc.
2. Create the root-choked tower approach and crown chamber art, plus heir character art if the heir appears on screen.
3. Add first-visit narration, hotspots, state, puzzle interactions, contextual hints, and Elowen/Warden follow-up dialogue.
4. Continue from the roots climbing out of the Heart Vault without showing a chapter number.
5. Add new NPC dialogue to both `game.js` and `voice-lines.js`, regenerate only missing clips, and extend `sw.js`.
6. Update this document’s date, playable route, endpoint, and next resume point.
