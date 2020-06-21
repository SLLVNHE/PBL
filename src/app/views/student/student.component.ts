import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public course_id:any;
  public cname:any;



  constructor(
    private activatedRoute: ActivatedRoute, 
    public httpRequest: HttpRequestService,
    private router: Router,
  ) { 
    activatedRoute.queryParams.subscribe(queryParams => {    
      this.course_id = queryParams.cid;   
    });
   
  }

  getC(){
    this.httpRequest.httpGet("course_basic_info", {"course_id":this.course_id}).subscribe((val:any)=>{
      if (val.message == undefined){
        this.cname = val.course_name;
     
      }else{
        
      }
    })

  }

  ngOnInit(): void {
     this.getC();
  }

}
