import { Component, VERSION, ViewChild } from '@angular/core';
import { BlindClockComponent } from './blind-clock/blind-clock.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('blindClock') blindClock: BlindClockComponent;
  name = 'Angular ' + VERSION.major;

  togglePause() {
    this.blindClock.pause();
  }
}
