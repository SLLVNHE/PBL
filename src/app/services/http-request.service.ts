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
      this.headers = new HttpHeaders({ 'Authorization': localStorage.getItem("token")})
    }
    else {
      
    }
    this.httpOptions = {
      headers: this.headers
    };
    return this.httpClient.post(this.api + url, data, this.httpOptions)
  }

}


 