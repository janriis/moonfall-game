/**
 * Bumps the service worker cache version and asset cache-busting query
 * parameters using the current git commit SHA.
 *
 * Run before deploying:  npm run bump-version
 *
 * This replaces the manual version number in three places:
 *   1. sw.js        — CACHE constant
 *   2. sw.js        — ?v=NN query strings in the FILES array
 *   3. index.html   — ?v=NN query strings on <link> and <script> tags
 *
 * The git short SHA is deterministic and changes on every commit, so
 * users always get a fresh cache when content changes — no manual
 * version bumping required.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function gitSha() {
  try {
    return execSync('git rev-parse --short HEAD', { cwd: root, encoding: 'utf-8' }).trim();
  } catch {
    // Fall back to a timestamp if not in a git repo
    return Date.now().toString(36);
  }
}

const version = gitSha();
const cacheName = `moonfall-${version}`;

async function bumpSwJs() {
  const file = path.join(root, 'sw.js');
  let content = await readFile(file, 'utf-8');
  // Replace CACHE constant — handles 'moonfall-vNN' or 'moonfall-<sha>' formats
  content = content.replace(
    /const CACHE='moonfall-[^']+';/,
    `const CACHE='${cacheName}';`
  );
  // Replace all ?v=NN or ?v=<sha> query strings
  content = content.replace(/\?v=[a-z0-9]+/g, `?v=${version}`);
  await writeFile(file, content, 'utf-8');
  console.log(`  sw.js: CACHE='${cacheName}', ?v=${version}`);
}

async function bumpIndexHtml() {
  const file = path.join(root, 'index.html');
  let content = await readFile(file, 'utf-8');
  // Replace all ?v=NN or ?v=<sha> query strings on stylesheets and scripts
  content = content.replace(/\?v=[a-z0-9]+/g, `?v=${version}`);
  await writeFile(file, content, 'utf-8');
  console.log(`  index.html: ?v=${version}`);
}

console.log(`Bumping cache version to git SHA: ${version}`);
await bumpSwJs();
await bumpIndexHtml();
console.log('Done. Commit the updated files before deploying.');