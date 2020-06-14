import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-p-member',
  templateUrl: './p-member.component.html',
  styleUrls: ['./p-member.component.css']
})
export class PMemberComponent implements OnInit {

  public pid: any;
  public pname: any;
  public leader:any[]=[];
  public member: any[] = [];
  public position: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
    });

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
