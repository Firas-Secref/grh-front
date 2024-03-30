export class Status{
  statusId: number;
  statusName: string;
  statusColor: string;

  constructor(statusId: number, statusName: string, statusColor: string) {
    this.statusId = statusId;
    this.statusName = statusName;
    this.statusColor = statusColor;
  }
}
