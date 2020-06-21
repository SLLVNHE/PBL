import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgModel, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { HttpRequestService } from '../../../services/http-request.service'
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  public tips = "获取邮箱验证码";
  public disabled = false;
  public eye: any;
  public type: any = "password";
  public className = "pi pi-eye-slash";
  position: string;
  public divH1: boolean = true;
  public divH2: boolean = false;
  public divH11: boolean = false;
  public divH22: boolean = false;
  public content = "验证身份";
  public email :any;
  public p1: any
  public p2: any;

  public form1: FormGroup;
  public form2: FormGroup;
  constructor(
    private fb: FormBuilder,
    public httpRequest: HttpRequestService,
    public http: HttpClient,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.buildForm1();
    this.buildForm2();
  }

  buildForm1() {
    this.form1 = this.fb.group({
      'Psd1': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      'Psd2': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      'Psd3': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    })
  }

  buildForm2() {
    this.form2 = this.fb.group({

      'verifyCode': ['', [Validators.required]],
      'P1': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      'P2': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
    })
  }

  next() {
    this.divH1 = false;
    this.divH2 = true;
    this.divH11 = true;
    this.content = "设置密码";
  }

  next2() {
    this.divH11 = false;
    this.divH22 = true;
    this.content = "设置密码";
  }

  exit(){
    this.divH1 = true;
    this.divH2 = false;
    this.divH11 = false;
  }



/**
 * 获取邮箱
 */
  getUserInfo() {
    this.httpRequest.httpGet("view_personal_info", {}).subscribe((val: any) => {
      if (val.message == 'success') {
        this.email = val.email;

      } else {
        this.position = "top";
        this.confirmationService.confirm({
          message: "加载失败请刷新重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      }

    })
  }


  /**
    * 
    * @param event 获取验证码，及相应操作
    */
  getCode(position) {
    const dates = {
      'email': this.email
    };
    this.httpRequest.httpGet("forget_email", dates).subscribe((val: any) => {
      
      if (val.message == "send successfuly") {
        //发送成功
        this.position = position;
        this.confirmationService.confirm({
          message: '发送成功，请查收',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      } else if (val.message == "account does not exist") {

        this.position = position;
        this.confirmationService.confirm({
          message: '账户不存在，请重新确认',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      } else if (val.message == "send failed") {

        this.position = position;
        this.confirmationService.confirm({
          message: '发送失败，请重试！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      }
      else {
        //失败
        this.position = position;
        this.confirmationService.confirm({
          message: '操作过于频繁（一个邮箱一分钟只能发一次）！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      }
    },
      error => {

        if (error.error.message == "send failed") {
          this.position = "top";
          this.confirmationService.confirm({
            message: "发送失败，请重试！",
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });

        } else if (error.error.message == "Operate too frequently") {
          this.confirmationService.confirm({
            message: '操作过于频繁（一个邮箱一分钟只能发一次）！',
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

    let number = 60;
    this.disabled = true;
    const that = this;
    that.tips = number + 's后重新获取';
    const timer = setInterval(function () {
      number--;
      if (number === 0) {
        that.disabled = false;
        that.tips = '获取邮箱验证码';
        clearInterval(timer);
      } else {
        that.tips = number + 's后重新获取';
      }
    }, 1000);
  }


  showPsd() {
    if (this.className == "pi pi-eye-slash") {
      this.type = "text";
      this.className = "pi pi-eye";
    } else {
      this.type = "password";
      this.className = "pi pi-eye-slash";
    }
  }



  onSubmit1(position) {
    this.httpRequest.httpPost("modify_password", {
      "oldPass": this.form1.get("Psd1").value,
      "newPass": this.form1.get("Psd3").value,
    }).subscribe((val: any) => {
      if (val.message == 'success') {
        //注册成功 跳转到登录或者直接到主页面
        this.position = position;
        this.confirmationService.confirm({
          message: '修改成功，请重新登录',
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptIcon: "pi",
          acceptLabel: '去登录',
        
          rejectVisible: false,
          accept: () => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          },
          reject: () => { 
          },
          key: "positionDialog"
        });
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      } else if (val.message == "incorrect old password") {

        this.position = position;
        this.confirmationService.confirm({
          message: '原密码错误，请重试或使用其他方式！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      }
      else {
        //失败
        this.position = position;
        this.confirmationService.confirm({
          message: '修改失败，请重试！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });

      }
    },
     error => {

        if (error.error.message == "incorrect old password") {
          this.position = "top";
          this.confirmationService.confirm({
            message: "密码错误，请重试！",
            header: '提示',
            icon: 'pi pi-info-circle',
            //  acceptVisible:false,
            acceptLabel: '确认',
            rejectVisible: false,
            key: "positionDialog"
          });

        } else if (error.error.message == "param error") {
          this.confirmationService.confirm({
            message: '参数不完整，请重试！',
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

  onSubmit2(position){
    this.httpRequest.httpPost("forget_password", {
      "password": this.form2.get("P2").value,
      "email": this.email,
      "code": this.form2.get("verifyCode").value
    }).subscribe((val: any) => {

      if (val.message == 'change password success') {
        //注册成功 跳转到登录或者直接到主页面
        this.position = position;
        this.confirmationService.confirm({
          message: '修改成功，请重新登录',
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptIcon: "pi",
          acceptLabel: '去登录',
          rejectVisible: false,
          accept: () => {
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          },
          reject: () => { },
          key: "positionDialog"
        });
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      } else if (val.message == "Verification code error") {

        this.position = position;
        this.confirmationService.confirm({
          message: '验证码错误，请填写正确验证码！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      }
      else {
        //失败
        this.position = position;
        this.confirmationService.confirm({
          message: '修改失败，请重试！',
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
    this.getUserInfo();
  }

}
