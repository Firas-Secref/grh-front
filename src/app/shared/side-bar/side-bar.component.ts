import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  candidateRole = localStorage.getItem("role") ==="Candidate";
  managerRole = localStorage.getItem("role") ==="MANAGER";
  rhRole = localStorage.getItem("role") ==="RH";
  teamLeadRole = localStorage.getItem("role") ==="TEAM_LEAD";

  constructor() { }

  ngOnInit(): void {
  }

}
