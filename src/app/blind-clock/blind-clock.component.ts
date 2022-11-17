import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, takeWhile, timer as Timer } from 'rxjs';

@Component({
  selector: 'app-blind-clock',
  templateUrl: './blind-clock.component.html',
  styleUrls: ['./blind-clock.component.css'],
})
export class BlindClockComponent implements OnInit, OnChanges {
  @Input('timer') timeRemaining: number;

  private readonly UPDATE_INTERVAL: number = 10;

  private timeSub = null;
  private timer = null;
  private timerObservable = new Subject<number>();
  timeRemainingStr: string;

  start() {
    this.timer = Timer(this.UPDATE_INTERVAL, this.UPDATE_INTERVAL);
    this.timeSub = this.timer
      .pipe(takeWhile(() => !this.timeElapsed()))
      .subscribe(() => {
        this.timeRemaining = this.timeRemaining - this.UPDATE_INTERVAL / 1000;
        if (this.timeRemaining <= 0) {
          this.timeRemainingStr = '00:00.0';
          this.timerObservable.next(0);
        } else {
          this.timeRemainingStr = `${this.pad(
            Math.floor(this.timeRemaining / 60)
          )}:${this.pad(this.timeRemaining % 60, 1)}`;
          this.timerObservable.next(this.timeRemaining);
        }
      });
  }

  pause() {
    if (this.timer) {
      if (!this.timeSub.closed) {
        this.timeSub.unsubscribe();
      }
      this.timer = null;
    } else {
      this.start();
    }
  }

  timeLeft(): number {
    return this.timeRemaining;
  }

  getTimeLeftSub() {
    return this.timerObservable;
  }

  // TODO Make a subscription?
  timeElapsed(): boolean {
    return this.timeRemaining <= 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.timeRemainingStr = `${this.pad(
      Math.floor(this.timeRemaining / 60)
    )}:${this.pad(this.timeRemaining % 60, 1)}`;
    // TODO Errors for change after check
    this.timerObservable.next(this.timeRemaining);
  }

  ngOnInit() {}

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
