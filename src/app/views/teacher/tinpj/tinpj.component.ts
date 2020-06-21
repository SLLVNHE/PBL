import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../services/http-request.service';
import { Router, NavigationExtras } from '@angular/router'

@Component({
  selector: 'app-tinpj',
  templateUrl: './tinpj.component.html',
  styleUrls: ['./tinpj.component.css']
})
export class TinpjComponent implements OnInit {
  public project_id: any;
  public leader: any;
  public status: any;
  cid:any;
  name:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public httpRequest: HttpRequestService,
    private router: Router,
  ) {
    activatedRoute.queryParams.subscribe(queryParams => {
      this.project_id = queryParams.pid;
      this.leader = queryParams.leader;
      this.cid = queryParams.cid;
    });

  }


  getP() {
    this.httpRequest.httpGet("project_basic_info", { "project_id": this.project_id }).subscribe((val: any) => {
      if (val.message == undefined) { 
        this.status = val.status;
        this.name = val.project_name;
        //失败
      } else {
       
      }
    })

  }


  ngOnInit(): void {
    this.getP();
  }

}
