import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserService} from "../../features/main-feature/users-feature/services/user.service";
import {UserItem} from "../../core/model/UserItem";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { ENTER } from '@angular/cdk/keycodes';
import { log } from 'console';
import { NotificationsService } from '../services/notifications.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  stateMenu: boolean = false;
  helper = new JwtHelperService()
  fullName: string = "";

  //socket
  showConversation: boolean = false;
  //ws: any = null;
  name!: string;
  disabled!: boolean;
  greetings: any[] = []
  username!: string;


  connected!: boolean;
  socket!: WebSocket;

  notificationsReq!: any[];

  constructor(private userService: UserService, private notificationService: NotificationsService) {
  }
  onMessageReceived(event: MessageEvent){
    console.log(event.data);
    
  }

  ngOnInit(): void {
    // this.socket= new WebSocket('ws://localhost:8080/notification')
    // this.socket.onmessage = (event)=> this.onMessageReceived(event);
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)

    this.getCurrentUser();
    if(decodedJWT.roles[0] == "RH"){
      this.getMyReqNotifications();
    }

    this.notificationService.requestNotification$.subscribe((data: any)=>{
      console.log("notification",data);
      
      
    })

  }

  openMenu(){
    this.stateMenu = !this.stateMenu
  }

  getCurrentUser(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub;
    this.username = username;
    console.log(decodedJWT);
    if(decodedJWT.roles[0] =="Candidate"){
      this.userService.getCurrentCandidate(username).subscribe((user: any)=>{
        console.log(user)
        localStorage.setItem("candidateId", user.candidateId)
        this.fullName= `${user.firstname} ${user.lastname}`
        console.log(this.fullName   );
        
      })
    }else{
      this.userService.getCurrentUser(username).subscribe((user: UserItem)=>{
        console.log(user)
        this.fullName= `${user.firstname} ${user.lastname}`
      })
    }
    
    
  }

  getMyReqNotifications(){
    this.notificationService.getMyRequestNotifications(this.username).subscribe((notifs: any[])=>{
      console.log(notifs);
      
      this.notificationsReq = notifs
    })
  }


}
