import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-c-pj-list',
  templateUrl: './c-pj-list.component.html',
  styleUrls: ['./c-pj-list.component.css']
})
export class CPjListComponent implements OnInit {
  public cid: any;
  public project_id:any;
  public pname: any;
  public pstart_time:any;
  public pend_time: any;
  public pintroduce:any;
  public plist: any[] = [];
  public position: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.cid = queryParams.cid;
    });

  }

  add(id){
    this.httpRequest.httpGet("add_project", { "project_id": id }).subscribe((val: any) => {
      if (val.message == "success") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '添加成功！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getPjlist();
      } else {
        
      }
    })
  }

  getPjlist(){
    this.httpRequest.httpGet("unselected_projects", { "course_id": this.cid }).subscribe((val:any)=>{
      if (val.message == undefined) {
this.plist = val.projects
      }else{
        
      }
    })
  }


  ngOnInit(): void {
    this.getPjlist();
  }

}
