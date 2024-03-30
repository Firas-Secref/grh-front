import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {InterviewService} from "../../services/interview.service";
import {Event} from "../../../../../core/model/Event";
import {InteractionsService} from "../../services/interactions.service";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  eventForm!: UntypedFormGroup;

  interviewType = [
    'RH Interview',
    'Technical Interview'
  ];

  private eventGuid: number=0;

  constructor(private formBuilder: UntypedFormBuilder,
              private dialogService: DynamicDialogConfig,
              private interviewService: InterviewService,
              private dialogRef: DynamicDialogRef,
              private interactionService: InteractionsService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.eventForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventType:['', Validators.required],
      startDate: [this.dialogService.data.eventStartDate, Validators.required],
      endDate: [this.dialogService.data.eventEndDate, Validators.required]
    })
  }

  newEvent(newEvent: Event, calendarApi: any){
    this.interviewService.addNewEvent(newEvent).subscribe((eventData: any)=>{
      console.log("eventData-->  ", eventData)
    })
    if (newEvent.eventType =='RH Interview'){
      calendarApi.addEvent({
        eventId: this.createEventId(),
        title: newEvent.eventName,
        start: newEvent.eventStartDate,
        end: newEvent.eventEndDate,
        color:'#eeb67a',
        allDay: true,
      })

    }else if(newEvent.eventType =='Technical Interview'){
      calendarApi.addEvent({
        eventId: this.createEventId(),
        title: newEvent.eventName,
        start: newEvent.eventStartDate,
        end: newEvent.eventEndDate,
        color:'#816bf6',
        allDay: true,
      })
    }
  }

  createEventId() {
    return String(this.eventGuid++);
  }

  onSubmit(){
    console.log(this.eventForm.value)
    const newEvent: Event = new Event(
      this.dialogService.data.eventStartDate,
      this.dialogService.data.eventEndDate,
      this.eventForm.value.eventType,
      this.eventForm.value.eventName,

    )
    this.newEvent(newEvent, this.dialogService.data.calendarApi)
    this.dialogRef.close();
    this.interactionService.pushToast({state: true, text:'Event added successfully'});
  }

}
