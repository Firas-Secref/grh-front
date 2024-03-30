import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-cv',
  templateUrl: './view-cv.component.html',
  styleUrls: ['./view-cv.component.scss']
})
export class ViewCVComponent implements OnInit {
  showFiller = false;

  constructor() { }

  ngOnInit(): void {
  }

}
