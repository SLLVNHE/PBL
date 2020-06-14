import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-c-member',
  templateUrl: './c-member.component.html',
  styleUrls: ['./c-member.component.css']
})
export class CMemberComponent implements OnInit {
  public course_id: any;
  public cname: any;
  public cteacher_name: any;
  public member:any[]=[];
  public position:any;



  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.course_id = queryParams.cid;
    });

   }

  getC() {
    this.httpRequest.httpGet("course_basic_info", { "course_id": this.course_id }).subscribe((val: any) => {
      if (val.message == "failure") {
      } else {
        this.cname = val.course_name;
        this.cteacher_name = val.teacher_name;       
      }
    })
  }

  getmember(){
    this.httpRequest.httpGet("course_students", { "course_id": this.course_id }).subscribe((val: any) => {
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
        console.log(val);
        this.member = val.students;
      }
    })
  }

  

  ngOnInit(): void {
    this.getC();
    this.getmember();
  }

}
