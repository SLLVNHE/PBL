import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  
 
  minDateValue:any;
  minDateValue2:any;
  public httpOptions;
  public headers: HttpHeaders = new HttpHeaders({
       'Authorization': localStorage.getItem("token"), "Content-Type": undefined,});
  startDate:any;
  st:any;
  en:any;


 
  creatcForm: FormGroup;

  public position: any;

  constructor(
    public http: HttpClient,
   
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {
    this.minDateValue = new Date();
    this.minDateValue2 = new Date(this.minDateValue.getTime() + 24 * 60 * 60 * 1000);
   
    this.buildForm();
   

  }

  buildForm() {
    this.creatcForm = this.fb.group({
      'taskname': ['', [Validators.required]],
      'taskcon': ['', [Validators.required]],
      'start': ['', [Validators.required]],
      'end': ['', [Validators.required]],
      'file': ['', [Validators.required]],
     
    })
  }


  clean() {
    this.buildForm();
  }

  onSubmit() {

    

    var startDate = new Date(this.creatcForm.get('start').value);
    var endDate = new Date(this.creatcForm.get('end').value);

    let input = new FormData();
    input.append("file", this.creatcForm.get('file').value);
    var params = JSON.stringify({
      "course_name": this.creatcForm.get('taskname').value,
      "description": this.creatcForm.get('taskcon').value,
      "start_time": startDate,
      "end_time": endDate
    });
   
    this.httpOptions = { headers: this.headers, };
    this.httpRequest.httpPostFile("create_course",input).subscribe((val: any) => {

      //成功
      if (val.message == "success") {


        this.confirmationService.confirm({
          message: "保存成功！",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.buildForm();

      } else {
        this.confirmationService.confirm({
          message: "保存失败，请重试",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        })
      }
    })

  }





  ngOnInit(): void {
  }

}
