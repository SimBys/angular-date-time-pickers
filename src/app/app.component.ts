import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'test';
  @ViewChild('testID') testElement!: ElementRef

  ngAfterViewInit(): void {
    console.log(this.testElement)
  }

  test(hour: number, minute: number) {
    console.log(hour)
    console.log(minute)
  }
}
