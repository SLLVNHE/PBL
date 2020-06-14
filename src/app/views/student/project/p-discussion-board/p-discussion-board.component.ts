import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-p-discussion-board',
  templateUrl: './p-discussion-board.component.html',
  styleUrls: ['./p-discussion-board.component.css']
})
export class PDiscussionBoardComponent implements OnInit {
 
  public posts: any[] = [1];
  public replies:any[]=[1];
  public page: any = 1;
  public total: any;
  public pid:any;
  putdisForm: FormGroup;
  replyForm:FormGroup;
  x1:any ;
  x2:any ;
  hu:any;
  see1:any;
  see2:any;
  see3:any;
 
  num:any;


  
  constructor(
    private fb: FormBuilder,
    public httpRequest: HttpRequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.x1 = true;
    this.x2 = false;
    this.hu = false;
    this.see1 = true;
    this.see2 = false;
    this.see3 = false;
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
    });
    this.buildForm();
    this.buildForm2();
  }


  seeup(id){
    this.getReplies(id);
  }

  seedown(){
    this.see1 = true;
    this.see2 = false;
    this.see3 = false;
  }

    change(){
      this.x1 = false;
      this.x2 = true;
    }
  cancel(){
    this.x1 = true;
    this.x2 = false;
    this.buildForm();
  }
  cancel2(){
    this.hu = false;
    this.buildForm2;
  }

  buildForm() {
    this.putdisForm = this.fb.group({
      'postname': ['', [Validators.required]],
      'postcontent': ['', [Validators.required]]
    })
  }

  buildForm2(){
    this.replyForm = this.fb.group({
      'replycontent': ['', [Validators.required]],
      
    })
  }



  //新建讨论
  onSubmit() {

    this.httpRequest.httpPost("post", { project_id: this.pid, post_name: this.putdisForm.get('postname').value, content: this.putdisForm.get('postcontent').value})
      .subscribe((val: any) => {

        if (val.message == "success") {
          this.getPost();
         
        } else {
         

        }


      })

    this.x1 = true;
    this.x2 = false;
    this.buildForm();
  }

  onSubmit1(post_id){
    this.httpRequest.httpPost("reply", { post_id:post_id, content: this.putdisForm.get('postcontent').value })
      .subscribe((val: any) => {

        if (val.message == "success") {

        } else {


        }


      })

  }

  zan(id){
    this.httpRequest.httpGet("like", {"post_id":id}).subscribe((val:any)=>{
      if (val.message == "success"){
        
        this.getPost();
      }else{
        //点赞失败
      }
    })

  }

  hu1(){
    this.hu = true;
  }


  getPost() {
    this.httpRequest.httpGet('view_posts', {"project_id": this.pid, "page": this.page }).subscribe((val: any) => {
      if (val.message == undefined) {
        console.log(val)
        this.posts = val.posts;
        this.total = val.total;
        

      } else {

      }
    })

  }

  getReplies(id) {
    this.httpRequest.httpGet('view_replies', { "post_id": id }).subscribe((val: any) => {
      if (val.message == undefined) {
        console.log(val)
        this.replies = val.replies;
        this.see1 = false;
        this.see2 = true;
        this.see3 = true;


      } else {

      }
    })

  }

  onPage(event: any) {

    if (this.page != event.page) {
      this.page = event.page;
    

    }
  }    
  ngOnInit(): void {
  }

}
