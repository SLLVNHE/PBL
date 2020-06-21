import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { MessageService } from 'primeng/api'
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-p-files',
  templateUrl: './p-files.component.html',
  styleUrls: ['./p-files.component.css']
})
export class PFilesComponent implements OnInit {
  userimg: any;
  asyncResult: any;
  uploadUrl: string;
  public httpOptions;
  uploadedFiles: any[] = [];
  public headers: HttpHeaders = new HttpHeaders({ 'Authorization': localStorage.getItem("token") });
  public pid: any;
  public files: any[] = [];
  public position: any;
  public sid:any;
  cid:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    public http: HttpClient,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {
    
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
      this.cid = queryParams.cid;
    });
    this.uploadUrl = 'http://106.54.82.100:81/api/upload_file';
    this.sid = localStorage.getItem("id");
    this.getfiles();
}

  
  myUploader(event): void {
    if (event.files.length == 0) {
      console.log('No file selected.');
      return;
    }
    var fileToUpload = event.files[0];
    let input = new FormData();
    input.append("file", fileToUpload);
    input.append("project_id", this.pid)
    this.httpOptions = { headers: this.headers, };
   
    this.http.post(this.uploadUrl, input, this.httpOptions).subscribe((val: any) => {

      //成功
      if (val.message == "success") {

        this.position = "top";
        this.confirmationService.confirm({
          message: "保存成功！",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          accept: () => {

           location.reload();
          },
          rejectVisible: false,
          key: "positionDialog"
        });
        // this.getfiles();
      
      } else {
        this.position = "top";
        this.confirmationService.confirm({
          message: "保存失败，请重试",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        })
      }
    }, error => {

      if (error.error.message == "failure") {
        this.position = "top";
        this.confirmationService.confirm({
          message: "上传失败，文件过大，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });

      } 
    }
    );
  }

  // upload completed event

  onUpload(event): void {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles)
  }
  onBeforeSend(event): void {
    event.xhr.setRequestHeader('Authorization', localStorage.getItem("token"));
  }



  getfiles() {
    this.httpRequest.httpGet("files", { "project_id": this.pid }).subscribe((val: any) => {
      if (val.message == undefined) { this.files = val.files;
       
      } else {
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
       
      }
    })
  }


  download(file_id, name) {
    this.httpRequest.httpGetFile("download_file", { "file_id": file_id}, "arraybuffer").subscribe((val: any) => {
      this.downloadFile(val, name);
    }, error => {

      if (error.error.message == "failure") {
        this.position = "top";
        this.confirmationService.confirm({
          message: "下载失败，请重试！",
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });

      }
    }
    )

  }

  /**
   * 创建blob对象，并利用浏览器打开url进行下载
   * @param data 文件流数据
   */
  downloadFile(data, name) {
    // 下载类型 xls
    const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    // 下载类型：csv
    const contentType2 = 'text/csv';
    
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    // 打开新窗口方式进行下载
    // window.open(url); 

    // 以动态创建a标签进行下载
    const a = document.createElement('a');

    a.href = url;
   
    a.download = name + '.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  }


  delete_file(file_id){
    this.httpRequest.httpGet("delete_file", {"file_id":file_id}).subscribe((val:any)=>{
      if (val.message == "success"){
        this.position = "top";
        this.confirmationService.confirm({
          message: "删除成功",
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptIcon: "pi",
          acceptLabel: '确认',
          rejectVisible: false,
          accept: () => {
            this.getfiles();
          },
          reject: () => { },
          key: "positionDialog"
        });
      }
    })
  }

  ngOnInit(): void {
  }

}
