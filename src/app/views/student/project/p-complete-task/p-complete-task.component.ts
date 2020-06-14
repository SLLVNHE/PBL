import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { MegaMenuItem, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-p-complete-task',
  templateUrl: './p-complete-task.component.html',
  styleUrls: ['./p-complete-task.component.css']
})
export class PCompleteTaskComponent implements OnInit {
  public tid: any;
  public task_name: any;
  public importance: any;
  public start_time: any;
  public end_time: any;
  position: any;
  public iscom: any;
  public is_accomplished: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.tid = queryParams.id;
     
    });
  }

  complished(){
    this.httpRequest.httpGet("complete_task", { "task_id": this.tid }).subscribe((val: any) => {
      if (val.message == "success") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '标记完成成功',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getP()
      } else {
        this.position = "top";
        this.confirmationService.confirm({
          message: '标记完成失败， 请重试！',
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

  getP() {
    this.httpRequest.httpGet("see_task", { "task_id": this.tid }).subscribe((val: any) => {
      if (val.message == "failure") {
        //失败

      } else {
        this.task_name = val.task_name;
        this.importance = val.importance;
        this.start_time = val.start_time;
        this.end_time = val.end_time;
      
        this.is_accomplished = val.is_accomplished;

      }
    })

  }

  ngOnInit(): void {
  }

}
