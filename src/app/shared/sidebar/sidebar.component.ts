import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { MessageService} from 'primeng/api'
import { HttpRequestService } from 'src/app/services/http-request.service';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [MessageService]
})
export class SidebarComponent implements OnInit {
 

  events: any[];

  options: any;

  constructor(
    private router: Router,
  ) { 
    this.events = [
      {
        
        title: "事件2",
        start: "1589299200000",
        url:"http://localhost:4200/adminhome/manage/amodify?id=1"
      },
      {
        
        title: "22Event",
        start: "2017-02-07",
        end: "2017-02-10",
         id:1     },
      {
       
        "title": "Repeating Event",
        "start": "2017-02-09T16:00:00"
      },
    ]
  }

  ngOnInit() {
    

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2017-02-10',
    
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        
      },
      locale: "zh-cn",
      buttonText:{
        month:"月",
        week:"周",
        day:"天",
      },
      dayClick: function () { alert('a day has been clicked!'); },
      // eventClick: function (calEvent, jsEvent, view) {//日程区块，单击时触发
        
       
      //   console.log("↓↓↓eventClick↓↓↓");
      //   console.log('Event: ' + calEvent.title);
      //   console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
      //   console.log('Current view: ' + view.name);

      //   return false;  //return false可以阻止点击后续事件发生（比如event中的url跳转事件）
      // }, 
      eventClick:(e)=>{
        // var id = e.event.id;
        // this.router.navigate(['/pblshome'], { queryParams: { id: id } });
        console.log(e.event)

      },
      // dateClick: (e) => {

      //   console.log(e);
      
      // }
     
    };
  }
 
 

}
