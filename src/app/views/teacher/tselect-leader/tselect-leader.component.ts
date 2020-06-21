import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tselect-leader',
  templateUrl: './tselect-leader.component.html',
  styleUrls: ['./tselect-leader.component.css']
})
export class TselectLeaderComponent implements OnInit {

  public pid: any;
  public pname: any;
  public leader: any[] = [];
  public member: any[] = [];
  public position: any;
  length1:any;
  length2:any;
  cid:any;



  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
      this.cid = queryParams.cid;
    });

  }


  select(sid){
    this.httpRequest.httpGet("choose_leader", { "project_id": this.pid,"student_id":sid }).subscribe((val: any) => {
      if (val.message == "success") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '选择成功',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getmember();
      } else {
        this.position = "top";
        this.confirmationService.confirm({
          message: '选择失败，请重试！',
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

  getp() {
    this.httpRequest.httpGet("project_basic_info", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == undefined) {  
        this.pname = val.project_name;
      } else {
      

      }
    })
  }

  getmember() {
    this.httpRequest.httpGet("group_members", { "project_id": this.pid }).subscribe((val: any) => {
     
      if (val.message == undefined) {  
        this.member = val.others;
        this.leader = val.group_leaders;
        this.length1 = this.member.length;
        this.length2 = this.leader.length;
       
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
    this.getp();
  }

}
