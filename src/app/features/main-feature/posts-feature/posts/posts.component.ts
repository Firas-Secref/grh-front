import {Component, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {PostsService} from "../services/posts.service";
import {categories, postStatusFilterDropDown, status} from "../../../../core/canstants/canstants";
import {NewPost, PostDB} from "../../../../core/model/Post";
import {MatMenuTrigger} from "@angular/material/menu";
import {Status} from "../../../../core/model/Status";
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserItem } from 'src/app/core/model/UserItem';
import { UserService } from '../../users-feature/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  offerForm!: UntypedFormGroup;
  posts!: PostDB[];
  postsCopy!: PostDB[]
  statusOptions: any[] = postStatusFilterDropDown
  helper = new JwtHelperService();
  currentUser!: any


  @ViewChild('menuTrigger') statusMenu!: MatMenuTrigger;
  displayModal!: boolean;

  postCandidature!: boolean;

  categoryInfo = [
    'Job Offer',
    'Internship Offer',
  ];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: any[] = [{name: 'fullStack'}, {name: 'DataScience'}, {name: 'DevOps'}];
  offerCategory!: string;
  termToFind!: string;
  selectedStatus!: any;
  offerToPost!: string;
  postOfferForm!: UntypedFormGroup


  constructor(private userService: UserService, private postService: PostsService, private formBuilder: UntypedFormBuilder) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

  }
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
  getCurrentUser(){
    const JWT = localStorage.getItem("token")!;
    const decodedJWT = this.helper.decodeToken(JWT)
    const username = decodedJWT.sub;
    this.userService.getCurrentUser(username).subscribe((user: UserItem)=>{
      this.currentUser = user;
      console.log(user)
    })
  }

  
  ngOnInit(): void {
    this.getCurrentUser()
    this.getAllOffers();
    this.initOfferForm();
    this.initPostForOfferForm()
  }

  showNewOfferModal() {
    this.displayModal = true
  }
  showPostCandidatureModal(postTitle: string){
    this.postCandidature = true
    this.offerToPost = postTitle;
    this.postOfferForm.patchValue({
      jobTitle: postTitle,
      firstname: this.currentUser.firstname,
      email: this.currentUser.email,
      lastname: this.currentUser.lastname,
    })
  }

  addNewOffer() {
    let offerFormData = new FormData();
    const newPost = new NewPost(
      this.offerForm.value.offerTitle,
      this.offerForm.value.offerRef,
      this.offerForm.value.publishDate,
      this.offerForm.value.offerDescription
    )
    console.log(this.offerForm.value.offerCategory)
    offerFormData.append("postObject", JSON.stringify(newPost));
    if (this.offerForm.value.offerCategory ==="Job Offer")
      offerFormData.append("offerCategoryObject", JSON.stringify(categories.JOB_OFFER))
    else if(this.offerForm.value.offerCategory ==="Internship Offer")
      offerFormData.append("offerCategoryObject", JSON.stringify(categories.INTERNSHIP_OFFER))

    offerFormData.append("offerStatusObject", JSON.stringify(status.DRAFT))
    console.log(newPost)
    this.postService.addNewOffer(offerFormData).subscribe((data: any)=>{
      console.log(data);
      this.getAllOffers()

      this.displayModal = false;
    })
  }

  initOfferForm(){
    this.offerForm = this.formBuilder.group({
      offerTitle: ['', Validators.required],
      offerRef: ['', Validators.required],
      publishDate: [new Date(), Validators.required],
      offerDescription: ['', Validators.required],
      offerCategory: ["", Validators.required]
    })
  }

  getAllOffers(){
    this.postService.getAllOffers().subscribe((posts: PostDB[])=>{
      console.log(posts)
      this.posts = posts
      this.postsCopy = posts
    })
  }

  statusSelected() {
    if (!this.selectedStatus){
      this.posts = this.postsCopy
    }else{
      this.posts = this.postsCopy
      this.posts = this.posts.filter(item=>item.statusName === this.selectedStatus.statusName)
    }
  }

  initPostForOfferForm(){
    this.postOfferForm = this.formBuilder.group({
      jobTitle: ["", Validators.required],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", Validators.required],
      message: ["", Validators.required],
      
    })
  }

}
