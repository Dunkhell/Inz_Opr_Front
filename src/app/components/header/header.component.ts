import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { SecurityService } from 'src/app/service/security.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(private securityService: SecurityService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    this.userService.getUser().subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  signOut(): void {
    this.securityService.signOut();
    this.router.navigate(["/login"])
  }

  isAdmin():boolean{
    return (localStorage.getItem("user_role")=="ADMIN")
  }

  isActive(name:string):boolean{
    return (localStorage.getItem("active_header")==name);
  }

  makeActive(name:string): void{
    localStorage.setItem("active_header", name);
    if(localStorage.getItem('active_admin-nav')){
      localStorage.removeItem('active_admin-nav');
    }
  }
}
