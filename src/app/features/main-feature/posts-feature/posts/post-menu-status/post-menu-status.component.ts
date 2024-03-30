import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {postStatusFilterDropDown, status} from "../../../../../core/canstants/canstants";
import {PostsService} from "../../services/posts.service";
import {Status} from "../../../../../core/model/Status";

@Component({
  selector: 'app-post-menu-status',
  templateUrl: './post-menu-status.component.html',
  styleUrls: ['./post-menu-status.component.scss']
})
export class PostMenuStatusComponent implements OnInit, OnChanges {

  @Input() post!: any;
  constructor(private postService: PostsService) { }
  statusOptions: any[] = postStatusFilterDropDown
  State:any=status
  ngOnInit(): void {
  }



  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.post)
    console.log(changes)
  }

  updateStatus(currentPost: any, newStatus:Status) {
    const newStat = newStatus.statusName
    console.log(newStatus)
    this.postService.updateOfferStatus(currentPost.offerId, this.State[newStat]).subscribe(msg=>{
      console.log("updated");
      this.post.statusColor = newStatus.statusColor
    })
  }


}
