import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-c-details',
  templateUrl: './c-details.component.html',
  styleUrls: ['./c-details.component.css']
})
export class CDetailsComponent implements OnInit {
  public course_id :any;
  public cname :any;
  public cdescription:any;
  public cteacher_name:any;
  public cstart_time:any;
  public cend_time:any;


  constructor(
    private activatedRoute: ActivatedRoute, 
    public httpRequest: HttpRequestService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.course_id = queryParams.cid;
    }); 
    
  }


  getC() {
    this.httpRequest.httpGet("course_basic_info", { "course_id": this.course_id }).subscribe((val: any) => {
      if (val.message == undefined) {
      
        this.cname = val.course_name;
        this.cdescription = val.description;
        this.cteacher_name = val.teacher_name;
        this.cstart_time = val.start_time;
        this.cend_time = val.end_time;
      } else {
       
      }
    })

  }

  ngOnInit(): void {
   this.getC();
  }

}
