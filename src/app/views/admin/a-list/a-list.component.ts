import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-a-list',
  templateUrl: './a-list.component.html',
  styleUrls: ['./a-list.component.css']
})
export class AListComponent implements OnInit {
  plist:any;
  position:any;
  users:any[] =[];

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
  ) {
    this.getmember();
   }


  delete(uid){
    this.httpRequest.httpGet("delete_user", {"id":uid}).subscribe((val: any) => {
      if (val.message == "success") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '删除成功！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getmember();
      } else {
        
      }
    })
  }

  getmember() {
    

    this.httpRequest.httpGet("all_users", { }).subscribe((val: any) => {
      if (val.message == "failure") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '刷新失败，请重试！',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      } else {
      this.users = val.users;
      }
    })
  }

  ngOnInit(): void {
  }

}
