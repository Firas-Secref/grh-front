import {Component, Input, OnInit} from '@angular/core';
import {requestStatusFilterDropDown, status} from "../../../../../core/canstants/canstants";
import {RequestResp} from "../../../../../core/model/RequestResp";
import {Status} from "../../../../../core/model/Status";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'app-request-menu-status',
  templateUrl: './request-menu-status.component.html',
  styleUrls: ['./request-menu-status.component.scss']
})
export class RequestMenuStatusComponent implements OnInit {

  statusOptions: any[] = requestStatusFilterDropDown;
  @Input()request!: RequestResp;
  status: any = status

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
  }

  updateRequestStatus(newStatus: Status, request: any) {
    console.log(newStatus, request)
    const reqStatus = newStatus.statusName
    console.log(reqStatus)
    console.log(this.status[reqStatus])
    this.requestService.updateRequestStatus(request.requestId, this.status[reqStatus]).subscribe(req=>{
      console.log("updated")
      this.request.statusColor = newStatus.statusColor
    })
  }
}
