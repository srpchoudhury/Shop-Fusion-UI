import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shop-Fusion';

  constructor(private titleService: Title) { }

  setTitle(UpdatedTitle: string){
    this.title = UpdatedTitle;
    this.titleService.setTitle('ShopFusion-Grocery');
  }
}
