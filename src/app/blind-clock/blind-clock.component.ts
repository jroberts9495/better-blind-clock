import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { timer as Timer } from 'rxjs';

@Component({
  selector: 'app-blind-clock',
  templateUrl: './blind-clock.component.html',
  styleUrls: ['./blind-clock.component.css'],
})
export class BlindClockComponent implements OnInit, OnChanges {
  @Input('timer') timeRemaining: number;

  private readonly UPDATE_INTERVAL: number = 100;

  private timeSub = null;
  private timer = null;
  timeRemainingStr: string;

  start() {
    this.timer = Timer(this.UPDATE_INTERVAL, this.UPDATE_INTERVAL);
    this.timeSub = this.timer.subscribe(() => {
      if (this.timeRemaining <= 0) {
        this.timeRemainingStr = '00:00.0';
      } else {
        this.timeRemaining = this.timeRemaining - this.UPDATE_INTERVAL / 1000;
        this.timeRemainingStr = `${this.pad(
          Math.floor(this.timeRemaining / 60)
        )}:${this.pad(this.timeRemaining % 60, 1)}`;
      }
    });
  }

  pause() {
    if (this.timer) {
      this.timeSub.unsubscribe();
      this.timer = null;
    } else {
      this.start();
    }
  }

  timeLeft(): number {
    return this.timeRemaining;
  }

  timeElapsed(): boolean {
    return this.timeRemaining <= 0;
  }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit() {
    this.timeRemainingStr = `${this.pad(
      Math.floor(this.timeRemaining / 60)
    )}:${this.pad(this.timeRemaining % 60, 1)}`;
  }

  constructor() {}

  private pad(input: number, numDecimals?: number): string {
    if (numDecimals === undefined) {
      numDecimals = 0;
    }
    if (input < 10) {
      return `0${input.toFixed(numDecimals)}`;
    } else {
      return `${input.toFixed(numDecimals)}`;
    }
  }
}
