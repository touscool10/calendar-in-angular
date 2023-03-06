import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public tabChangeEvent: EventEmitter<string> = new EventEmitter();

  constructor() {}

    emitTabChangeEvent() {
      this.tabChangeEvent.emit("Tab changed!");
    }

    getTabChangeEmitter() {
      return this.tabChangeEvent;
    }
}

