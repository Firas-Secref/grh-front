import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/core';
import {DialogService} from "primeng/dynamicdialog";
import {NewInterviewComponent} from "./new-interview/new-interview.component";
import {UserService} from "../../users-feature/services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserItem} from "../../../../core/model/UserItem"; // useful for typechecking
import {NewEventComponent} from "./new-event/new-event.component";
import {PostsService} from "../../posts-feature/services/posts.service";
import {CandidateService} from "../../candidate-feature/services/candidate.service";
import {InterviewService} from "../services/interview.service";
import {Event} from "../../../../core/model/Event";
import {map, mergeMap} from "rxjs/operators";
import {InteractionsService} from "../services/interactions.service";
import {MessageService} from "primeng/api";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  displayModal: boolean = false;
  helper = new JwtHelperService()
  allUsers!: any[]
  longEvent: boolean = false;
  subjects: any[] = [];
  candidates!: any[];
  constructor(private dialogService: DialogService,
              private userService: UserService,
              private postService: PostsService,
              private candidateService: CandidateService,
              private interviewService: InterviewService,
              private interactionService: InteractionsService,
              private toastService: MessageService) {
    // this.getAllEvents();

  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],

    dayMaxEvents: 2,
    displayEventTime: true,
    selectable: true,
    contentHeight: 550,
    editable: true,
    select: this.addEventInterview.bind(this),
    eventDrop: this.updateDateEvent.bind(this),
    eventTimeFormat: {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit"
    }
  };


  addNewInterview(arg: any) {
    const calendarApi = arg.view.calendar;
    calendarApi.unselect();

    this.dialogService.open(NewInterviewComponent, {
      data: {
        'allUsers': this.allUsers!,
        'date': arg.startStr!,
        'allSubjects': this.subjects!,
        'allCandidates': this.candidates!,
        'calendarApi': calendarApi
      },
      height: '28rem',
      width: '50rem',

    })
  }

  addEventInterview(selectInfo: any){
    console.log(new Date(selectInfo.end).getDate())
    if (new Date(selectInfo.end).getDate()-new Date(selectInfo.start).getDate() ==1){
      this.addNewInterview(selectInfo)
    }else if(new Date(selectInfo.end).getDate()-new Date(selectInfo.start).getDate() >1){
      this.addNewEvent(selectInfo)
    }

  }
  addNewEvent(selectInfo: any){
    console.log(selectInfo)
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    this.dialogService.open(NewEventComponent, {
      data: {
        'calendarApi': calendarApi,
        'eventStartDate': selectInfo.startStr,
        'eventEndDate': selectInfo.endStr,
      },
      width: '50rem',

    })

  }

  ngOnInit(): void {
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub
    this.getAllUsers(username)
    this.getAllPosts();
    this.getAllCandidates()
    // this.getAllInterviews()
    this.getAllEventsInterviews()
    this.interactionService.toastObservable$.subscribe((data:any)=>{
      if(data.state == true){
        this.toastService.add({severity:'success', summary: 'Success', detail: data.text});
      }
    })
  }

  getAllUsers(username: string){
    this.userService.getAllUsers(username).subscribe((users: UserItem[])=>{
      users.map(u=>{
        u.fullName = `${u.firstname} ${u.lastname}`
      })
      console.log(users)
      this.allUsers = users
    })
  }

  getAllPosts(){

    this.postService.getAllOffers().subscribe((subjects: any[])=>{
      // this.subjects = subjects;
      subjects.forEach(s=>{
        this.subjects.push(
          {
            title: `${s.offerRef} - ${s.offerTitle}`,
            offerRef: s.offerRef
          }
          )
      })
      console.log(this.subjects)
    })
  }

  getAllCandidates(){
    this.candidateService.getAllCandidates().subscribe((candidates: any[])=>{
      candidates.map(can=>{
        can.fullName = `${can.firstname} ${can.lastname}`
      })
      this.candidates = candidates
    })
  }

  updateDateEvent(args: any){
    const newStartDate: string = new Date(args.event._instance.range.start).toLocaleDateString().split("/").reverse().join("-")
    const newEndDate: string = new Date(args.event._instance.range.end).toLocaleDateString().split("/").reverse().join("-")
    const eventId = args.event._def.publicId
    const eventType= args.event._def.extendedProps.eventType
    const eventName= args.event._def.title
    const newEvent : Event = new Event(newStartDate, newEndDate, eventType, eventName)

    this.interviewService.updateCurrentEvent(eventId, newEvent).subscribe((newEvent: Event)=>{
      console.log(newEvent)
    })
  }

  getAllEventsInterviews(){

    this.interviewService.getAllEvents().pipe(
      mergeMap((events: any[])=>{
        const eventsToDisplay: any[] = []
        console.log('events  ', events)
        events.forEach(e=>{
          if (e.eventType =="Technical Interview"){
            eventsToDisplay.push({title: e.eventName, start: e.eventStartDate, end: e.eventEndDate, color: '#2bbacb', id: e.id, eventType: e.eventType})
          } else if(e.eventType =="RH Interview"){
            eventsToDisplay.push({title: e.eventName, start: e.eventStartDate, end: e.eventEndDate, color: '#ee9247', id: e.id, eventType: e.eventType})
          }
        })
        return this.interviewService.getAllInterviews().pipe(
          map((interviews: any[])=>{
            interviews.forEach(i=>{
              console.log(i)
              eventsToDisplay.push({title: i.offerName, start:`${i.interviewDate}T${i.interviewHour}`})
            })
            this.calendarOptions.events = eventsToDisplay
          })

        )
      })
    ).subscribe()

  }

  getAllInterviews(){
    this.interviewService.getAllInterviews().subscribe((interviews: any[])=>{
      console.log(interviews)
    })
  }

}


