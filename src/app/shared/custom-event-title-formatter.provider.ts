import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  // you can override any of the methods defined in the parent class

  month(event: any): string {
    return `${event.title}  &nbsp;&nbsp;  ${event.from} &nbsp;&nbsp;  ${event.to} &nbsp;&nbsp; ${event.period} &nbsp;&nbsp; ${event.DoctorName}`;
  }

  week(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'h:m a',
      this.locale
    )}</b> ${event.title}`;
  }

  day(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'h:m a',
      this.locale
    )}</b> ${event.title}`;
  }
}
