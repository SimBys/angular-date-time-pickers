import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

type CB = (selectedHour: number, selectedMinute: number) => void

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent {
  @Input() onSelectCB?: CB;
  isOpen = false
  selectedHour?: number
  selectedMinute?: number
  hours = Array.from({length: 24}, (_, i) => i)
  minutes = Array.from({length: 12}, (_, i) => i * 5)
  // if changed since opening
  hourChanged = false
  minuteChanged = false

  @ViewChild('inputHours') inputHours!: ElementRef
  @ViewChild('inputMinutes') inputMinutes!: ElementRef
  @ViewChild('base') base!: ElementRef

  open() {
    if (this.isOpen)
      return
    this.isOpen = true

    this.hourChanged = false
    this.minuteChanged = false

    this.inputHours.nativeElement.focus()
    this.inputHours.nativeElement.select()
  }

  close() {
    this.isOpen = false
    this.onSelectCB?.(this.selectedHour!, this.selectedMinute!)
    this.inputMinutes.nativeElement.blur()
  }

  getBoxStyle() {
    // const caller = this.base.nativeElement
    const caller = document.getElementById('test-id')!
    // this.base.nativeElement.left = '100px'
    return {
      left: caller.offsetLeft + 'px',
      top: caller.offsetTop + this.base.nativeElement.offsetHeight + 'px'
    }
  }

  selectHour(value: number) {
    this.selectedHour = value
    this.hourChanged = true
    if (this.minuteChanged)
      this.close()
  }

  selectMinute(value: number) {
    this.selectedMinute = value
    this.minuteChanged = true
    if (this.hourChanged)
      this.close()
  }

  onSelectionChanged() {
    if (this.hourChanged && this.minuteChanged) {
      this.onSelectCB?.(this.selectedHour!, this.selectedMinute!)
      this.isOpen = false
    }
  }

  selectAll(e: any) {
    console.log('ctrl + a')
    console.log(e)

  }

  inputHoursKeyDown(e: any) {
    // console.log(e)

    e.preventDefault()

    if (isNaN(e.key) || !this.selectedHour && e.key === 'Backspace') {
      if (e.key === 'Tab') {
        this.inputMinutes.nativeElement.focus()
        this.inputMinutes.nativeElement.select()
      }
      return
    }

    const value = parseInt(e.key)

    if (!this.selectedHour) {
      this.selectedHour = value
      return;
    }

    this.selectedHour = this.selectedHour! * 10 + value

    if(this.selectedHour! > 23)
      this.selectedHour = value

    if (this.selectedHour > 9)
      this.inputMinutes.nativeElement.focus()
  }

  inputMinutesKeyDown(e: any) {
      e.preventDefault()

    if (isNaN(e.key) || !this.selectedMinute && e.key === 'Backspace') {
      if (e.key === 'Tab' || e.key === 'Enter')
        this.close()
      return
    }

    const value = parseInt(e.key)

    if (!this.selectedMinute) {
      this.selectedMinute = value
      return;
    }

    this.selectedMinute = this.selectedMinute! * 10 + value

    if(this.selectedMinute! > 59)
      this.selectedMinute = value

    if (this.selectedMinute > 9)
      this.close()
  }

  inputHoursMouseDown(e: any) {
    e.preventDefault()
    this.inputHours.nativeElement.select()
  }

  inputMinutesMouseDown(e: any) {
    e.preventDefault()
    if (this.isOpen)
      this.inputMinutes.nativeElement.select()
  }
}
