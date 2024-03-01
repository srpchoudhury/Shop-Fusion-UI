import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { CartDto } from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7002/api/auth/";
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  constructor(private http: HttpClient, private router: Router) { }

  onLoginSubmit(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}login`,loginObj);
  }
  onSignupSubmit(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }
  AssignRole(userObj:any){
    return this.http.post<any>(`${this.baseUrl}AssignRole`,userObj);
  }
  signOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    this.logoutEvent.emit();
    this.router.navigate(['home']);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  storeUserDetails(userDetails:any){
    localStorage.setItem('userDetails',JSON.stringify(userDetails));
  }
  getUserDetails(){
    return JSON.parse(localStorage.getItem("userDetails")!!);
  }
 
  isLoggedIn():boolean{
      return !!localStorage.getItem('token');
  }
}
