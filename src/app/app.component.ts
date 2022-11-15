import { Component, VERSION, ViewChild } from '@angular/core';
import { BlindClockComponent } from './blind-clock/blind-clock.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('blindClock') blindClock: BlindClockComponent;
  blindClockTime = 120;

  togglePause() {
    if (this.blindClock.timeElapsed()) {
      this.blindClockTime = 0;
      this.blindClockTime = 120;
    }
    this.blindClock.pause();
  }
}
