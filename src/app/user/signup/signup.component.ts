import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { OpeningWordComponent } from '../../opening-word/opening-word.component';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  word: string = "signup";
  signupForm!: FormGroup;
  errorMsg!: string;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      address: ["", [Validators.required, Validators.maxLength(25)]],
      tel: ["", [Validators.required, Validators.pattern("^[0-9]*$"),
      Validators.minLength(8), Validators.maxLength(8)]],
      pwd: ["", [Validators.required,
      Validators.pattern("^[a-zA-Z0-9!@#$%^&*]{6,12}$")]]
    })
  }

  signup() {
    // console.log("Here object", this.signupForm.value);
    this.userService.signup(this.signupForm.value).subscribe(
      (response) => {
        // console.log("Here response after signup", response.msg);
        response.msg == "1"
          ? this.router.navigate(["user/login"])
          : this.errorMsg = "Phone number exists";
      }
    );
  }

}