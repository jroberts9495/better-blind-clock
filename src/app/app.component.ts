import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BlindClockComponent } from './blind-clock/blind-clock.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('blindClock') blindClock: BlindClockComponent;
  blindClockTime = 10;
  shift = 0;

  ngAfterViewInit() {
    this.blindClock.getTimeLeftSub().subscribe((timeLeft) => {
      this.shift =
        90 / (1 + Math.exp(5 * (timeLeft - 0.05 * this.blindClockTime)));
    });
  }

  togglePause() {
    if (this.blindClock.timeElapsed()) {
      //TODO This is BAD, gotta figure out the proper way to trigger changes.
      this.blindClockTime = this.blindClockTime + 0.00001;
    }
    this.blindClock.pause();
  }
}
