import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import axios from 'axios';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  
 
  minDateValue:any;
  minDateValue2:any;
  minDateValue3:any
  public httpOptions;
  public headers: HttpHeaders = new HttpHeaders({
    'Authorization': localStorage.getItem("token")});
  startDate:any;
  st:any;
  en:any;
  uploadUrl:any;


 
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
    this.minDateValue3 = new Date(this.minDateValue2.getTime() + 24 * 60 * 60 * 1000);
   
    this.uploadUrl = 'http://106.54.82.100:81/api/create_course';
    this.buildForm();
   

  }

  buildForm() {
    this.creatcForm = this.fb.group({
      'taskname': ['', [Validators.required,Validators.maxLength(20)]],
      'taskcon': ['', [Validators.required, Validators.maxLength(100)]],
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
    const uploadsFile = <HTMLInputElement>document.getElementById("myfile");
    const file = uploadsFile.files[0];
    let input = new FormData();
    
    input.append("file", file);
    var params = JSON.stringify({
      "course_name": this.creatcForm.get('taskname').value,
      "description": this.creatcForm.get('taskcon').value,
      "start_time": startDate,
      "end_time": endDate
    });
    input.append('params',params);
   
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
    },error => {

      if (error.error.message == "failure") {
        this.position = "top";
        this.confirmationService.confirm({
          message: "新建失败，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });

      } else if (error.error.message == "parameter error") {
          this.position = "top";
          this.confirmationService.confirm({
            message: "参数不合法，请重试！",
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });

      } else if (error.error.message == "An image is required") {
          this.position = "top";
          this.confirmationService.confirm({
            message: "上传文件非图片，请重试！",
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });

        } 

    },


    )

  }





  ngOnInit(): void {
  }

}
