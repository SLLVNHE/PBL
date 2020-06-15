import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgModel, Validators } from '@angular/forms'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { HttpRequestService } from '../../../services/http-request.service'
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';   


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  public email:any;
  public nickname:any; 
  public name: any;
  public gender: any; 
  public signature: any;
  public birthday:any;
  val1 :string='';
  position: string;

  constructor(private fb: FormBuilder,
    public httpRequest: HttpRequestService,
    public http: HttpClient,
    private confirmationService: ConfirmationService,
    private router: Router,
   
  ) {
   
  }




/**
 * 初始化数据
 */
getUserInfo(){
  this.httpRequest.httpGet("view_personal_info", {}).subscribe((val: any) => {
    if (val.message == 'success') {
      this.email = val.email;
      this.name = val.name;
      this.nickname = val.nickname;
      this.gender = val.gender;
      this.signature = val.signature;
      if(val.birthday != undefined){
         this.birthday = new Date(val.birthday)
      }
  
     if (this.gender == 0) {
       this.val1 = "男";
      } else if (this.gender == 1) {
        this.val1 = '女';
      }else{
         this.val1 = '';
      }

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


  
  ngOnInit() {
    this.getUserInfo();
  }


   
  
  
  async setinfo(position){
      var asyncResult1:any;
      var asyncResult2: any;
      var asyncResult3: any;
      var asyncResult4: any;
      var message = '';

    if(this.nickname == undefined){
      // asyncResult1 = await this.httpRequest.httpGet("modify_nickname", { 'nickname': " " }).toPromise();
    }else{
      asyncResult1 = await this.httpRequest.httpGet("modify_nickname", { 'nickname': this.nickname}).toPromise();
    }
   
    if (asyncResult1.message != 'success'){
      message = message +"昵称保存失败！ ";
    }

   if (this.val1 == "男"){
     asyncResult2 = await this.httpRequest.httpGet("modify_gender", { 'gender': 0 }).toPromise();
    }else if(this.val1 == "女"){
     asyncResult2 = await this.httpRequest.httpGet("modify_gender", { 'gender': 1 }).toPromise();
    }else{
        console.log("这里",this.gender)
    }
  
    if (asyncResult2.message != 'success') {
      message = message + "性别保存失败！ ";
    }


   
    if(this.signature == ""){
      asyncResult3 = await this.httpRequest.httpGet("modify_signature", { 'signature': " " }).toPromise();
    }else{
       asyncResult3 = await this.httpRequest.httpGet("modify_signature", { 'signature': this.signature }).toPromise();
    }
   
    if (asyncResult3.message != 'success') {
      message = message + "个性签名保存失败！ ";
    }


    if(this.birthday == null){
     
    }else{
      var myDate = new Date(this.birthday);
    asyncResult4 = await this.httpRequest.httpGet("modify_birthday", { 'birthday': myDate }).toPromise();
     
    if (asyncResult4.message != 'success') {
      message = message + "生日保存失败！ ";
    }
    }
   

    this.position = position;
    if (message == ""){    
     
      this.confirmationService.confirm({
      message: "保存成功！",
      header: '提示',
      icon: 'pi pi-info-circle',
      acceptLabel: '确认',
      rejectVisible: false,
        accept: () => {
          location.reload();
        },
      key: "positionDialog"
    });
    
    }else{
      this.confirmationService.confirm({
        message: message,
        header: '提示',
        icon: 'pi pi-info-circle',
        acceptLabel: '确认',
        rejectVisible: false,
        key: "positionDialog"
    })
  }
      this.getUserInfo();
    

}

}