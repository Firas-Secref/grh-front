import {Component, OnInit, ViewChild} from '@angular/core';
import {days, months, requestStatusFilterDropDown, status, testUser, years} from "../../../../core/canstants/canstants";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Request} from "../../../../core/model/Request";
import {RequestService} from "../services/request.service";
import {map, mergeMap} from "rxjs/operators";
import {Department} from "../../../../core/model/Department";
import {RequestResp} from "../../../../core/model/RequestResp";
import {Status} from "../../../../core/model/Status";
import {MatMenuTrigger} from "@angular/material/menu";

import * as Stomp from 'stompjs';
// @ts-ignore
import * as SockJS from 'sockjs-client';
import {maxHeaderSize} from "http";
import { UserService } from '../../users-feature/services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { log } from 'console';
import { NotificationUser } from 'src/app/core/model/NotificationReq';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { SocketService } from 'src/app/shared/services/socket.service';
interface Message {
  name: string; message: string; type: string;
}

interface MessageCount {
  messagecount: number; type: string;
}
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  displayModal!: boolean;
  feedBacks: boolean = false;
  display: boolean = false;
  days = days
  months = months
  years = years
  requestForm!: UntypedFormGroup;
  department!: Department;
  requests!: RequestResp[];
  statusOptions = requestStatusFilterDropDown;
  newStatusForUpdate!: Status;
  requestToUpdateId!: number;
  @ViewChild('menuTrigger') statusMenu!: MatMenuTrigger;

  greetings: string[] = [];
  disabled = true;
  name!: string;
  helper = new JwtHelperService()
  username!: string;
  currentUser!: any;
  onlyRhUsers!: any[]

  private stompClient: any = null;
  public messages$!: Observable<any>;

  constructor(private formBuilder: UntypedFormBuilder, private requestService: RequestService, private userService: UserService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    // this.connect()
    // this.sendNotification("testt")

    // this.notificationService.connect();
    // this.notificationService.message$.subscribe((data: any)=>{
    //   console.log("from socket");
    //   console.log(data);

    // })

    this.getCurrentUser()
    // this.connect();
    this.initForm();
    this.getAllRequests();
  }
  sendNotification(text: String) {
    this.stompClient.send(
      '/notif/notificationForLike',
      {},
      text
    );
  }
  connect() {
    const socket = new SockJS('http://localhost:8080/notification-endpoint');
    this.stompClient = Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe('/topic/newNotifLike', function (hello: any) {

      });
    });
  }


  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  showGreeting(message: string) {
    this.greetings.push(message);
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }


  showModalDialog() {
    this.displayModal = true;
  }

  initForm(){
    this.requestForm = this.formBuilder.group({
      requestTitle: ["", Validators.required],
      deadLineDay: [new Date().getDay(), Validators.required],
      deadLineMonth: [new Date().getMonth(), Validators.required],
      deadLineYear: [new Date().getFullYear(), Validators.required],
      postRequired: ["", Validators.required],
      description: ["", Validators.required],
      isUrgent: [false, Validators.required]
    })
  }

  submitNewTask() {

    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)

    let deadLine = "";
    if (this.requestForm.value.deadLineMonth.value == undefined)
      deadLine = `${this.requestForm.value.deadLineDay}/${this.requestForm.value.deadLineMonth}/${this.requestForm.value.deadLineYear}`
    else
      deadLine = `${this.requestForm.value.deadLineDay}/${this.requestForm.value.deadLineMonth.value}/${this.requestForm.value.deadLineYear}`

    const deadLineDate = new Date(deadLine);

    const request = new Request(
      this.requestForm.value.requestTitle,
      deadLineDate,
      this.requestForm.value.description,
      this.requestForm.value.isUrgent,
      this.requestForm.value.postRequired
    )
    console.log(request)
    const requestFormData = new FormData()
    requestFormData.append("request", JSON.stringify(request))
    requestFormData.append("user", JSON.stringify(this.currentUser))
    requestFormData.append("status", JSON.stringify(status.TODO))
    this.requestService.getDepartment(testUser.department).pipe(
      mergeMap((department:any) =>{
        this.department = department;
        requestFormData.append("department", JSON.stringify(this.department))
        return this.requestService.addNewRequest(requestFormData).pipe(
          mergeMap(()=>{
            console.log('request sent successfully');
            this.getAllRequests();
            this.displayModal = false;
            // if(decodedJWT.roles[0] =="RH"){

            // }
            return this.userService.getOnlyRhUsers(this.username).pipe(
              map((users: any[])=>{
                console.log(users);
                this.onlyRhUsers = users;

                this.onlyRhUsers.forEach((user: any)=>{

                  this.notificationService.pushRequestNotification(new NotificationUser("you have a new task from the manager", this.currentUser.username, user.username))
                  this.pushRequestNotification(new NotificationUser("you have a new task from the manager", this.currentUser.username, user.username))
                })

              })
            )
          })
        )
      })
    ).subscribe()
  }

  getAllRequests(){
    this.requestService.getAllRequests().subscribe((requests: RequestResp[])=>{
      this.requests = requests
      console.log(this.requests)
    })
  }

  getStatus(state: any) {
    switch (state.statusName){
      case "DONE": this.newStatusForUpdate = status.DONE; break;
      case "DOING": this.newStatusForUpdate = status.DOING; break;
      case "TODO": this.newStatusForUpdate = status.TODO; break;
    }
    this.updateRequestStatus(this.requestToUpdateId, this.newStatusForUpdate);
  }

  updateRequestStatus(statusId: number, newStatusForUpdate: Status) {
    console.log(this.requestToUpdateId)
    this.requestService.updateRequestStatus(statusId, newStatusForUpdate).subscribe((req: any)=>{
      console.log("status updated");
      this.getAllRequests();
    })
  }

  getCurrentUser(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub;
    this.username = username;
    this.userService.getCurrentUser(username).subscribe(user=>{
      this.currentUser = user
      console.log(user);

    })
  }

  getOnlyRhUsers(){
    this.userService.getOnlyRhUsers(this.username).subscribe((users: any[])=>{
      console.log(users);
      this.onlyRhUsers = users;

    })
  }

  pushRequestNotification(notification: NotificationUser){
    this.notificationService.pushRequestNotification(notification).subscribe((notifData: string)=>{
      console.log("notifData",  notifData);
    })
  }


}
