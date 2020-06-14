import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-p-see-tasks',
  templateUrl: './p-see-tasks.component.html',
  styleUrls: ['./p-see-tasks.component.css']
})
export class PSeeTasksComponent implements OnInit {

  public pid: any;
  public Identity:any;
  public tid:any;
  public pname: any;
  public leader: any[] = [];
  public member: any[] = [];
  public position: any;
  role:any;



  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    this.role = localStorage.getItem("role");
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
      this.Identity = queryParams.leader;
      this.tid = queryParams.tid;
    });

  }

  // getp() {
  //   this.httpRequest.httpGet("project_basic_info", { "project_id": this.pid }).subscribe((val: any) => {
  //     if (val.message == "failure") {
  //     } else {
  //       this.pname = val.project_name;

  //     }
  //   })
  // }

  urge(sid){
    this.httpRequest.httpGet("supervise", { "task_id": this.tid, "student_id":sid}).subscribe((val: any) => {
      if (val.message == "failure") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '督促失败，请重试！',
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
          message: '督促成功',
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

  getmember() {
    this.httpRequest.httpGet("task_completion", { "task_id": this.tid }).subscribe((val: any) => {
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
        this.member = val.students;
       
      }
    })
  }



  ngOnInit(): void {

    this.getmember();
  }


}
