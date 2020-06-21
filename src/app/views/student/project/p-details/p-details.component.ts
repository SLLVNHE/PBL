import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-p-details',
  templateUrl: './p-details.component.html',
  styleUrls: ['./p-details.component.css']
})
export class PDetailsComponent implements OnInit {
  public p_id: any;
  public project_name: any;
  public introduce: any;
  public start_time: any;
  public end_time: any;
  public teacher_proportion:any;
  public self_proportion:any;
  public mutual_proportion:any;
  public Identity:any;
  public Id:any;
  cid:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.p_id = queryParams.pid;
      this.Identity = queryParams.leader;
      this.cid = queryParams.cid;
      if(this.Identity == 1){
        this.Id = "组长";
      } else if (this.Identity == 0){
         this.Id = "组员";
      }
      else{
        this.Id = "老师";
      }
    }); 
  }

  getP() {
    this.httpRequest.httpGet("project_basic_info", { "project_id": this.p_id }).subscribe((val: any) => {
      if (val.message == undefined) {
        //失败
  this.project_name = val.project_name;
        this.introduce = val.introduce;
        this.start_time = val.start_time;
        this.end_time = val.end_time;
        this.teacher_proportion = val.teacher_proportion;
        this.self_proportion = val.self_proportion;
        this.mutual_proportion = val.mutual_proportion;
      } else {
      

      }
    })

  }

  ngOnInit(): void {
    this.getP()
  }

}
