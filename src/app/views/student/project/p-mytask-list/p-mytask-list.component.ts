import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, ConfirmationService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api'
import { HttpRequestService } from 'src/app/services/http-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-p-mytask-list',
  templateUrl: './p-mytask-list.component.html',
  styleUrls: ['./p-mytask-list.component.css']
})
export class PMytaskListComponent implements OnInit {
  public pid: any;
  events: any[]=[];
   x:any[]=[];
  tasks:any[]=[];
  options: any;
  isDataAvailable:any =false;
  see1:any=false;
  position:any;
  leader:any;
  cid:any;


  constructor(
    private router: Router,
    public httpRequest: HttpRequestService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.pid = queryParams.pid;
      this.leader = queryParams.leader;
      this.cid = queryParams.cid;
    });

   
   
   
  }

  see(){
    if(this.see1){
      this.see1 = false;
    }else{
      this.see1 = true;
    }
  }

 getp() {
   this.httpRequest.httpGet("my_tasks", { "project_id": this.pid }).toPromise().then((val: any) => {
  
     if (val.message == undefined) {
       this.tasks = val.tasks;



       val.tasks.forEach(element => {
         var data1 = new Date(element.start_time);
       
         var data2 = new Date(element.end_time)
         var temp = {};
         temp["id"] = element.task_id;

         temp["start"] = data1;
         temp["end"] = data2;

         if (!element.is_accomplished) {

           temp['backgroundColor'] = "red";
           temp['borderColor'] = "red";
           temp["title"] = element.task_name + "（未完成）";
         } else {
           temp["title"] = element.task_name + "（已完成）";

         }

         this.events.push(temp);
       });

     }  else {
      
      



     }  
     this.isDataAvailable = true;
   })
  
  }

  com(id){
    this.httpRequest.httpGet("complete_task", { "task_id": id }).subscribe((val:any)=>{
     
      if (val.message == "success"){
        this.position = "top";
        this.confirmationService.confirm({
          message: '标记完成成功',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getp()
      }else{
        this.position = "top";
        this.confirmationService.confirm({
          message: '标记完成失败， 请重试！',
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

  ngOnInit() {

    this.getp()
    
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      

      header: {
        left: 'prevYear,prev,next,nextYear',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'

      },
      locale: "zh-cn",
      buttonText: {
        prevYear:"上一年", 
        prev:"", 
        next:"", 
        nextYear:"下一年",
        month: "月",
        week: "周",
        day: "天",
      },
      height:600,
      aspectRatio:1.2,
      eventClick: (e) => {
        console.log(e.event)
        var id = e.event.id;
        
        this.router.navigate(['/pblshome/studentp/complete'], { queryParams: {cid:this.cid, pid: this.pid, tid: id, leader: this.leader} });
       
      },

    };
  }


}
