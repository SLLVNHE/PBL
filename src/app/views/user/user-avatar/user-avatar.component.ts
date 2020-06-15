import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { HttpRequestService } from '../../../services/http-request.service'
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api'
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationExtras } from '@angular/router'


@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css'],
  providers: [MessageService]
})
export class UserAvatarComponent implements OnInit {
  userimg :any;
  position: string;
  asyncResult :any;
  uploadUrl: string;
  public httpOptions;
  uploadedFiles: any[] = [];
  public headers: HttpHeaders = new HttpHeaders({ 'Authorization': localStorage.getItem("token") });
  
  constructor(
    public httpRequest: HttpRequestService,
    public http: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private router :Router,
  ) {
    this.uploadUrl = 'http://106.54.82.100:81/api/modify_avatar';
  }

    myUploader(event): void {
    if (event.files.length == 0) {
      console.log('No file selected.');
      return;
    }
    var fileToUpload = event.files[0];
    let input = new FormData();
    input.append("avatar", fileToUpload);
    this.httpOptions = { headers: this.headers, };
    this.http.post(this.uploadUrl, input, this.httpOptions).subscribe((val:any) => {
     
      //成功
      if (val.message == "success"){
        
        
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
         this.getUserAvatar();
        
      }else{
        this.confirmationService.confirm({
          message:"保存失败，请重试",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        })
      }




    });
  }

  // upload completed event

  onUpload(event): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  onBeforeSend(event): void {
    event.xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
  }





/**
 * 二进制流
 */
  // getUserAvatar() {
  //   this.httpRequest.httpGetFile("view_avatar", {}, "arraybuffer").subscribe((val: any) => {
  //     // var blob = new Blob([val], { type: "image/jpeg" });
  //     // this.userimg = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
     
  //   })
  // }


  /**
   * 获取头像
   */
  getUserAvatar() {
    this.httpRequest.httpGet("view_avatar", {}).subscribe((val: any) => {
      if (val.message != "failure"){
         this.userimg = "http://118.190.235.55/" + val.message;
      }else{
        
      }
     
    })
  }



  ngOnInit() {
   this.getUserAvatar();
  }

}
