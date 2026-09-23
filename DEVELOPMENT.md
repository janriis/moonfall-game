# Moonfall development status

Last updated: 2026-09-23

## Current phase

The game is a complete browser-playable vertical slice through six internal story chapters. Players never see chapter numbers: each part flows into the next as a new scene. The current build ends after Liora and Elowen follow the restored celestial compass beyond Lantern City, release a sheltered moonseed, and discover a fracture across the moon.

The next development session should follow the compass into the newly revealed moon wound, as described under **Resume here next session**.

## GitHub issue workflow

Every new chapter, feature, and bug fix must have a GitHub issue before implementation begins. Use the matching issue template and keep the issue as the source of truth for scope and progress.

1. Create the issue before changing code or assets. Record the intended outcome, scope, acceptance criteria, and verification plan.
2. Keep its checklist and comments current at meaningful milestones, including implementation, documentation, and testing.
3. Create a separate issue when an unrelated feature or bug is discovered instead of silently adding it to the current scope.
4. Reference the issue number in commits and pull requests. Use a closing reference such as `Closes #123` only in the final implementation commit.
5. Close the issue only after the work, documentation, verification, commit, and GitHub push have all succeeded.

The chapter template also covers story beats, rooms, puzzles, save migration, voices, artwork, and offline assets so a playable chapter can be followed from outline through release.

## Playable route

There are twelve finished rooms:

1. **Moonfall Glade** — meet Mosswick, collect a glowcap and moonwater, make a gleam lantern, and recover the star key.
2. **The Forgotten Orrery** — unlock the mechanism, fill its crystal basin, and return the fallen light to the sky.
3. **Dreamer's Causeway** — collect dreamdew and the broken bell shard, then investigate the sealed city gate.
4. **The Lantern Archive** — meet Sera Vale, collect silver thread, reveal the waking melody, repair and tune the chime.
5. **Lantern Court** — enter the city, collect the dawn mote and hollow prism, then combine them into a memory lens.
6. **The Hall of Names** — meet Elowen inside the mirror, use the lens in the name loom, and return her name sigil to the mirror.
7. **The Palace Atrium** — recover the broken sun disc and royal thread, repair the sun seal, and open the descent beneath the empty throne.
8. **The Heart Vault** — meet the Warden, combine star ash with living root resin, and rewrite the fractured celestial ward.
9. **The Rootspire Approach** — learn that Elowen is the Crown's lost heir, bind stormglass with living root, and use the compass to open the highest tower.
10. **The Crown Chamber** — combine nightglass with a dawn petal, reveal the circlet's first design, and free its captive constellations without enthroning Elowen.
11. **The Starway Crossing** — leave the Warden to help the waking city, repair an ancient star-ferry sail, and follow the celestial compass beyond every royal map.
12. **The Moonwake Garden** — combine a singing moon reed with an echo shell, gently open the eclipse flower, and learn that its shadow protected a moonseed from the fracture behind it.

The completed story beat is: the Warden remains in Lantern City to help it live beneath an open sky, while Liora and Elowen take a repaired star-ferry to the Moonwake Garden. The darkness crossing the moon proves to be the sheltering shadow of an eclipse flower. When a mooncall coaxes it open, its protected seed joins the restored stars and reveals a silver-black wound across the moon. The celestial compass points directly inside.

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
- `chapterFiveState(sound)` — Rootspire Approach and Crown Chamber
- `chapterSixState(sound)` — Starway Crossing and Moonwake Garden

Scene transitions preserve the sound setting but deliberately start a new inventory and flag set. Older completed saves are forwarded into the next playable scene when Continue is selected, including builds that stopped after the Hall of Names.

Important completion flags are `chapterOneComplete` through `chapterSixComplete`. The final flag reopens the current ending card on Continue. Completed Chapter V saves from the previous build migrate directly into the Starway Crossing.

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
- `sw.js` — offline precache list; run `npm run bump-version` to auto-set the cache version from the current git SHA before deploying
- `server.mjs` — local static server
- `assets/` — original generated raster art, SVG UI assets, and bundled voice clips

The newest generated art is:

- `assets/lantern-court.png`
- `assets/hall-of-names.png`
- `assets/elowen.png`
- `assets/palace-atrium.png`
- `assets/heart-vault.png`
- `assets/warden.png`
- `assets/rootspire-approach.png`
- `assets/crown-chamber.png`
- `assets/starway-crossing.png`
- `assets/moonwake-garden.png`

All raster art was created for Moonfall from original prompts. No art from the games that inspired its presentation is included.

## Verification

Current build status (2026-09-23): `npm run check` passes, all 120 manifest voice files exist, and the moon-shadow sequence has completed a browser playthrough through **The Wound Above**. Migration from a Chapter V completion save into the Starway Crossing works, both new puzzles complete normally, and Continue reopens the Chapter VI ending after a reload.

Run these checks before handing off a build:

```bash
npm run check
npm start
```

In the browser, verify a new game, Continue, room narration, return visits, movement speed, all inventory-combination puzzles, NPC conversations, sound-off behavior, scene transitions, and the final ending card. When a file or voice changes, also confirm the current service-worker cache version and precache list.

## Known maintenance risks

- Voiced dialogue is intentionally duplicated between `game.js` and `voice-lines.js`; punctuation changes can silently break lookup.
- The service-worker version is auto-generated from git SHA via `npm run bump-version`; run it before deploying.
- Gameplay does not yet have automated end-to-end tests.
- The current story stops when the moonseed reveals a fracture across the moon and the restored celestial compass points inside it.
- Google Fonts are optional network resources. Offline play uses the serif fallback.

## Resume here next session

Start with the next seamless scene after the Moonwake Garden:

1. Decide what fractured the moon, what survives inside the wound, and why the original celestial compass recognizes it as a road.
2. Outline a two-room lunar interior arc, beginning at the wound's threshold and ending at the source of the missing moonlight.
3. Decide whether the moonseed travels with Liora and Elowen as a light, guide, or new character.
4. Create the new lunar environment art and any character or creature art required by the reveal.
5. Add first-visit narration, hotspots, fresh chapter state, puzzle interactions, contextual hints, dialogue, voices, and offline assets.
6. Preserve the seamless transition, migrate Chapter VI completion saves forward, and update this document's route and resume point.
