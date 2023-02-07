import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DatePickerComponent} from './date-picker/date-picker.component';
import {TimePickerComponent} from './time-picker/time-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    TimePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
