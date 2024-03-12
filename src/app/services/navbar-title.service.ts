import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarTitleService {
  private navbarTitle = new BehaviorSubject<string>('SHOP FUSION');
  currentNavbarTitle = this.navbarTitle.asObservable();

  constructor() { }

  setNavbarTitle(title: string) {
    this.navbarTitle.next(title);
  }
}
