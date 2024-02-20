import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './product-card/product-card.component';
import { HomeContentComponent } from './home-content/home-content.component';

import { GroceryComponent } from './grocery/grocery.component';
import { GroceryItemsMainpageComponent } from './grocery/grocery-items-mainpage/grocery-items-mainpage.component';
import { GroceryItemsSidebarComponent } from './grocery/grocery-items-sidebar/grocery-items-sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   
    FooterComponent,
    NavbarComponent,
    

    ProductListComponent,
    ProductCardComponent,
    HomeContentComponent,
    GroceryComponent,
    GroceryItemsMainpageComponent,
    GroceryItemsSidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
