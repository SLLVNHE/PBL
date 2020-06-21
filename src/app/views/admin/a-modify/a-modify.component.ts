import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-a-modify',
  templateUrl: './a-modify.component.html',
  styleUrls: ['./a-modify.component.css']
})
export class AModifyComponent implements OnInit {
  public uid:any;

 
  public httpOptions;
  public headers: HttpHeaders = new HttpHeaders({ 'Authorization': localStorage.getItem("token") });
  startDate: any;
  st: any;
  en: any;
  public email: any ;
  public nickname: any;
  public name: any;
  public gender: any;
  public signature: any;
  public self_proportion: any;
  public birthday: any;
  val1: string = '';
  maxDateValue: any;



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
      this.uid = queryParams.uid;
    });
    this.maxDateValue = new Date()
    this.getP();

   


  }


  getP() {
    this.httpRequest.httpGet("view_user", { "id": this.uid }).subscribe((val: any) => {
      if (val.message == undefined) {
       
  this.email = val.email;
        this.name = val.name;
        this.nickname = val.nickname;
        this.gender = val.gender;
        this.signature = val.signature;
        if (val.birthday != undefined) {
          this.birthday = new Date(val.birthday)
        }

        if (this.gender == 0) {
          this.val1 = "男";
        } else if (this.gender == 1) {
          this.val1 = '女';
        } else {
          this.val1 = '';
        }
      }  else {
     
      

      }
    })

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
    this.httpRequest.httpPostFile("create_course", input).subscribe((val: any) => {

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


setinfo(position) {
   
    if (this.nickname == undefined) {
      this.nickname= "" ;
    }

  if (this.name == undefined) {
      this.name = "";
    }
  if (this.signature == undefined) {
     this.signature ="";
    } 

    if (this.val1 == "男") {
      this.gender = 0;
    } else if (this.val1 == "女") {
      this.gender = 1;
    } else {
     
    }

  if (this.birthday == undefined) {
    this.birthday ="";
    } else {
      var myDate = new Date(this.birthday);
      this.birthday = myDate
    }

  
    this.httpRequest.httpPost("modify_user", {
      "id":this.uid, "nickname": this.nickname, "name": this.name, "gender": this.gender,   "signature": this.signature, "birthday":this.birthday}).subscribe((val:any)=>{
        this.position = position;
        if (val.message == "success") {

      this.confirmationService.confirm({
        message: "保存成功！",
        header: '提示',
        icon: 'pi pi-info-circle',
        acceptLabel: '确认',
        rejectVisible: false,
        key: "positionDialog"
      });

    } else {
      this.confirmationService.confirm({
        message: "保存失败！",
        header: '提示',
        icon: 'pi pi-info-circle',
        acceptLabel: '确认',
        rejectVisible: false,
        key: "positionDialog"
      })
    }
      },
        error => {

          if (error.error.message == "failure") {
            this.position = "top";
            this.confirmationService.confirm({
              message: "更改失败，请重试！",
              header: '提示',
              icon: 'pi pi-info-circle',
              //  acceptVisible:false,
              acceptLabel: '确认',
              rejectVisible: false,
              key: "positionDialog"
            });
           
          } else if (error.error.message == "user not found") {
            this.position = "top";
            this.confirmationService.confirm({
              message: "用户不存在！",
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
