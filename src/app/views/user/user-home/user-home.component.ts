import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  name: string;
  val1: any;
  image: any;
 
  userimg: any;
  info: any;
  public email: any;
  public nickname: any;
  public gender: number;
  public signature: any;
  public birthday: any;
  position: string;
  value: number = 0;
  constructor(
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  getUserInfo() {
    this.httpRequest.httpGet("view_personal_info", {}).subscribe((val: any) => {
      
      if (val.message == 'success') {
        this.email = val.email;

        this.nickname = val.nickname;
        this.gender = val.gender;
        if(val.signature != undefined){
           this.signature = val.signature;
        }else{
          this.signature ="这里空空如也"
        }
       
        

        if (this.gender == 0) {
            this.val1 = 'imga';
        } else if (this.gender == 1) {
          this.val1 = 'imgb';
        } else {
         
        }

        if (this.nickname != "") {
          this.name = this.nickname;
        } else {

          this.name = this.email;
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

  getUserAvatar() {
    this.httpRequest.httpGet("view_avatar", {}).subscribe((val: any) => {
    
      this.image = "http://118.190.235.55/" + val.message;
    })
  }
  ngOnInit(): void {

    this.getUserInfo();
    this.getUserAvatar();

    let interval = setInterval(() => {
      this.value = this.value + Math.floor(Math.random() * 10) + 1;
      if (this.value >= 100) {
        this.value = 100;
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
        clearInterval(interval);
      }
    }, 2000);
  }

}
