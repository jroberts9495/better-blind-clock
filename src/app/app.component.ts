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
    if (this.blindClock.timeElapsed()) {
      //TODO This is BAD, gotta figure out the proper way to trigger changes.
      this.blindClockTime = this.blindClockTime + 0.00001;
    }
    this.blindClock.pause();
  }
}
