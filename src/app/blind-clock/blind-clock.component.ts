import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blind-clock',
  templateUrl: './blind-clock.component.html',
  styleUrls: ['./blind-clock.component.css'],
})
export class BlindClockComponent implements OnInit {
  //TODO Implement pause
  @Input('paused') paused: boolean;
  timeRemaining: string;

  readonly TIME_FORMAT = '{0}';
  timerStart: number = Date.now();

  ngOnInit() {
    setInterval(() => {
      if (this.paused) {
        this.timerStart += 100;
      }
      if (this.timerStart !== undefined) {
        let elapsedNumeric = 120 - (Date.now() - this.timerStart) / 1000;
        if (elapsedNumeric <= 0) {
          this.timeRemaining = '00:00.0';
        } else {
          this.timeRemaining = `${this.pad(
            Math.floor(elapsedNumeric / 60)
          )}:${this.pad(elapsedNumeric % 60, 1)}`;
        }
      }
    }, 100);
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
