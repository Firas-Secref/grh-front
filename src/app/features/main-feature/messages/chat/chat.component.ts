import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { log } from 'console';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messageFrom: string = "sender"
  messagesPopup!: boolean
  candidates!: any[]
  candidateReceiverId!: number
  helper = new JwtHelperService()
  candidateRole = localStorage.getItem("role") == "Candidate";
  messageForm!: UntypedFormGroup
  conversation!: any[];
  candidateMessages!: any[];

  constructor(private dashboardService: DashboardService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)

    if (decodedJWT.roles[0] == "Candidate") {
      this.getMessagesCandidate()
    }else {
      this.getMessagesUser()
    }

    this.initForm()
    this.getAllCandidates();

  }

  getAllCandidates(){
    this.dashboardService.getAllCandidate().subscribe((candidacys: any[])=>{
      candidacys.map(can=>{
        can.fullName = `${can.firstname} ${can.lastname}`
      })
      this.candidates = candidacys
      console.log(this.candidates);
      
    })
  }

  newMessagePopUp(candidateId: number){
    this.candidateReceiverId = candidateId;
    this.messagesPopup = true;
  }

  initForm(){
    this.messageForm = this.fb.group({
      messageContent: ["", Validators.required]
    })
  }

  reply(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    console.log(this.messageForm.value);
    const newMessage = {
      ...this.messageForm.value,
      toUser: this.candidateReceiverId,
      fromUser: decodedJWT.sub
    }

    this.dashboardService.sendMessage(newMessage).subscribe(()=>{
      console.log("sent !!");
    })
  }

  send(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    console.log(this.messageForm.value);
    const newMessage = {
      ...this.messageForm.value,
      toUser: this.candidateReceiverId,
      fromUser: decodedJWT.sub
    }

    this.dashboardService.sendMessage(newMessage).subscribe(()=>{
      console.log("sent !!");
    })
  }

  getMessagesUser(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    this.dashboardService.getMessagesUser(decodedJWT.sub).subscribe((data: any[])=>{
      console.log(data);
      
    })
  }

  getMessagesCandidate(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    this.dashboardService.getMessagescandidate(parseInt(localStorage.getItem("candidateId")!)).subscribe((data: any[])=>{
      console.log(data);
      this.candidateMessages = data
      
    })
  }

  loadConversation(candidateId: number){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    this.dashboardService.loadConversation(candidateId, decodedJWT.sub).subscribe((data: any[])=>{
      console.log(data);
      this.conversation = data;
      
    })
  }



}
