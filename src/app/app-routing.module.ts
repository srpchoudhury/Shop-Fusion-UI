import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { GroceryComponent } from './grocery/grocery.component';
import { GroceryItemsMainpageComponent } from './grocery/grocery-items-mainpage/grocery-items-mainpage.component';
import { GroceryItemsSidebarComponent } from './grocery/grocery-items-sidebar/grocery-items-sidebar.component';




const routes: Routes = [
  { path: '',redirectTo:'/home',pathMatch:'full' },
  { path: 'home',component: HomeComponent },
  { path: 'navbar',component: NavbarComponent},
  { path: 'footer',component: FooterComponent},
  { path: 'productlist',component: ProductListComponent},
  { path: 'productcard', component: ProductCardComponent},
  { path: 'homecontent', component: HomeContentComponent},
  { path: 'grocery', component: GroceryComponent},
  { path: 'Groceryitemsmainpage', component: GroceryItemsMainpageComponent},
  { path: 'groceryitemssidebar', component: GroceryItemsSidebarComponent} 
 






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
