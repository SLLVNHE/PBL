import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../services/http-request.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uncourses-list',
  templateUrl: './uncourses-list.component.html',
  styleUrls: ['./uncourses-list.component.css']
})
export class UncoursesListComponent implements OnInit {

  public title: any = "软件工程";
  public tname: any = "TOM";
  public description: any = "课程描述";
  public image: any = "../../../../assets/images/110404-152108304476cb.jpg";
  public course: any[] = [];
  public x: any[] = [];
  public page: any = 0;
  public total: any ;
  public name:any;
  public position:any;
  public now:any;


  getX() {
    var i;
    var n = 3;
    let len = this.course.length;
    let lineNum = len % 3 === 0 ? len / 3 : Math.floor((len / 3) + 1);
    for (i = 0; i < lineNum; i++) {
      let temp = this.course.slice(i * n, i * n + n);
      this.x.push(temp);
    }
  }



  constructor(
    public httpRequest: HttpRequestService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.now = new Date();
    
   }


  getUserInfo() {
    this.httpRequest.httpGet("view_personal_info", {}).subscribe((val: any) => {
      if (val.message == 'success') {       
        this.name = val.name;     
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

  add(id){

    //加入课程前实名
    if(this.name == undefined){
      this.position = "top";
      this.confirmationService.confirm({
        message: '未实名！加入课程需要实名',
        header: '提示',
        icon: 'pi pi-info-circle',
        acceptIcon: "pi",
        acceptLabel: '去实名',
        rejectVisible: false,
        accept: () => {
          this.router.navigate(['/pblshome/user/real']);
        },
        reject: () => { },
        key: "positionDialog"
      });
    }else{
    this.httpRequest.httpGet("add_course", { "course_id": id}).subscribe((val:any)=>{
      //成功
      if (val.message == "success"){
       
        this.confirmationService.confirm({
          message: '添加成功',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          accept: () => {
            location.reload();
          },
          key: "positionDialog",
        });
       
      }else{
        this.confirmationService.confirm({
          message: '添加失败，请重试！',
          header: '提示',
          icon: 'pi pi-info-circle',
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
      }


    })
  }
    
  }

  onPage(event: any) {

    if (this.page != event.page) {
      this.page = event.page;
      this.getunCourse();
     
    }
  }

  getunCourse() {
    this.httpRequest.httpGet('student_view_unselected_courses', { "page": this.page+1 }).subscribe((val: any) => {
      if (val.message == undefined) {
        this.x = [];
        this.course = val.courses;
        this.total = val.total;          
        this.getX();
      } else {
      }
    })

  }
  ngOnInit(): void {
    this.getunCourse();
    this.getUserInfo();
  }

}
