import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = "https://localhost:7002/api/auth/";
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
    localStorage.clear();
    this.router.navigate(['home']);
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  storeUserDetails(userDetails:any){
    localStorage.setItem('userDetails',userDetails);
  }
  
  getToken(){
    return localStorage.getItem('token');
  }
  isLoggedIn():boolean{
      return !!localStorage.getItem('token');
  }
}
