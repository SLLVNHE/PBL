import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-realname',
  templateUrl: './user-realname.component.html',
  styleUrls: ['./user-realname.component.css']
})
export class UserRealnameComponent implements OnInit {
  name:any;
  able: any;
  able2:any;
  position:any;


  getUserInfo() {
    this.httpRequest.httpGet("view_personal_info", {}).subscribe((val: any) => {
      if (val.message == 'success') {
       if(val.name == undefined){
         this.name = "";
         this.able = true;
         this.able2=false;
       }else{
          this.name = val.name;
          this.able = false;
          this.able2 = true;
       }
       
console.log(this.name)
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


  constructor(
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  async setinfo(position) {
    var asyncResult1: any;
    var asyncResult2: any;
    var asyncResult3: any;
    var asyncResult4: any;
    var message = '';

    if (this.name == "") {
      asyncResult1 = await this.httpRequest.httpGet("modify_name", { 'name': "" }).toPromise();
    } else {
      asyncResult1 = await this.httpRequest.httpGet("modify_name", { 'name': this.name }).toPromise();
    }

   
    this.position = position;
    if (message == "") {

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
