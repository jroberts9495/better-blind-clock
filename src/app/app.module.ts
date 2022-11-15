import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BlindClockComponent } from './blind-clock/blind-clock.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, BlindClockComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
