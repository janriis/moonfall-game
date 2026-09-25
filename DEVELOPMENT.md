# Moonfall development status

Last updated: 2026-09-25

## Current phase

Chapter VII is implemented in the working tree and tracked in [GitHub issue #11](https://github.com/janriis/moonfall-game/issues/11). Players never see chapter numbers: each part flows into the next as a new scene. Liora and Elowen follow the restored compass into the moon’s wound, meet Orra in the Quiet Heart, and wake one strand of the moonlight that folded itself behind the fracture to survive an ancient tide.

Automated checks and a browser playthrough remain pending for this chapter. The next development session should follow the newly awakened moonlight, as described under **Resume here next session**.

## GitHub issue workflow

Every new chapter, feature, and bug fix must have a GitHub issue before implementation begins. Use the matching issue template and keep the issue as the source of truth for scope and progress.

1. Create the issue before changing code or assets. Record the intended outcome, scope, acceptance criteria, and verification plan.
2. Keep its checklist and comments current at meaningful milestones, including implementation, documentation, and testing.
3. Create a separate issue when an unrelated feature or bug is discovered instead of silently adding it to the current scope.
4. Reference the issue number in commits and pull requests. Use a closing reference such as `Closes #123` only in the final implementation commit.
5. Close the issue only after the work, documentation, verification, commit, and GitHub push have all succeeded.

The chapter template also covers story beats, rooms, puzzles, save migration, voices, artwork, and offline assets so a playable chapter can be followed from outline through release.

## Playable route

There are fourteen implemented rooms:

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
13. **The Wound Threshold** — look through tideglass to read the compass’s hidden road into the moon.
14. **The Quiet Heart** — let a hush-shell hear the lunar seam, join it to the tideglass as a chime, call the old tide into the basin, and awaken one strand of the moon’s sheltered light.

The current story beat is: the Warden remains in Lantern City to help it live beneath an open sky, while Liora and Elowen take a repaired star-ferry to the Moonwake Garden. The darkness crossing the moon proves to be the sheltering shadow of an eclipse flower. Its protected moonseed joins the restored stars and reveals a silver-black wound. Inside the moon, the companions learn that its light folded inward to survive a wild ancient tide. Orra, a lunar moth caretaker, helps them awaken one strand without forcing the rest of the source open.

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
- `chapterSevenState(sound)` — Wound Threshold and Quiet Heart

Scene transitions preserve the sound setting but deliberately start a new inventory and flag set. Older completed saves are forwarded into the next playable scene when Continue is selected, including builds that stopped after the Hall of Names.

Important completion flags are `chapterOneComplete` through `chapterSevenComplete`. The current chapter’s completion flag reopens its ending card on Continue. Completed Chapter VI saves migrate directly into the Wound Threshold; the migration preserves sound preference and starts Chapter VII with its moonseed companion.

## NPC voices

NPC speech is generated locally with the Apache-2.0-licensed Kokoro model through `kokoro-js`; the shipped game plays static MP3 files and needs no account, API key, or network connection.

Voice assignments:

- Mosswick — `bm_fable`, speed `0.90`
- Sera Vale — `bf_emma`, speed `0.98`, light spectral echo
- Elowen and the unknown city voice — `af_heart`, speed `0.96`/`0.94`, restrained memory echo
- The Warden — `am_onyx`, speed `0.88`, low chamber echo
- Orra — `bf_emma`, speed `0.92`

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
- `assets/moon-wound-threshold.png`
- `assets/quiet-heart.png`
- `assets/orra.png`

All raster art was created for Moonfall from original prompts. No art from the games that inspired its presentation is included.

## Verification

Current build status (2026-09-25): Chapter VII code, original scene art, Orra sprite, and 145 bundled voice clips are present. The chapter has not yet had its syntax check or browser playthrough; verify Chapter VI save migration, both lunar puzzles, mid-chapter autosave, return visits, sound-off behavior, Chapter VII ending Continue, and offline assets before closing issue #11.

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
- Chapter VII currently ends after awakening one strand of the moon’s sheltered light. The wider lunar source and the cost of restoring it remain unresolved.
- Google Fonts are optional network resources. Offline play uses the serif fallback.

## Resume here next session

Start with the next seamless scene after the Quiet Heart:

1. Decide what waking one strand changes in Lantern City and whether the moonseed can remain inside the lunar source.
2. Shape Chapter VIII around the wider source of the moonlight and the risk of bringing it fully awake.
3. Complete the syntax check and browser playthrough recorded in issue #11; update its checklist before closing it.
4. Carry the current story forward with a seamless transition, fresh state, save migration, original art, voices, and offline cache entries.
5. Update this document's route and next-session handoff as the chapter progresses.
