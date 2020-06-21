import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-p-discussion-board',
  templateUrl: './p-discussion-board.component.html',
  styleUrls: ['./p-discussion-board.component.css']
})
export class PDiscussionBoardComponent implements OnInit {
 
  public posts: any[] = [];
  public replies:any[]=[];
  public page: any = 0;
  public total: any;
  public pid:any;
  putdisForm: FormGroup;
  replyForm:FormGroup;
  x1:any ;
  x2:any ;
  hu:number;
  see1:any;
  see2:number;
  see3:any;
  position:any;
  num:any;
  piclass: any ="pi pi-chevron-down";
  cid:any;
  count:any;

  
  constructor(
    private fb: FormBuilder,
    public httpRequest: HttpRequestService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
  ) {
    this.x1 = true;
    this.x2 = false;
    this.hu = -1;
    this.see1 = true;
    this.see2 = -1;
    this.see3 = false;
   
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
      this.cid = queryParams.cid;
    });
    this.buildForm();
    this.buildForm2();
    this.getPost() 
  }


  seeup(id,i){
    // if (this.piclass == "pi pi-chevron-down"){
       this.getReplies(id);
       this.see2 = i;
      this.piclass = "pi pi-chevron-up"
     
    // }else{
    //   this.see2 = -1;
    //   this.piclass = "pi pi-chevron-down"
    // }
   

  }

  seedown(){
    this.see2 = -1;
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
    this.hu = -1;
    this.buildForm2;
  }

  buildForm() {
    this.putdisForm = this.fb.group({
      'postname': ['', [Validators.required, Validators.maxLength(20)]],
      'postcontent': ['', [Validators.required, Validators.maxLength(200)]]
    })
  }

  buildForm2(){
    this.replyForm = this.fb.group({
      'replycontent': ['', [Validators.required, Validators.maxLength(250)]],
      
    })
  }



  //新建讨论
  onSubmit() {

    this.httpRequest.httpPost("post", { project_id: this.pid, post_name: this.putdisForm.get('postname').value, content: this.putdisForm.get('postcontent').value})
      .subscribe((val: any) => {

        if (val.message == "success") {
          this.getPost1();
          this.position = "top";
          this.confirmationService.confirm({
            message: '发布成功',
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });
        } else {
          this.position = "top";
          this.confirmationService.confirm({
            message: '发布失败请重试！',
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });

        }


      })
   
    this.x1 = true;
    this.x2 = false;
    this.buildForm();
  }

  onSubmit1(post_id){
    this.httpRequest.httpPost("reply", { post_id: post_id, content: this.replyForm.get('replycontent').value })
      .subscribe((val: any) => {

        if (val.message == "success") {
          this.position = "top";
          this.confirmationService.confirm({
            message: '回复成功',
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });
        } else {
          this.position = "top";
          this.confirmationService.confirm({
            message: '回复失败请重试！',
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });

        }


      })
      this.hu = -1;
      this.buildForm2();
  }

  zan(id){
    
    this.httpRequest.httpGet("like", {"post_id":id}).subscribe((val:any)=>{
      if (val.message == "success"){
        this.count = val.count;
        this.getPost();
      } else if (val.message == "likes canceled"){
        this.getPost();
        this.count = val.count;
      }
    })

  }

  hu1(i){
    this.hu = i;
  
  }


  getPost() {

    this.httpRequest.httpGet('view_posts', {"project_id": this.pid, "page": this.page+1 }).subscribe((val: any) => {
      if (val.message == undefined) {
      
        this.posts = val.posts;
        this.total = val.total;
       

      } else {

      }
    })

  }

  getPost1() {

    this.httpRequest.httpGet('view_posts', { "project_id": this.pid, "page":  1 }).subscribe((val: any) => {
      if (val.message == undefined) {

        this.posts = val.posts;
        this.total = val.total;


      } else {

      }
    })

  }

  getReplies(id) {
    this.httpRequest.httpGet('view_replies', { "post_id": id }).subscribe((val: any) => {
      if (val.message == undefined) {
       
        this.replies = val.replies;
        this.see1 = false;
        
        this.see3 = true;


      } else {

      }
    })

  }

  onPage(event: any) {
    console.log(event)

    if (this.page != event.page) {
      this.page = event.page;
      this.getPost()

    }
  }    
  ngOnInit(): void {
  }

}
