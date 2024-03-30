import {Request} from "./Request";

export class RequestResp extends Request{

  statusName: string;
  statusId: number;
  statusColor: string;
  userFirstname: string;
  userLastname: string;

  constructor(requestTitle: string, deadLine: Date, description: string, urgent: boolean, postRequired: string, statusName: string, statusId: number, statusColor: string, userFirstname: string, userLastname: string) {
    super(requestTitle, deadLine, description, urgent, postRequired);
    this.statusName = statusName;
    this.statusId = statusId;
    this.statusColor = statusColor;
    this.userFirstname = userFirstname;
    this.userLastname = userLastname;
  }
}
