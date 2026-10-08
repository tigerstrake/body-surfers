// Shared building blocks for the screen views.
import type { UICommand, UIModel } from '../../shared/types';
import { GAME_TITLE } from '../../shared/constants';
import { h, svg } from '../dom';
import { PICTOS, type PictoKind } from '../icons';

export type Emit = (c: UICommand) => void;

export interface ScreenView {
  readonly root: HTMLElement;
  /** Called every frame while the screen is active. */
  update(m: UIModel, now: number, dt: number): void;
  /** Called when the screen becomes active (before the first update). */
  enter?(m: UIModel): void;
  /** Called when the screen stops being active. */
  leave?(): void;
}

/** Two-line chunky logo built from GAME_TITLE (split at the last space). */
export function makeLogo(extra = ''): HTMLElement {
  const i = GAME_TITLE.lastIndexOf(' ');
  const a = i > 0 ? GAME_TITLE.slice(0, i) : GAME_TITLE;
  const b = i > 0 ? GAME_TITLE.slice(i + 1) : '';
  const logo = h('div', `bs-logo ${extra}`.trim(), h('span', 'bs-logo__a', a), b ? h('span', 'bs-logo__b', b) : null);
  logo.setAttribute('role', 'img');
  logo.setAttribute('aria-label', GAME_TITLE);
  return logo;
}

export function kbd(label: string, extra = ''): HTMLElement {
  return h('kbd', `bs-kbd ${extra}`.trim(), label);
}

export function picto(kind: PictoKind, extra = ''): HTMLElement {
  const s = h('span', `bs-picto bs-picto--${kind} ${extra}`.trim());
  s.append(svg(PICTOS[kind]));
  return s;
}

/** Big chunky outlined display text. */
export function display(tag: 'div' | 'h1' | 'h2' | 'span' | 'p', cls: string, text = ''): HTMLElement {
  return h(tag, `bs-display ${cls}`.trim(), text);
}
