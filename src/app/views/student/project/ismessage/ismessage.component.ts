import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { HttpRequestService } from '../../../../services/http-request.service'
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ismessage',
  templateUrl: './ismessage.component.html',
  styleUrls: ['./ismessage.component.css']
})
export class IsmessageComponent implements OnInit {
  public messages:any[] = [];
  public readmessage:any[]=[];
  public num:any=0;
  position:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) { 
    this.getmessages() ;
  }


  getmessages() {
    this.httpRequest.httpGet("messages", {}).subscribe((val: any) => {
      if (val.message == undefined) {
         this.messages = [];
         this.readmessage = [];
        val.supervises.forEach(element => {
          if (element.isRead == 0) {
            this.messages.push(element);
          }else{
            this.readmessage.push(element);
          }

        });
        this.num = this.messages.length;
      } else {
       this.num = 0;
     
      }

    })
  }

  delect(uid, tid){
    this.httpRequest.httpGet("delete_message", { "superviseUserId": uid,"task_id":tid}).subscribe((val: any) => {
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
        this.getmessages();
      } else {

       
      }

    })

  }

  ngOnInit(): void {
  }

}
