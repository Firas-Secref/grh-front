export class Event{
  eventStartDate: string;
  eventEndDate: string;
  eventType: string;
  eventName: string;

  constructor(eventStartDate: string, eventEndDate: string, eventType: string, eventName: string) {
    this.eventStartDate = eventStartDate;
    this.eventEndDate = eventEndDate;
    this.eventType = eventType;
    this.eventName = eventName;
  }
}
