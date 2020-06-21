import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgModel, Validators } from '@angular/forms'
import { HttpRequestService } from '../../../services/http-request.service'
import { StorageService } from '../../../services/storage.service'
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-a-create',
  templateUrl: './a-create.component.html',
  styleUrls: ['./a-create.component.css']
})
export class ACreateComponent implements OnInit {
  public email: any;
  public password: any;
  public position:any;



  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    this.buildForm();
   }

  buildForm() {
    this.loginForm = this.fb.group({
      'loginEmail': ['', [Validators.required]],
      'loginPsd': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    })
  }

  cancel() {
    this.buildForm();
  }

  onSubmit() {

    this.httpRequest.httpPost("add_user", { email: this.loginForm.get('loginEmail').value, password: this.loginForm.get('loginPsd').value })
      .subscribe((val: any) => {

        if (val.message == "success") {
          this.position = "top";
          this.confirmationService.confirm({
            message: "保存成功！",
            header: '提示',
            icon: 'pi pi-info-circle',
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });


        } else {
        
        }


      }
        ,
        error => {

          if (error.error.message == "failure") {
            this.position = "top";
            this.confirmationService.confirm({
              message: "添加失败，请重试！",
              header: '提示',
              icon: 'pi pi-info-circle',
              //  acceptVisible:false,
              acceptLabel: '确认',
              rejectVisible: false,
              key: "positionDialog"
            });
            this.buildForm();
          } else if (error.error.message == "existed account") {
            this.position = "top";
            this.confirmationService.confirm({
              message: "账号已存在，请重试！",
              header: '提示',
              icon: 'pi pi-info-circle',
              //  acceptVisible:false,
              acceptLabel: '确认',
              rejectVisible: false,
              key: "positionDialog"
            });
            this.buildForm();
          }

        },)
  }

  ngOnInit(): void {
  }

}
