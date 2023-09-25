import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  word: string = "login";
  loginForm!: FormGroup;
  errorMsg!: string;

  @ViewChild('telInput', { static: true }) telInputRef!: ElementRef;
  @ViewChild('pwdInput', { static: true }) pwdInputRef!: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]]
    });
  }

  focusInput(inputType: string) {
    if (inputType === 'tel') {
      this.telInputRef.nativeElement.focus();
    } else if (inputType === 'pwd') {
      this.pwdInputRef.nativeElement.focus();
    }
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(
      (response) => {
        // console.log("Here into login reponse:", response);
        if (response.msg == "2") {
          sessionStorage.setItem('jwt', response.user);
          this.router.navigate([""]);
        } else {
          this.errorMsg = "Please Check Phone Number/Pwd";
        }
      }
    )
  }
}