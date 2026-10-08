// Fixed-step accumulator (§2.1) and frame statistics.
import { SIM_DT } from '../shared/constants';
import { APP } from './config';

export class FixedStepper {
  private acc = 0;
  /** Tolerance so 1/60 s frames reliably yield 2 × 1/120 s steps despite float error. */
  private readonly eps: number;

  constructor(
    readonly step: number = SIM_DT,
    readonly maxSteps: number = APP.maxSubSteps,
  ) {
    this.eps = step * 1e-6;
  }

  /**
   * Add real time and return how many fixed steps to simulate now (≤ maxSteps).
   * Time beyond maxSteps is dropped (the game slows down instead of spiralling).
   */
  advance(dt: number): number {
    if (!(dt > 0)) return 0;
    this.acc += dt;
    let n = 0;
    while (this.acc + this.eps >= this.step && n < this.maxSteps) {
      this.acc -= this.step;
      n++;
    }
    if (this.acc < 0) this.acc = 0;
    if (n === this.maxSteps && this.acc > this.step) this.acc = this.step;
    return n;
  }

  /** Leftover time (s) not yet simulated. */
  get pending(): number {
    return this.acc;
  }

  reset(): void {
    this.acc = 0;
  }
}

/** Exponential moving averages for the debug overlay. */
export class FrameStats {
  private dtAvg = 1 / 60;
  frameMs = 0;

  get fps(): number {
    return this.dtAvg > 0 ? 1 / this.dtAvg : 0;
  }

  /** Real (uncapped) seconds since the previous frame. */
  tick(dtRaw: number): void {
    if (dtRaw > 0 && dtRaw < 1) this.dtAvg += (dtRaw - this.dtAvg) * 0.05;
  }

  /** Milliseconds of main-thread work spent in the frame. */
  work(ms: number): void {
    if (ms >= 0) this.frameMs += (ms - this.frameMs) * 0.1;
  }
}
