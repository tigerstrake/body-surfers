// All player-facing copy + number formatting for the UI.
import type { PositioningHint, PowerUpKind, TutorialHint, VisionStatus } from '../shared/types';

export const fmtScore = (n: number): string => String(Math.max(0, Math.floor(n)));
export const fmtGrouped = (n: number): string => Math.max(0, Math.floor(n)).toLocaleString('en-US');
export const fmtDistance = (m: number): string => `${fmtGrouped(m)} m`;
export const fmtTime = (s: number): string => {
  const t = Math.max(0, Math.floor(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
};

/** Lobby chip copy for positioning hints. `left`/`right` are screen directions. */
export const HINT_COPY: Record<PositioningHint, { title: string; sub: string }> = {
  'too-close': { title: 'Step back a bit', sub: "You're too close to the camera" },
  'too-far': { title: 'Come a bit closer', sub: 'We can barely see you' },
  'move-left': { title: 'Scoot left a little', sub: 'Make room for the side lanes' },
  'move-right': { title: 'Scoot right a little', sub: 'Make room for the side lanes' },
  'head-cut-off': { title: 'Keep your head in view', sub: 'Step back or tilt the screen back' },
  'low-visibility': { title: 'Find some light', sub: 'Face a lamp or a window' },
};

export interface TutorialCopy {
  label: string;
  /** Keyboard keys to show under the banner, per keyboard layout. */
  keys1p: string[];
  keysP1: string[];
  keysP2: string[];
}

export const TUTORIAL_COPY: Record<TutorialHint, TutorialCopy> = {
  jump: { label: 'JUMP!', keys1p: ['↑', 'W', 'SPACE'], keysP1: ['W', 'SPACE'], keysP2: ['↑'] },
  duck: { label: 'SQUAT!', keys1p: ['↓', 'S', 'SHIFT'], keysP1: ['S', 'L-SHIFT'], keysP2: ['↓', 'R-SHIFT'] },
  left: { label: 'STEP LEFT', keys1p: ['←', 'A'], keysP1: ['A'], keysP2: ['←'] },
  right: { label: 'STEP RIGHT', keys1p: ['→', 'D'], keysP1: ['D'], keysP2: ['→'] },
  switch: { label: 'SWITCH LANE', keys1p: ['←', '→'], keysP1: ['A', 'D'], keysP2: ['←', '→'] },
};

export const POWERUP_LABEL: Record<PowerUpKind, string> = {
  magnet: 'MAGNET',
  multiplier: '2X SCORE',
  sneakers: 'SUPER SNEAKERS',
  hoverboard: 'HOVERBOARD',
  jetpack: 'JETPACK',
  slowmo: 'SLOW-MO',
  star: 'STAR POWER',
  coinRain: 'COIN RAIN',
};

/** Short callout shown in the top callout stack when a power-up starts. */
export const POWERUP_TOAST: Record<PowerUpKind, string> = {
  magnet: 'MAGNET!',
  multiplier: '2X SCORE!',
  sneakers: 'SUPER SNEAKERS!',
  hoverboard: 'HOVERBOARD!',
  jetpack: 'JETPACK!',
  slowmo: 'SLOW-MO!',
  star: 'STAR POWER!',
  coinRain: 'COIN RAIN!',
};

/** Kinds that get the top callout pop (the originals already have world/toast feedback). */
export const POWERUP_POP: ReadonlySet<PowerUpKind> = new Set<PowerUpKind>(['jetpack', 'slowmo', 'star', 'coinRain']);

export const POWERUP_ORDER: readonly PowerUpKind[] = [
  'star',
  'jetpack',
  'hoverboard',
  'slowmo',
  'magnet',
  'multiplier',
  'sneakers',
  'coinRain',
];

export const CAMERA_STATUS_COPY: Record<VisionStatus, string> = {
  idle: 'CAMERA OFF',
  'loading-model': 'LOADING…',
  'model-ready': 'CAMERA OFF',
  'starting-camera': 'STARTING CAMERA…',
  running: 'WAITING FOR VIDEO…',
  error: 'CAMERA UNAVAILABLE',
};

/** Turn a raw getUserMedia / MediaPipe error into something a passer-by can act on. */
export function friendlyError(raw: string): { title: string; body: string } {
  const e = raw.toLowerCase();
  if (/notallowed|denied|permission|security/.test(e)) {
    return {
      title: 'CAMERA BLOCKED',
      body: 'Click the camera icon in the address bar, choose "Allow", then try again.',
    };
  }
  if (/notfound|not found|no camera|devicesnotfound|overconstrained/.test(e)) {
    return { title: 'NO CAMERA FOUND', body: 'Plug in a webcam (or pick another one in Settings), then try again.' };
  }
  if (/notreadable|in use|could not start|trackstart|busy|abort/.test(e)) {
    return {
      title: 'CAMERA IS BUSY',
      body: 'Another app is using the camera. Quit Zoom, FaceTime or Photo Booth, then try again.',
    };
  }
  if (/model|wasm|fetch|network|load/.test(e)) {
    return { title: "BODY TRACKING DIDN'T LOAD", body: 'Reload the page. If it keeps happening, play with the keyboard.' };
  }
  return { title: 'CAMERA TROUBLE', body: 'Check the camera and try again, or play with the keyboard.' };
}

export const BOOT_TIPS: readonly string[] = [
  'Allow camera access when the browser asks',
  'Close other apps that use the camera',
  'Face a light so we can see you',
];
