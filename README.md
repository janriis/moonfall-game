# Moonfall

**Moonfall: The Light Beneath the Roots** is an original, compact point-and-click fantasy adventure told across connected scenes. It takes inspiration from the warm, theatrical presentation and inventory puzzles of early-1990s adventure games while using an original world, story, character, and art.

The story follows Liora into Moonfall Glade to return a fallen star to the sky, then flows seamlessly across the Dreamer's Causeway and into the Lantern Archive. Beyond the city gate, Lantern Court and the Hall of Names lead her to the sister she thought she had lost—and together they descend beneath the palace to learn who closed the sky.

Along the way, Liora can speak with Mosswick, the eccentric keeper of Moonfall Glade; Sera Vale, a spectral archivist; Elowen, a wayfinder trapped inside the city’s memory mirror; and the Warden, an ancient royal astronomer bound beneath the palace. Their advice changes as the puzzles progress.

Mosswick, Sera Vale, Elowen, and the Warden are fully voiced. Their performances are generated locally with the Apache-2.0-licensed [Kokoro](https://github.com/hexgrad/kokoro) model and bundled with the game; playback requires no account, API key, or network connection.

Every location introduces itself on its first visit with atmospheric narration describing its layout, light, sounds, scents, and mood. Returning to an already visited room resumes play immediately.

## Run on a Mac

1. Install [Node.js](https://nodejs.org/) 18 or newer if it is not already installed.
2. Open Terminal in this folder.
3. Run `npm start`.
4. Open <http://localhost:4173>.

Run `npm run check` for a quick JavaScript syntax check.

No package installation or internet connection is required. For the intended typography, an internet connection loads two optional Google Fonts; the game falls back to built-in serif fonts when offline.

Development status, story state, architecture notes, verification steps, and the precise next-session handoff are maintained in [DEVELOPMENT.md](DEVELOPMENT.md).

To regenerate the NPC performances, run `npm install` followed by `npm run generate:voices`. The first generation downloads the open Kokoro model into the ignored `.cache/` directory. Existing clips are preserved unless you run `npm run generate:voices -- --force`.

## How to play

- Click scenery to walk to and interact with it.
- Choose **Look** to inspect something.
- Click an inventory object, then click scenery to use it.
- Click one inventory object and then another to combine them.
- Press **H** or use **Hint** if you get stuck.
- Progress saves automatically in the browser.

## Move to another platform

Copy this entire folder to any computer with Node.js and run `npm start`. The game also works from any static web host because it has no server-side code. Its web-app manifest and service worker make it installable and offline-capable in supported browsers.

For a native `.app`, `.exe`, or Linux package later, wrap this same folder with Tauri or Electron; the game code does not need to change.

## Project structure

- `index.html` — accessible game layout and scenes
- `styles.css` — responsive presentation and animation
- `game.js` — story state, puzzles, inventory, audio, and saving
- `voice-lines.js` — stable NPC dialogue-to-audio manifest
- `scripts/generate-voices.mjs` — local Kokoro voice-generation pipeline
- `assets/` — original generated artwork and code-native UI art
- `server.mjs` — tiny zero-dependency local server
- `sw.js` — offline cache

## Art direction

The raster assets were generated specifically for this project from original prompts: Moonfall Glade, the Forgotten Orrery, the Dreamer's Causeway, the Lantern Archive, Lantern Court, the Hall of Names, the Palace Atrium, the Heart Vault, Liora, Mosswick, Sera Vale, Elowen, and the Warden. No original game assets are included.
