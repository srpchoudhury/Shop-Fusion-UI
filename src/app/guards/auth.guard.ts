import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}
  canActivate():boolean {
    if(this.auth.isLoggedIn()){
        return true;
    }else{
      alert('please login first');
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
