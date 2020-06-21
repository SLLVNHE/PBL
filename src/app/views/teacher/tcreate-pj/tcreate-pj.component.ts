import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tcreate-pj',
  templateUrl: './tcreate-pj.component.html',
  styleUrls: ['./tcreate-pj.component.css']
})
export class TcreatePjComponent implements OnInit {

  minDateValue: any;
  minDateValue2: any;
  minDateValue3:any;
  public httpOptions;
  public headers: HttpHeaders = new HttpHeaders({ 'Authorization': localStorage.getItem("token") });
  startDate: any;
  st: any;
  en: any;
  val1:any=0;
  val2: any = 0;
  val3: any = 0;
  public course_id:any;


  creatcForm: FormGroup;

  public position: any;

  constructor(
    public http: HttpClient,

    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.course_id = queryParams.cid;
    });
    this.minDateValue = new Date();
    this.minDateValue2 = new Date(this.minDateValue.getTime() + 24 * 60 * 60 * 1000);
    this.minDateValue3 = new Date(this.minDateValue2.getTime() + 24 * 60 * 60 * 1000);

    this.buildForm();


  }

  buildForm() {
    this.creatcForm = this.fb.group({
      'taskname': ['', [Validators.required, Validators.maxLength(20)]],
      'taskcon': ['', [Validators.required, Validators.maxLength(250)]],
      'start': ['', [Validators.required]],
      'end': ['', [Validators.required]],
      'val1': ['', [Validators.required]],
      'val2': ['', [Validators.required]],
      'val3': ['', [Validators.required]],

    })
  }


  clean() {
    this.buildForm();
  }

  onSubmit() {

    var startDate = new Date(this.creatcForm.get('start').value);
    var endDate = new Date(this.creatcForm.get('end').value);

    
    this.httpRequest.httpPost("create_project", { 
      course_id: this.course_id, 
      name: this.creatcForm.get('taskname').value,
      description: this.creatcForm.get('taskcon').value,
      start_time: startDate,
      end_time: endDate,
      teacher_proportion: this.creatcForm.get('val1').value,
      self_proportion: this.creatcForm.get('val2').value,
      mutual_proportion: this.creatcForm.get('val3').value,

    }).subscribe((val: any) => {

      //成功
      if (val.message == "success") {


        this.confirmationService.confirm({
          message: "创建成功！",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.buildForm();

      } else {
        this.confirmationService.confirm({
          message: "新增失败，请重试",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        })
      }
    }, error => {

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

      } else if (error.error.message == "course not found"){
        this.confirmationService.confirm({
          message: "课程不存在，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      } else if (error.error.message == "Time parameter error") {
        this.confirmationService.confirm({
          message: "项目时间错误，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      }
    }
    )

  }





  ngOnInit(): void {
  }

}
