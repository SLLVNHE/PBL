import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgModel, Validators } from '@angular/forms'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {HttpRequestService} from '../../services/http-request.service'
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';   
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
 public tips = "获取邮箱验证码";
 public disabled = false;
 public eye:any;
 public type:any = "password";
 public className = "pi pi-eye-slash";
  

  position: string;

  registerForm : FormGroup;
  constructor(
    private fb: FormBuilder,
    public httpRequest : HttpRequestService,
    public http:HttpClient,
    private confirmationService: ConfirmationService,
    private  router :Router
    ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  buildForm() {
    this.registerForm = this.fb.group({
      'registerEmail': ['', [Validators.required]],
      'verifyCode':['', [Validators.required]],
      'Psd1': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      'Psd2': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    })
  }


  public p1:any
  public p2:any;
  /**
   * 
   * @param event 获取验证码，及相应操作
   */
  getCode(position) {

    const dates = {
      'email': this.registerForm.get('registerEmail').value
    };

   this.httpRequest.httpGet("send_email",dates).subscribe((val:any)=>{
     if (val.message == "send successfuly"){
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
     } else if (val.message == "existed account"){
       //邮箱已被使用
       this.position = position;
       this.confirmationService.confirm({
         message: '该邮箱已被注册，换用新邮箱or直接登录？',
         header: '提示',
         icon: 'pi pi-info-circle',
         acceptIcon: "pi",
         acceptLabel: '去登录',
         rejectVisible: false,
         accept: () => {
           this.router.navigate(['/login']);
         },
         reject: () => { },
         key: "positionDialog"
       });
     } else if (val.message == "send failed"){
       //失败
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
     }else{
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
       
       } else if (error.error.message == "Operate too frequently"){
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
 

  showPsd(){
    if (this.className == "pi pi-eye-slash"){
      this.type = "text";
      this.className = "pi pi-eye";
    }else{
      this.type = "password";
      this.className = "pi pi-eye-slash";
    }
  }
  
/**
 * 提交注册信息
 * @param position 
 */
  onSubmit(position) {
  console.log(this.registerForm.value)
    this.httpRequest.httpPost("register", {
      "password": this.registerForm.get("Psd2").value,
      "email": this.registerForm.get("registerEmail").value,
      "code": this.registerForm.get("verifyCode").value}).subscribe((val:any)=>{
        console.log(val)
        if (val.message == 'success'){
        //注册成功 跳转到登录或者直接到主页面
          this.position = position;
          this.confirmationService.confirm({
            message: '注册成功，去登录',
            header: '提示',
            icon: 'pi pi-info-circle',
            acceptIcon: "pi",
            acceptLabel: '去登录',
            rejectVisible: false,
            accept: () => {
              this.router.navigate(['/login']);
            },
            reject: () => { },
            key: "positionDialog"
          });

        } else if (val.message == "existed account") {
          //邮箱已被使用
          this.position = position;
          this.confirmationService.confirm({
            message: '该邮箱已被注册，换用新邮箱or直接登录？',
            header: '提示',
            icon: 'pi pi-info-circle',
            acceptIcon: "pi",
            acceptLabel: '去登录',
            rejectVisible: false,
            accept: () => {
              this.router.navigate(['/login']);
            },
            reject: () => { },
            key: "positionDialog"
          });
        }  else{
          //失败
          this.position = position;
          this.confirmationService.confirm({
            message: '验证码错误！',
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
}
