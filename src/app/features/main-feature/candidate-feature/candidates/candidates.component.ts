import {Component, OnInit} from '@angular/core';
import {PrimeIcons} from "primeng/api";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {CandidateService} from "../services/candidate.service";
import { DashboardService } from '../../dashboard/services/dashboard.service';
import { log } from 'console';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  pp = ""
  candidateRole = localStorage.getItem("role") ==="Candidate";
  managerRole = localStorage.getItem("role") ==="MANAGER";
  rhRole = localStorage.getItem("role") ==="RH";
  teamLeadRole = localStorage.getItem("role") ==="TEAM_LEAD";

  candidates!: any[];

  feedRhBackForm!: UntypedFormGroup;
  feedTechBackForm!: UntypedFormGroup;


  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  cities = [
    {name: 'Accepted', code: 'Accepted'},
    {name: 'Refused', code: 'Refused'},

  ];

  events1 = [
    {
      status: "Ordered",
      date: "15/10/2020 10:30",
      icon: PrimeIcons.SHOPPING_CART,
      color: "#9C27B0",
      image: "game-controller.jpg"
    },
    {
      status: "Processing",
      date: "15/10/2020 14:00",
      icon: PrimeIcons.COG,
      color: "#673AB7"
    },
    {
      status: "Shipped",
      date: "15/10/2020 16:15",
      icon: PrimeIcons.ENVELOPE,
      color: "#FF9800"
    },
    {
      status: "Delivered",
      date: "16/10/2020 10:00",
      icon: PrimeIcons.CHECK,
      color: "#607D8B"
    }
  ];

  display: boolean = false;
  feedBacks: boolean = false;
  termToFind!: string;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  filteredFruits!: Observable<string[]>;
  candidateNameFeedBack!: any;
  fruits: any[] = [{name: 'Java'}, {name: 'Angular'}, {name: 'React'}];
  candidateId!: number;
  candidateFeedbacks!: any[];
  rhFeedbacksForCandidate!: any[]
  techFeedbacksForCandidate!: any[]
  findCandidate!: boolean;
  newCandidates!: any[];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  showDialog() {
    this.display = true;
  }
  constructor(private candidateService: CandidateService, private dashboardService: DashboardService, private fb: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getNewCandidate()
    this.getAllCandidates();
    this.initRHFeedBackForm();
    this.initTechnicalFeedBackForm();
  }

  displayFeedBacks(candidate: any) {
    this.candidateId = candidate.candidateId;
    this.candidateNameFeedBack = `${candidate.firstname} ${candidate.lastname}`
    this.getCandidateFeedBacks(candidate.candidateId)
    this.feedBacks = true;
  }

  getAllCandidates(){
    this.dashboardService.getAllCandidacys().subscribe((candidacys: any[])=>{
      candidacys.map(can=>{
        can.fullName = `${can.firstname} ${can.lastname}`
      })
      this.candidates = candidacys
    })


    // this.candidateService.getAllCandidates().subscribe((candidates: any[])=>{
    //   candidates.map(can=>{
    //     can.fullName = `${can.firstname} ${can.lastname}`
    //   })
    //   this.candidates = candidates
    // })
  }

  analyse(cvPath: string) {
    console.log(cvPath)
    this.candidateService.analyseCv(cvPath).subscribe((data:string)=>{
      console.log(data)
    })
  }

  initRHFeedBackForm(){
    this.feedRhBackForm =this.fb.group({
      feedBackText: [""]
    })
  }

  initTechnicalFeedBackForm(){
    this.feedTechBackForm =this.fb.group({
      feedBackText: [""]
    })
  }

  submitRhFeedBack(){
    const feedBack = {
      feedBackText: this.feedRhBackForm.value.feedBackText,
      candidate_id: this.candidateId,
      feedBackType: "RH"
    }

    this.candidateService.addFeedBack(feedBack).subscribe((data: any)=>{
      console.log(data);
      console.log("feddBack added !");
      this.feedRhBackForm.reset();
      this.getCandidateFeedBacks(this.candidateId)

    })

  }

  submitTechFeedBack(){
    const feedBack = {
      feedBackText: this.feedTechBackForm.value.feedBackText,
      candidate_id: this.candidateId,
      feedBackType: "Tech"
    }

    this.candidateService.addFeedBack(feedBack).subscribe((data: any)=>{
      console.log(data);
      console.log("feddBack added !");
      this.feedTechBackForm.reset()
      this.getCandidateFeedBacks(this.candidateId)

    })
  }

  getCandidateFeedBacks(candidateId: number){
    this.candidateService.getCandidateFeedBacks(candidateId).subscribe((data: any[])=>{
      console.log(data);
      this.rhFeedbacksForCandidate = data.filter(fb=> fb.feedBackType == "RH");
      this.techFeedbacksForCandidate = data.filter(fb=> fb.feedBackType == "Tech");

    })
  }

  openFindCandidateDialog(){
    this.findCandidate = true;
  }

  getNewCandidate(){
    this.candidateService.getNewCandidate().subscribe((data: any[])=>{
      console.log(data);
      this.newCandidates = data;

    })
  }

}
