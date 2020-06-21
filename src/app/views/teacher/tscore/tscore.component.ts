import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tscore',
  templateUrl: './tscore.component.html',
  styleUrls: ['./tscore.component.css']
})
export class TscoreComponent implements OnInit {

  public pid: any;
  public pname: any;
  public leader: any[] = [];
  public member: any[] = [];
  public scores:any [] = [];
  public position: any;
  public val:any;
  displayBasic: boolean;
  value:any;
  sid:any;
  creatcForm: FormGroup;
  cid:any;


  showBasicDialog(id) {
    this.sid = id;
    this.displayBasic = true;
  }

  apple(){
    this.httpRequest.httpGet("teacher_score", { "project_id": this.pid, "student_id": this.sid, "score": this.creatcForm.get("taskname").value}).subscribe((val: any) => {
      console.log(val)
      if (val.message == "success") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '打分成功',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getmember();
        this.buildForm();
      } else {


      }
    })

  }
  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService, 
    private fb: FormBuilder,
  ) {
    
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
      this.cid = queryParams.cid;
    });
    this.buildForm();

  }


  buildForm() {
    this.creatcForm = this.fb.group({
      'taskname': ['', [Validators.required]],
    
    })
  }

  // select(sid) {
  //   this.httpRequest.httpGet("choose_leader", { "project_id": this.pid, "student_id": sid }).subscribe((val: any) => {
  //     if (val.message == "success") {
  //       this.position = "top";
  //       this.confirmationService.confirm({
  //         message: '选择成功',
  //         header: '提示',
  //         icon: 'pi pi-info-circle',
  //         //  acceptVisible:false,
  //         acceptLabel: '确认',
  //         rejectVisible: false,
  //         key: "positionDialog"
  //       });
  //     } else {
  //       this.position = "top";
  //       this.confirmationService.confirm({
  //         message: '选择失败，请重试！',
  //         header: '提示',
  //         icon: 'pi pi-info-circle',
  //         //  acceptVisible:false,
  //         acceptLabel: '确认',
  //         rejectVisible: false,
  //         key: "positionDialog"
  //       });
  //     }
  //   })
  // }

  clean(){
    this.buildForm();
  }

  publish(){
    this.httpRequest.httpGet("publish_score", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == "success") {
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
       

      }
    }, error => {

      if (error.error.message == "failure") {
        this.position = "top";
        this.confirmationService.confirm({
          message: "发布失败，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });

      } else if (error.error.message == "published already") {
          this.position = "top";
          this.confirmationService.confirm({
            message: "已经发布！",
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });

        }
    }
    )
  }

  getp() {
    this.httpRequest.httpGet("project_basic_info", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == undefined) {
        this.pname = val.project_name;
      } else {
        

      }
    })
  }

  getmember() {
    this.httpRequest.httpGet("view_all_scores", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == undefined) { this.scores = val.scores;
        
      } else {
       this.position = "top";
        this.confirmationService.confirm({
          message: '刷新失败，请重试！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
     
      }
    })
  }



  ngOnInit(): void {

    this.getmember();
  }


}
