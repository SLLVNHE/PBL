import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(

  ) { this.role = localStorage.getItem("role")}

  role:any;

  items: MenuItem[];

  ngOnInit() {
   
  }

}
