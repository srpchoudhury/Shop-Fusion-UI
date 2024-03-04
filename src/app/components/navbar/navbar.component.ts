import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/UserDetails';
//import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string ="bi-eye-slash-fill";
  loginForm!:FormGroup;
  signupForm!:FormGroup;
  isLoggedIn: boolean = false;
  userDetails: User = new User('', '', '', '');
  productCount: number=0;

  
  constructor(
     private fb:FormBuilder,
     private auth: AuthService,
     private router: Router,
     private cart: CartService
   //  private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn(); 
    this.loadUserDetails();
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
    this.signupForm=this.fb.group({
      email:['',Validators.required],
      name:['',Validators.required],
      phoneNumber:['',Validators.required],
      password:['',Validators.required],
      role:['USER']
    });
    this.cart.productAddedToCart.subscribe(() => {
      this.cartProductCount();
    });
    
    this.cartProductCount();
    this.auth.logoutEvent.subscribe(() => {
      this.cartProductCount();
    });
  }
  
  //password close 
  hideShowPassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "bi-eye-fill" : this.eyeIcon = "bi-eye-slash-fill";
    this.isText ? this.type = "text": this.type = "password";
  }
//form login
  onLoginSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.auth.onLoginSubmit(this.loginForm.value).subscribe({
        next:(res)=>{
          // this.isLoggedIn = true;
          this.loginForm.reset();
          this.auth.storeToken(res.result.token);
          this.auth.storeUserDetails(res.result.user);
        window.location.reload();
       this.isLoggedIn = true;
     
    //   document.getElementById('ModalFormLogin')?.classList.remove('show');
       this.router.navigate(['home']);
          //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
          alert(res.message);
        },error:(err)=>{
          //this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration: 5000});
          alert("Something went wrong!");
        }
      })
    }else{
      console.log("form is not valid");
      this.validateAllFormFields(this.loginForm);
    }
  }
  //form signup
  onSignupSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value);
        this.auth.onSignupSubmit(this.signupForm.value).subscribe({
          next:(res) => {
            this.signupForm.reset();
           
           window.location.reload();
           //document.getElementById('ModalFormSignup')?.classList.remove('show');
           this.router.navigate(['home']);
            //this.toast.success({detail:"SUCCESS", summary:res.message, duration: 5000});
            alert(res.message);
          },error:(err)=>{
            //this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration: 5000});
            alert("Something went wrong!");
          }
        })
    }else{
      console.log("form is not valid");
      this.validateAllFormFields(this.signupForm);
    }
  }

  //validate all form fields
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf: true});
      } else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }

  //get loggedInUserDetails from localstorage
  loggedInUserDetails(){
    return this.auth.getUserDetails();
  }
  loadUserDetails(): void {
    const storedUserDetails = this.loggedInUserDetails();
    if (storedUserDetails) {
      this.userDetails = new User(storedUserDetails.id, storedUserDetails.email, storedUserDetails.name, storedUserDetails.phoneNumber);
    }
  }
  // on signout
  logout(){
    alert('Are you sure to Logout');
    this.auth.signOut();
    this.isLoggedIn = false; 
  }

  cartProductCount(){
    if(this.auth.isLoggedIn()){
      
      const userId = this.auth.getUserDetails().id;
  
      this.cart.GetCart(userId).subscribe({ 
        next: (response) =>{
          this.productCount= response.result.cartDetails.length;
        }
      })
    }else{
      const details=this.cart.getWithoutLoginAddToCart();
      if(details!= null){
        this.productCount=details.cartDetails.length; 
      }
      // this.productCount= this.cart.getWithoutLoginAddToCart().cartDetails.length; 
    }
  
  }
 

}
