export class Request{
  requestTitle: string;
  deadLine: Date;
  description: string;
  urgent: boolean;
  postRequired: string;

  constructor(requestTitle: string, deadLine: Date, description: string, urgent: boolean, postRequired: string) {
    this.requestTitle = requestTitle;
    this.deadLine = deadLine;
    this.description = description;
    this.urgent = urgent;
    this.postRequired = postRequired;
  }
}
