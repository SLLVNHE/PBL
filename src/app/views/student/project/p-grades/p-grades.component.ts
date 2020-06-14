import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-p-grades',
  templateUrl: './p-grades.component.html',
  styleUrls: ['./p-grades.component.css']
})
export class PGradesComponent implements OnInit {
  public p_id: any;
  public status:any;
  public teacher_grade: any;
  public self_grade: any;
  public mutual_grade: any;
  public grade:any;
  public Identity: any;
  public Id: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.p_id = queryParams.pid;
      this.Identity = queryParams.leader;
      this.status = queryParams.status;
    });  
  }


  getP() {
    this.httpRequest.httpGet("view_score", { "project_id": this.p_id }).subscribe((val: any) => {
      if (val.message == "failure") {
        //失败

      } else {

        if (val.teacher_grade == -1){
          this.teacher_grade = "该项成绩暂未给出";
        }else{
          this.teacher_grade = val.teacher_grade;
        }
        if (val.self_grade == -1) {
          this.self_grade = "该项成绩暂未给出";
        } else {
          this.self_grade = val.self_grade;
        }
        if (val.mutual_grade == -1) {
          this.mutual_grade = "该项成绩暂未给出";
        } else {
          this.mutual_grade = val.mutual_grade;
        }
   
        this.grade = val.grade;
      }
    })

  }

  ngOnInit(): void {
    this.getP();
  }

}
