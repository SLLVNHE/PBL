import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpRequestService } from '../../../services/http-request.service'
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-anavbar',
  templateUrl: './anavbar.component.html',
  styleUrls: ['./anavbar.component.css']
})
export class AnavbarComponent implements OnInit {
  name: string;
  userimg: any;
  info: any;
  public email: any;
  public nickname: any;
  val1: any;
  public gender: number;
  public signature: any;
  public birthday: any;
  position: string;
  imgc: any;
  image: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {

  }


  getUserInfo() {
    this.httpRequest.httpGet("view_personal_info", {}).subscribe((val: any) => {
     
      if (val.message == 'success') {

        this.email = val.email;


        this.gender = val.gender;

        if (this.gender == 0) {
          this.val1 = 'imga';
        } else if (this.gender == 1) {
          this.val1 = 'imgb';
        } else {

        }

        if (val.nickname == undefined) {
          this.name = this.email;
        } else {

          this.name = val.nickname;
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

  }


  quit() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
