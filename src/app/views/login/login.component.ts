import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, NgModel, Validators} from '@angular/forms'
import { HttpRequestService } from '../../services/http-request.service'
import { StorageService } from '../../services/storage.service'
import { Router, NavigationExtras} from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:any;
  public password: any;
  position:any;
 
 
 
  loginForm: FormGroup;
  constructor( 
    private fb:FormBuilder,
    public httpRequest : HttpRequestService,
    public storage : StorageService,
    private router : Router,
    private confirmationService: ConfirmationService,
    ) {
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this.fb.group({
      'loginEmail': ['',[Validators.required]],
      'loginPsd': ['',[ Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    })
  }
  


  ngOnInit(): void {
  }

  
 onSubmit(){
   localStorage.clear();
   this.httpRequest.httpPost("login", { email: this.loginForm.get('loginEmail').value, password: this.loginForm.get('loginPsd').value})
   .subscribe((val:any) => {
    
     //登录成功 加token 跳转到主页
     if (val.message == "success"){
       this.storage.setToken(val.token);  
       localStorage.setItem('user', this.loginForm.get('loginEmail').value );
       localStorage.setItem('id', val.id);
       localStorage.setItem("role", val.role);
     
      if(val.role == 0){
        
         this.router.navigate(['/pblshome']);
      } else if (val.role == 1) {
    
        this.router.navigate(['/teacherhome/tcourses']);
      }else{
        this.router.navigate(['/adminhome']);
      }
    

     } else if (val.message == "wrong password"){

      this.position="top"
       this.confirmationService.confirm({
         message: '密码错误，请输入正确密码？',
         header: '提示',
         icon: 'pi pi-info-circle',
         //  acceptVisible:false,
         acceptLabel: '确认',
         rejectVisible: false,
        
         key: "positionDialog",
       });
      
     } else if (val.message == "email not found") {

       this.position = "top"
       this.confirmationService.confirm({
         message: '邮箱不存在！',
         header: '提示',
         icon: 'pi pi-info-circle',
         //  acceptVisible:false,
         acceptLabel: '确认',
         rejectVisible: false,

         key: "positionDialog",
       });

     }
     
     
   })


 }

}
