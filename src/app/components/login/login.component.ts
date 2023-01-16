import { Component, OnInit } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import validateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,
     private router: Router, private userstore: UserStoreService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin() {
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value);
      // send the obj to database

      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res => {
            alert(res.message);
            this.loginForm.reset();

            this.auth.storeToken(res.token);
            let tokenPayload = this.auth.decodeToken();
            this.userstore.setUserNameFromStore(tokenPayload.name);
            this.userstore.setRoleFromStore(tokenPayload.role)

            this.router.navigate(['frontpage']);
          }),
          error: (err => {
            alert(err?.error.message)
          })
        })

    }
    else {
      // console.log("form is not valied");
      // throw the error using toaster and with required field
      validateForm.validateAllFormFiled(this.loginForm);
      // alert("your form is invalid")
    }
  }
  // private validateAllFormFiled(formGroup:FormGroup){
  // Object.keys(formGroup.controls).forEach(field=>{
  //   const control=formGroup.get(field);
  //   if(control instanceof FormControl){
  //     control.markAsDirty({onlySelf:true});
  //   }else if(control instanceof FormGroup){
  //     this.validateAllFormFiled(control)
  //   }
  // })
  // }
}
