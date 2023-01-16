import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  // for form validation
  signUpForm!:FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router) { }


  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      role:['',Validators.required],
    })
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text":this.type="password";
}
onSignup(){
  if(this.signUpForm.valid){
    // console.log(this.loginForm.value);
    // send the obj to database
    this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
  }
  else{
    // console.log("form is not valied");
    // throw the error using toaster and with required field
    validateForm.validateAllFormFiled(this.signUpForm);
    // alert("your form is invalid")
  }
}
// private validateAllFormFiled(formGroup:FormGroup){
//   Object.keys(formGroup.controls).forEach(field=>{
//     const control=formGroup.get(field);
//     if(control instanceof FormControl){
//       control.markAsDirty({onlySelf:true});
//     }else if(control instanceof FormGroup){
//       this.validateAllFormFiled(control)
//     }
//   })
//   }

}
