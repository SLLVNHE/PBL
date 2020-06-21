import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-a-seem',
  templateUrl: './a-seem.component.html',
  styleUrls: ['./a-seem.component.css']
})
export class ASeemComponent implements OnInit {

  public uid: any;

  public email: any;
  public nickname: any;
  public name: any;
  public gender: any;
  public signature: any;
  public self_proportion: any;
  public birthday: any;
 

 

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.uid = queryParams.uid;
    });

    this.getP();
  }

  getP() {
    this.httpRequest.httpGet("view_user", { "id": this.uid }).subscribe((val: any) => {
      if (val.message == undefined) {
        
 this.email = val.email;
        this.nickname = val.nickname;
        this.name = val.name;
        this.gender = val.gender;
        this.signature = val.signature;
        this.self_proportion = val.self_proportion;
        this.birthday = val.birthday;
      } else {
       

      }
    })

  }

  ngOnInit(): void {
  }
}
