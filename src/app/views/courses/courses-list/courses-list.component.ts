import { Component, OnInit } from '@angular/core';
import {HttpRequestService} from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  public title :any= "软件工程";
  public tname : any="TOM";
  public description:any="课程描述";
  public image: any = "../../../../assets/images/110404-152108304476cb.jpg";
  public course:any[]=[];
  public  x:any[] =[];
  public page:any = 0;
  public total:any;

  getX(){
    var i;
    var n = 3;
    let len = this.course.length;
    let lineNum = len % 3 === 0 ? len / 3 : Math.floor((len / 3) + 1);
    for( i = 0; i<lineNum;i++){
      let temp = this.course.slice(i * n, i * n + n);
      this.x.push(temp);
    }
  }



  constructor(
    public httpRequest: HttpRequestService,
    private router: Router,
  ) { }


  in(id){
    this.router.navigate(['/pblshome/studentc'], { queryParams: { cid: id } });
  }

  onPage(event: any) {
  
    if (this.page != event.page) {
      this.page = event.page;
      this.getCourse();
     
    }
  }    

  getCourse(){
    this.httpRequest.httpGet('student_view_courses', {"page":this.page+1}).subscribe((val:any)=>{
     
      if (val.message == undefined){
      this.x =[];
        this.course = val.courses;
        this.total = val.total;
        this.getX();
      }else{

      }
    })

  }
  ngOnInit(): void {
    this.getCourse();
   


  }

}
