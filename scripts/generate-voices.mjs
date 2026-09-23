import { spawn } from 'node:child_process';
import { access, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { env as transformersEnv } from '@huggingface/transformers';
import { KokoroTTS } from 'kokoro-js';
import { VOICE_LINES } from '../voice-lines.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'assets', 'voices');
const force = process.argv.includes('--force');

transformersEnv.cacheDir = path.join(root, '.cache', 'kokoro');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let errors = '';
    child.stderr.on('data', chunk => { errors += chunk; });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error(errors.trim() || `${command} exited with ${code}`)));
  });
}

async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}

await mkdir(outputDirectory, { recursive: true });
console.log('Loading the local Kokoro voice model…');
const tts = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX', {
  dtype: 'q8',
  device: 'cpu'
});

for (const [index, line] of VOICE_LINES.entries()) {
  const wavPath = path.join(outputDirectory, `${line.id}.wav`);
  const mp3Path = path.join(root, line.file);
  if (!force && await exists(mp3Path)) {
    console.log(`[${index + 1}/${VOICE_LINES.length}] ${line.id} already exists`);
    continue;
  }

  console.log(`[${index + 1}/${VOICE_LINES.length}] Voicing ${line.id}`);
  const audio = await tts.generate(line.text, { voice: line.voice, speed: line.speed });
  audio.save(wavPath);

  const filter = line.speaker === 'Sera Vale'
    ? 'aecho=0.8:0.72:28:0.10,loudnorm=I=-18:LRA=7:TP=-1.5'
    : line.speaker === 'Elowen'
      ? 'aecho=0.8:0.72:22:0.06,loudnorm=I=-18:LRA=7:TP=-1.5'
    : line.speaker === 'Warden'
      ? 'aecho=0.8:0.68:42:0.09,loudnorm=I=-18:LRA=7:TP=-1.5'
    : line.speaker === 'Unknown voice'
      ? 'aecho=0.8:0.7:85:0.18,loudnorm=I=-18:LRA=7:TP=-1.5'
      : 'loudnorm=I=-18:LRA=7:TP=-1.5';

  await run('ffmpeg', [
    '-y', '-loglevel', 'error', '-i', wavPath,
    '-af', filter, '-ac', '1', '-ar', '24000', '-codec:a', 'libmp3lame', '-b:a', '64k', mp3Path
  ]);
  await rm(wavPath);
}

console.log(`Generated ${VOICE_LINES.length} local NPC voice clips in assets/voices.`);
