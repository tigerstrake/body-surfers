// Copies the MediaPipe WASM runtime into public/ so the game runs fully offline
// (no CDN at runtime — venue wifi is unreliable).
import { cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'node_modules/@mediapipe/tasks-vision/wasm');
const dest = join(root, 'public/mediapipe/wasm');
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`copied MediaPipe wasm -> ${dest}`);
