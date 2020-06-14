import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import {StorageService} from './storage.service'
import { Observable } from 'rxjs';


// @Injectable( 
//   // {providedIn: 'root'}
// )

@Injectable()
export class HttpRequestService {

  constructor(
    public httpClient : HttpClient,
    public storage : StorageService,
   ) { }
  public httpOptions;
  public headers: HttpHeaders;
  // BaseUrl:string = "http://127.0.0.1:3000/";

  // BaseUrl: string =  "http://118.190.235.55:8080/";
  public api = '/api/';
  

  httpGet(url,dates){

    if (localStorage.getItem("token") != null) {
      this.headers = new HttpHeaders({ 'Authorization': localStorage.getItem("token"), 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'})
    }
    else{
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8' })
    }
    this.httpOptions = {
      headers: this.headers,
      params: dates
    };
    return this.httpClient.get(this.api+url,this.httpOptions)
  }


  httpGetFile(url, dates,type) {

    if (localStorage.getItem("token") != null) {
      this.headers = new HttpHeaders({ 'Authorization': localStorage.getItem("token"), 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8' })
    }
    else {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8' })
    }
    this.httpOptions = {
      headers: this.headers,
      params: dates,
      responseType: type,
    };
    return this.httpClient.get(this.api + url, this.httpOptions)
  }

  

httpPost(url, data){
  
  if (localStorage.getItem("token") != null) {
    this.headers = new HttpHeaders({ 'Authorization': localStorage.getItem("token"), 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8'})
  }
  else {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json;application/x-www-form-urlencodeed; charset=utf-8' })
  }
   this.httpOptions = {
    headers : this.headers
  };
  return this.httpClient.post(this.api+url, data, this.httpOptions)
 }

  httpPostFile(url, data) {

    if (localStorage.getItem("token") != null) {
      this.headers = new HttpHeaders({ 'Authorization': localStorage.getItem("token"), 'Content-Type': 'undefined' })
    }
    else {
      this.headers = new HttpHeaders({ 'Content-Type': 'undefined' })
    }
    this.httpOptions = {
      headers: this.headers
    };
    return this.httpClient.post(this.api + url, data, this.httpOptions)
  }



  // public email: any;
  // public nickname: any;
  // public name: any;
  // public gender: any;
  // public signature: any;
  // public birthday: any;
  // val1: any;
  // position: string;
  // infoList :any={};
  // getUserInfo():any {
  //   this.httpGet("view_personal_info", {}).subscribe((val: any) => {
  //     if (val.message == 'success') {
  //       console.log(val)
  //       this.infoList.email = val.email;
  //       this.infoList.name = val.name;
  //       this.infoList.nickname = val.nickname;
  //       this.infoList.gender = val.gender; 
  //       this.infoList.signature = val.signature;
  //       this.infoList.birthday = val.birthday;
  //       console.log(this.infoList)
  //       return this.infoList;
  //     } else {
  //     return this.infoList;
  //     }
  //   })
  // }

  // getUserAvatar(): any {
  //   this.httpGet("view_avatar", {}).subscribe((val: any) => {
  //     if (val.message == 'success') {

  //       return this.infoList;
  //     } else {
  //       return this.infoList;
  //     }
  //   })
  // }




 


}


 