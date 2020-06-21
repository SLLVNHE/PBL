import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-p-alltask-list',
  templateUrl: './p-alltask-list.component.html',
  styleUrls: ['./p-alltask-list.component.css']
})
export class PAlltaskListComponent implements OnInit {
  public pid: any;
  public Identity:any;
  public pname: any;
  public tasks: any[] = [];
  add1:any;
  add2:any;
  role:any;
  

  member: any[]=[];
  men:any[];
  leader:any[];
  selected: any[] = [];
  taskname:any;
  taskForm: FormGroup;
 cid:any;
  public position: any;
  minDateValue: any;
  minDateValue2: any;
  minDateValue3: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {
    this.add1 = false;
    this.add2 = true;
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
      this.Identity = queryParams.leader;
      this.cid = queryParams.cid;
    });
    this.buildForm();
    this.getall() 
    this.role = localStorage.getItem("role")
    this.minDateValue = new Date();
    this.minDateValue2 = new Date(this.minDateValue.getTime() + 24 * 60 * 60 * 1000);
    this.minDateValue3 = new Date(this.minDateValue2.getTime() + 24 * 60 * 60 * 1000);
}

  buildForm() {
    this.taskForm = this.fb.group({
      'taskname': ['', [Validators.required, Validators.maxLength(20)]],
      'taskcon': ['', [Validators.required, Validators.maxLength(250)]],
      'start': ['', [Validators.required]],
      'end': ['', [Validators.required]],
      'import': ['', [Validators.required]],
      'selected': ['', [Validators.required]],     
    })
  }


  clean(){
    this.add1 = false;
    this.add2 = true;
    this.buildForm();
  }

  onSubmit() {

    var startDate = new Date(this.taskForm.get('start').value);
    var endDate = new Date(this.taskForm.get('end').value);
    this.httpRequest.httpPost("set_task", 
      {
        project_id: this.pid, 
        name: this.taskForm.get('taskname').value, 
        introduce: this.taskForm.get('taskcon').value ,
        start_time: startDate,
        end_time: endDate,
        importance: this.taskForm.get('import').value,
        assign: this.taskForm.get('selected').value,
      })
      .subscribe((val: any) => {

        if (val.message == "success") {
          this.position = "top";
          this.confirmationService.confirm({
            message: '发布成功',
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });
          this.add1 = false;
          this.add2 = true;
          this.getall();
          this.buildForm();
        } else {


        }


      },
        error => {

          if (error.error.message == "failure") {
            this.position = "top";
            this.confirmationService.confirm({
              message: "发布失败，请重试！",
              header: '提示',
              icon: 'pi pi-info-circle',
              //  acceptVisible:false,
              acceptLabel: '确认',
              rejectVisible: false,
              key: "positionDialog"
            });
            this.buildForm();
          }

        },
      
      )
  }


  getmember() {
    this.httpRequest.httpGet("group_members", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == undefined) {
       
        this.men = val.others;
        this.leader = val.group_leaders;
        
        this.men.forEach(element => {
          var item = {};
          item["label"] = element.student_name;
          item["value"] = element.student_id;
          this.member.push(item);
        });
        this.leader.forEach(element => {
          var item = {};
          item["label"] = element.student_name;
          item["value"] = element.student_id;
          this.member.push(item);
        });
        
      } else {
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

      }
    })
  }

add(){
  this.add1 = true;
  this.add2 = false;
}

  getall() {
    this.httpRequest.httpGet("all_tasks", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == undefined) { 
        this.tasks = val.tasks;
       
      } else {
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
       
      }
    })
  }


  ngOnInit(): void {
    this.getmember();
  }

}
