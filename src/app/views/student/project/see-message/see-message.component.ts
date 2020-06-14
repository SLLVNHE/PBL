import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpRequestService } from '../../../../services/http-request.service'
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-see-message',
  templateUrl: './see-message.component.html',
  styleUrls: ['./see-message.component.css']
})
export class SeeMessageComponent implements OnInit {
  
  public uid:any;
  public tid: any;
  public name:any;
  public cname:any;
  public pname:any;
  public tname:any;
  public time:any;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) { 
    activatedRoute.queryParams.subscribe(queryParams => {
      this.uid = queryParams.uid;
      this.tid = queryParams.tid;
    });
  }


  getmessages() {
    this.httpRequest.httpGet("read_message", { "superviseUserId": this.uid, "task_id":this.tid}).subscribe((val: any) => {
      if (val.message == "failure") {
      
      } else {
        this.name = val.superviseUserName;
        this.cname = val.courseName;
        this.pname = val.projectName;
        this.tname = val.taskName;
        this.time = val.tiem;
     
      }

    })
  }

  ngOnInit(): void {
  }

}
