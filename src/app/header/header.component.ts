import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  decodedToken: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    let token = sessionStorage.getItem("jwt");
    if (token) {
      this.decodedToken = this.decodeToken(token);
      // console.log("decodedToken", this.decodedToken);
    }
    return !!token; 
  }

  decodeToken(token: string) {
    return jwt_decode(token);
  }

  logout() {
    sessionStorage.removeItem("jwt");
    this.router.navigate([""]);
  }
}