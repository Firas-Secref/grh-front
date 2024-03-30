import { Component, Input, OnInit } from '@angular/core';
import {CandidateStatus, status} from "../../../../../core/canstants/canstants";
import { CandidateService } from '../../services/candidate.service';
import { Status } from 'src/app/core/model/Status';

@Component({
  selector: 'app-candidate-status',
  templateUrl: './candidate-status.component.html',
  styleUrls: ['./candidate-status.component.scss']
})
export class CandidateStatusComponent implements OnInit {

  statusOptions : any[] = CandidateStatus
  @Input() candidate!: any;
  State:any=status

  constructor(private candidateService: CandidateService) { }

  ngOnInit(): void {
  }

  updateStatus(currentcandidate: any, newStatus:Status) {
    const newStat = newStatus.statusName
    console.log(newStatus)
    this.candidateService.updateCandidateStatus(currentcandidate.candidateId, this.State[newStat]).subscribe(data=>{
      console.log("updated");
      this.candidate.status.statusColor = newStatus.statusColor
      
    })
    // this.postService.updateOfferStatus(currentPost.offerId, this.State[newStat]).subscribe(msg=>{
    //   console.log("updated");
    //   this.post.statusColor = newStatus.statusColor
    // })
  }

}
