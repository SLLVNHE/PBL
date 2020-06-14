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
    })
  }

  getmyPjlist() {
    this.httpRequest.httpGet("selected_projects", { "course_id": this.course_id }).subscribe((val: any) => {
      if (val.message == "failure") {

      } else {
        this.plist = val.projects
      }
    })
  }


  ngOnInit(): void {
    this.getmyPjlist();
  }



}
