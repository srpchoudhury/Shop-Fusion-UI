import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { GroceryComponent } from './components/grocery/grocery.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: '',redirectTo:'/home',pathMatch:'full' },
  { path: 'home',component: HomeComponent },
  { path: 'navbar',component: NavbarComponent},
  { path: 'footer',component: FooterComponent},
  { path: 'homecontent', component: HomeContentComponent},
  { path: 'grocery', component: GroceryComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]}






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
