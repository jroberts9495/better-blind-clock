import { Component, VERSION, ViewChild } from '@angular/core';
import { BlindClockComponent } from './blind-clock/blind-clock.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('blindClock') blindClock: BlindClockComponent;
  blindClockTime = 10;

  togglePause() {
    console.log(this.blindClock.timeRemaining);
    if (this.blindClock.timeElapsed()) {
      this.blindClockTime = 0;
      this.blindClockTime = 10;
      console.log(this.blindClock.timeRemaining);
    }
    this.blindClock.pause();
  }
}
