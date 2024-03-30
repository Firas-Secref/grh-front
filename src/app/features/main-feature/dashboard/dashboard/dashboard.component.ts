import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../posts-feature/services/posts.service';
import { PostDB } from 'src/app/core/model/Post';
import { DashboardService } from '../services/dashboard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../users-feature/services/user.service';
import { log } from 'console';
import { map, mergeMap } from 'rxjs/operators';
import { CandidateService } from '../../candidate-feature/services/candidate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  helper = new JwtHelperService()
  candidateRole= localStorage.getItem("role") == "Candidate"
  posts!: PostDB[];
  postsCopy!: PostDB[];
  cvFile!: File;
  loaded: any;
  feedbacksDialog!: boolean

  
  campDetailDialog!: boolean
  username!: string;
  myCandidacys!: any[];
  candidatId!: number;
  postDetailsDialog!: boolean;
  postDetails!: any;
  postForTheJobDialog!: boolean;
  rhFeedbacksForCandidate!: any[];
  techFeedbacksForCandidate!: any[];

  constructor(private postService: PostsService, private dashboardService: DashboardService, private userService: UserService, private candidateService: CandidateService) { }

  ngOnInit(): void {
    this.getMyCandidacys();

    this.getAllOffers();
    
    
  }

  color(state: string) {
    switch (state) {
      case "DRAFT": return "#dccc21" ;break;
      case "PUBLISHED": return "#21dc56" ;break;
      case "ARCHIVED": return "#c7621c" ;break;
      case "CLOSED": return "#6b7781" ;break;

      case "NEW": return "#e87d9a" ;break;
      case "INTERVIEW": return "#7db8e8" ;break;
      case "REFUSED": return "#dc033e" ;break;
      case "ACCEPTED": return "#1cdc00" ;break;
      case "CONFIRMED": return "#e3ec5b" ;break;
    
    }
    if (state=="En attente") {
      return 'yellow';
    } else if (state=="Validée") {
      return 'green';
    } else {
      return 'red';
    }
  }

  getAllOffers(){
    this.postService.getAllOffers().subscribe((posts: PostDB[])=>{
      console.log(posts)
      this.posts = posts
      this.postsCopy = posts
    })
  }

  postForThisOffer(postId: number){

    // to test the cv uploader : decomment the line 77 and comment the 85 line 
    // this.postForTheJobDialog = true;
    console.log(this.username);
    
    const candidacyObject : any = {
      candidateUsername: this.username,
      offerId: postId
    }

    this.dashboardService.postuler(candidacyObject).subscribe((data: any)=>{
      console.log(data);
      
    })
  }

  getCurrentUser(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub;
    this.username = username;
    this.userService.getCurrentCandidate(username).subscribe((user: any)=>{
      console.log(user)
    this.candidatId = user.candidateId;
      console.log(this.candidatId);      
    })
  }

  onFileChange($event: any){
    console.log($event);
    
    this.cvFile = $event.target.files[0];
 
  }

  uploadCv(){

    const fileFormData: FormData = new FormData();
    fileFormData.append("cvFile", this.cvFile, this.cvFile.name);
    fileFormData.append("username", this.username)
    this.dashboardService.uploadCvFile(fileFormData).subscribe((data: any)=>{
      console.log(data);
      
    })
  }


  getMyCandidacys(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub;
    this.username = username;
    this.userService.getCurrentCandidate(username).pipe(
      mergeMap((candidate: any)=>{
        return this.dashboardService.getMyCandidacys(candidate.candidateId).pipe(
          map((myCandidacys: any[])=>{
            
            this.myCandidacys = myCandidacys;
            console.log(this.myCandidacys);

          })
        )
      })
    ).subscribe()
  }

  viewJobDetails(postId: number){
    this.postDetailsDialog = true;
    this.dashboardService.showPostDetails(postId).subscribe((post: any)=>{
      console.log(post);
      this.postDetails = post
    })
  }

  viewMyFeedBacks(candidateId: number){
    this.feedbacksDialog = true;

    this.candidateService.getCandidateFeedBacks(candidateId).subscribe((data: any[])=>{
      console.log(data);
      this.rhFeedbacksForCandidate = data.filter(fb=> fb.feedBackType == "RH");
      this.techFeedbacksForCandidate = data.filter(fb=> fb.feedBackType == "Tech");
   
    })    
  }

}
