import {Component} from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  caller: any
  date!: Date
  selectCB!: Function

  getValues() {
    const dates: {date: Date, isDiffMonth: boolean, isToday?: boolean }[] = []

    const lastDayOfPreviousMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 0)
    const lastDayOfPreviousMonthDate = lastDayOfPreviousMonth.getDate()
    const lastDayOfCurrentMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)
    // get tile dates
    // Previous month
    if (lastDayOfPreviousMonth.getUTCDay() !== 6)
      for (let i = lastDayOfPreviousMonth.getUTCDay(); i >= 0; i--)
        dates.push({date: new Date(this.date.getFullYear(), this.date.getMonth() - 1, lastDayOfPreviousMonthDate - i), isDiffMonth: true})
    // Current month
    const d = new Date()
    const sameAsActualMonth = this.date.getFullYear() === d.getFullYear() && this.date.getMonth() === d.getMonth()
    for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
      const date = new Date(this.date.getFullYear(), this.date.getMonth() - 1, lastDayOfPreviousMonthDate + i)
      dates.push({date: date, isDiffMonth: false, isToday: sameAsActualMonth && date.getDate() === this.date.getDate()})
    }
    // Next month
    for (let i = 1; i < 7 - lastDayOfCurrentMonth.getUTCDay(); i++)
      dates.push({date: new Date(this.date.getFullYear(), this.date.getMonth(), lastDayOfCurrentMonth.getDate() + i), isDiffMonth: true})

    for (let i = 7 - lastDayOfCurrentMonth.getUTCDay(); dates.length < 42; i++) {
      dates.push({date: new Date(this.date.getFullYear(), this.date.getMonth(), lastDayOfCurrentMonth.getDate() + i), isDiffMonth: true})
    }

    return dates
  }

  open(e: any, cb: Function) {
    this.caller = e.target
    this.date = new Date()
    this.selectCB = cb
  }

  getBoxStyle() {
    return {
      left: this.caller.offsetLeft + 'px',
      top: this.caller.offsetTop + this.caller.offsetHeight + 'px'
    }
    const rect = this.caller.getBoundingClientRect();
    return {left: `${rect.left}px`, top: `${rect.bottom}px`}
  }

  select(date: Date) {
    this.caller = undefined
    this.selectCB(date)
  }

}
