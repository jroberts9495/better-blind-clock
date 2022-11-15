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
  //TODO Implement pause
  @Input('paused') paused: boolean;
  @Input('timer') timeRemaining: number;

  readonly UPDATE_INTERVAL: number = 100;

  timeSub = null;
  timeRemainingStr: string = '00:00.0';
  timer = null;

  start() {
    this.timer = Timer(this.UPDATE_INTERVAL, this.UPDATE_INTERVAL);
    this.timeSub = this.timer.subscribe(() => {
      this.timeRemaining = this.timeRemaining - this.UPDATE_INTERVAL;
      if (this.timeRemaining <= 0) {
        this.timeRemainingStr = '00:00.0';
      } else {
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

  ngOnChanges(changes: SimpleChanges) {
    // Reset the timer if time is 0. Remove and revamp later
    /*if (this.paused && this.timeRemaining === '00:00.0') {
      this.timerStart = Date.now() - this.UPDATE_INTERVAL;
    }*/
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
