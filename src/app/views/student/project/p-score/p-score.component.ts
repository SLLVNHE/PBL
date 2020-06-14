import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-p-score',
  templateUrl: './p-score.component.html',
  styleUrls: ['./p-score.component.css']
})
export class PScoreComponent implements OnInit {


  public pid: any;
  public pname: any;
  public leader: any[] = [];
  public member: any[] = [];
  public position: any;
  public id:any;
  displayBasic: boolean;
  value: any;
  sid: any;
  creatcForm: FormGroup;



  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {
    this.id = localStorage.getItem("id");
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
    });
    this.buildForm();
  }

buildForm() {
    this.creatcForm = this.fb.group({
      'taskname': ['', [Validators.required]],

    })
  }


  apple() {
    this.httpRequest.httpGet("mutual_evaluation", { "project_id": this.pid, "student_id": this.sid, "score": this.creatcForm.get("taskname").value }).subscribe((val: any) => {
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
        this.buildForm();
      
      } else {


      }
    })
 
  }

  apple1() {
    this.httpRequest.httpGet("self_evaluation", { "project_id": this.pid,  "score": this.creatcForm.get("taskname").value }).subscribe((val: any) => {
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
        
        this.buildForm();
      } else {


      }
    })

  }

  showBasicDialog(uid) {
    this.sid = uid;   
    this.displayBasic = true;
  }

  clean() {
    this.buildForm();
  }


  

  getp() {
    this.httpRequest.httpGet("project_basic_info", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == "failure") {
      } else {
        this.pname = val.project_name;

      }
    })
  }

  getmember() {
    this.httpRequest.httpGet("group_members", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == "failure") {
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
      } else {
        this.member = val.others;
        this.leader = val.group_leader;
      }
    })
  }



  ngOnInit(): void {

    this.getmember();
  }


}
