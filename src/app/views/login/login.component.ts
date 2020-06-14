import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, NgModel, Validators} from '@angular/forms'
import { HttpRequestService } from '../../services/http-request.service'
import { StorageService } from '../../services/storage.service'
import { Router, NavigationExtras} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:any;
  public password: any;
 
 
 
  loginForm: FormGroup;
  constructor( 
    private fb:FormBuilder,
    public httpRequest : HttpRequestService,
    public storage : StorageService,
    private router : Router,
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
  
   this.httpRequest.httpPost("login", { email: this.loginForm.get('loginEmail').value, password: this.loginForm.get('loginPsd').value})
   .subscribe((val:any) => {
    
     //登录成功 加token 跳转到主页
     if (val.message == "success"){
       this.storage.setToken(val.token);  
       localStorage.setItem('user', this.loginForm.get('loginEmail').value );
       localStorage.setItem('id', val.id);
       localStorage.setItem("role", val.role);
      //  let navigationExtras: NavigationExtras = {
      //    queryParams: { 'email': this.loginForm.get('loginEmail').value },
      //    fragment: 'anchor'
      //  };
      // 跳转？？
      
      if(val.role == 0){
        
         this.router.navigate(['/pblshome']);
      } else if (val.role == 1) {
       console.log("老师")
        this.router.navigate(['/teacherhome']);
      }else{
        this.router.navigate(['/adminhome']);
      }
      //  switch (val.role) {
      //    case 0:
      //      console.log("daozheli")
          
      //      break;
      //    case 1:
          
      //      break;
      //    case 2:
           
      //      break;
      //    default:         
      //  } 


     } else if (val.message == "wrong password"){
       console.log("密码错误")
     



     }
     
     
   })


 }

}
