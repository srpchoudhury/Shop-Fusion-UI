import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
     private fb:FormBuilder,
     private auth: AuthService,
   //  private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
    this.signupForm=this.fb.group({
      email:['',Validators.required],
      name:['',Validators.required],
      phoneno:['',Validators.required],
      password:['',Validators.required]
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
      this.auth.onLoginSubmit(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.result.token);
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
      console.log(this.signupForm.value)
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

  // on signout
  logout(){
    this.auth.signOut();
  }


}
