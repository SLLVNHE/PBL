import { Injectable } from '@angular/core';
import Cookie from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public isToken:boolean = false;
  public key = "token";
 getToken(){
  return localStorage.getItem(this.key);
 }

 setToken(token){
   this.isToken = true;
   localStorage.setItem(this.key, token);
 }

  removeToken() {
    this.isToken = false;
    localStorage.removeItem(this.key)
    
  }

  constructor() { }
}
