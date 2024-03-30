import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Interview} from "../../../../../core/model/Interview";
import {InterviewService} from "../../services/interview.service";
import {Subject} from "rxjs";
import {InteractionsService} from "../../services/interactions.service";

@Component({
  selector: 'app-new-interview',
  templateUrl: './new-interview.component.html',
  styleUrls: ['./new-interview.component.scss']
})
export class NewInterviewComponent implements OnInit {

  allUsers!: any[]
  interviewForm!: UntypedFormGroup
  allSubjects: any[];
  candidates: any[];
  constructor(private dialogService: DynamicDialogConfig,
              private formBuilder: UntypedFormBuilder,
              private interviewService: InterviewService,
              private dialogRef: DynamicDialogRef,
              private interactionService: InteractionsService) {
    this.allUsers = this.dialogService.data.allUsers
    this.allSubjects = this.dialogService.data.allSubjects
    this.candidates = this.dialogService.data.allCandidates
    console.log(this.candidates)
    console.log(this.allSubjects)

  }

  InterviewType = [
    {type: 'RH Interview'},
    {type: 'Technical Interview'},
  ];

  ngOnInit(): void {
    this.initForm();
    // this.dialogRef.onClose.subscribe(()=>{
    //   this.interactionService.pushToast(true)
    // })
  }

  initForm(){
    console.log(this.candidates)
    this.interviewForm = this.formBuilder.group({
      interviewDate: this.dialogService.data.date,
      interviewSubject: ['', Validators.required],
      candidateName: ['', Validators.required],
      interviewerName: ['', Validators.required],
      interviewHour: ['', Validators.required],
      candidateEmail: ['', [Validators.email, Validators.required]],
      lienGoogleMeet: ['', Validators.required]
    })
  }

  newInterview(newInterview: Interview, calendarApi: any){
    this.interviewService.addNewInterview(newInterview).subscribe((interview: any)=>{
    })
    calendarApi.addEvent({
      title: `${this.interviewForm.value.interviewSubject.title} (${newInterview.candidateName})`,
      start: newInterview.interviewDate+`T${newInterview.interviewHour}:00`
    })
  }

  submit() {
    const newInterview = new Interview(
      this.interviewForm.value.interviewDate,
      this.interviewForm.value.interviewHour,
      this.interviewForm.value.candidateName.fullName,
      this.interviewForm.value.interviewSubject.offerRef,
      this.interviewForm.value.interviewerName.username,
      this.interviewForm.value.candidateEmail,
      this.interviewForm.value.lienGoogleMeet
    )
    this.newInterview(newInterview, this.dialogService.data.calendarApi);
    this.dialogRef.close();
    this.interactionService.pushToast({state: true, text: 'Event added successfully'})
  }

  close(){
    this.dialogRef.close();

  }
}
