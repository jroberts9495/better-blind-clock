import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-blind-clock',
  templateUrl: './blind-clock.component.html',
  styleUrls: ['./blind-clock.component.css'],
})
export class BlindClockComponent implements OnInit, OnChanges {
  //TODO Implement pause
  @Input('paused') paused: boolean;
  @Input('timer') timer: number;

  readonly UPDATE_INTERVAL: number = 100;

  timeRemaining: string;
  timerStart: number = Date.now();

  ngOnChanges() {
    // Reset the timer if time is 0. Remove and revamp later
    if (this.paused && this.timeRemaining === '00:00.0') {
      this.timerStart = Date.now() - this.UPDATE_INTERVAL;
    }
  }

  ngOnInit() {
    setInterval(() => {
      if (this.paused) {
        this.timerStart += this.UPDATE_INTERVAL;
      }
      if (this.timerStart !== undefined) {
        let elapsedNumeric = this.timer - (Date.now() - this.timerStart) / 1000;
        if (elapsedNumeric <= 0) {
          this.timeRemaining = '00:00.0';
        } else {
          this.timeRemaining = `${this.pad(
            Math.floor(elapsedNumeric / 60)
          )}:${this.pad(elapsedNumeric % 60, 1)}`;
        }
      }
    }, this.UPDATE_INTERVAL);
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
