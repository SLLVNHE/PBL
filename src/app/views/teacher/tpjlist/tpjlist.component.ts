import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tpjlist',
  templateUrl: './tpjlist.component.html',
  styleUrls: ['./tpjlist.component.css']
})
export class TpjlistComponent implements OnInit {

  public course_id: any;
  public project_id: any;
  public pname: any;
  public pstart_time: any;
  public pend_time: any;
  public pintroduce: any;
  public plist: any[] = [];
  public position: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.course_id = queryParams.cid;
    });

  }


  deletepj(id){
    this.httpRequest.httpGet("delete_project", { "project_id": id }).subscribe((val: any) => {
      if (val.message == "success") {
        this.position = "top";
        this.confirmationService.confirm({
          message: "创建成功！",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getmyPjlist();
      } else {
       
      }
    }, error => {

      if (error.error.message == "failure") {
        this.position = "top";
        this.confirmationService.confirm({
          message: "删除失败，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });

      } else if (error.error.message == "project not found") {
        this.confirmationService.confirm({
          message: "项目不存在，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      } else if (error.error.message == "this project is not your course's") {
        this.confirmationService.confirm({
          message: "ID不合法，请重试！",
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

  getmyPjlist() {
    this.httpRequest.httpGet("course_projects", { "course_id": this.course_id }).subscribe((val: any) => {
     
      if (val.message == undefined) {
       
     this.plist = val.projects
      } else {
       
      }
    })
  }


  ngOnInit(): void {
    this.getmyPjlist();
  }



}
