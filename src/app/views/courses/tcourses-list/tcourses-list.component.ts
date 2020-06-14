import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-tcourses-list',
  templateUrl: './tcourses-list.component.html',
  styleUrls: ['./tcourses-list.component.css']
})
export class TcoursesListComponent implements OnInit {

  public title: any = "软件工程";
  public tname: any = "TOM";
  public description: any = "课程描述";
  public image: any = "../../../../assets/images/110404-152108304476cb.jpg";
  public course: any[] = [];
  public x: any[] = [];
  public page: any = 1;
  public total: any;
  position: string;

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
    private router: Router,
  ) { }


  in(id) {
    this.router.navigate(['/teacherhome/teacherc'], { queryParams: { cid: id } });
  }


  delete(id){
    this.httpRequest.httpGet("delete_course", { course_id:id}).subscribe((val: any) => {
      if (val.message == "success") {
        this.position = "top";
        this.confirmationService.confirm({
          message: '删除成功',
          header: '提示',
          icon: 'pi pi-info-circle',
          //  acceptVisible:false,
          acceptLabel: '确认',
          rejectVisible: false,
          key: "positionDialog"
        });
        this.getCourse();

      } 
       else {
        this.position = "top";
        this.confirmationService.confirm({
          message: '删除失败请重试！',
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


  onPage(event: any) {

    if (this.page != event.page) {
      this.page = event.page;
      this.getCourse();

    }
  }

  getCourse() {
    this.httpRequest.httpGet('student_view_courses', { "page": this.page }).subscribe((val: any) => {
      if (val.message == undefined) {
        console.log(val)
        this.course = val.courses;
        this.total = val.total;
        this.getX();
      } else {

      }
    })

  }
  ngOnInit(): void {
    this.getCourse();



  }

}
