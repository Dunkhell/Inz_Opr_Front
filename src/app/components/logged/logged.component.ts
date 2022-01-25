import { VisitsDto } from './../../model/VisitDTO';
import { VisitsService } from './../../service/visits.service';
import { UserDetailsDTO } from 'src/app/model/UserDetailsDTO';
import { UserDetailsToUpdateDto } from './../../model/UserDetailsToUpdateDto';
import { UserService } from './../../service/user.service';
import { User } from 'src/app/model/User';
import { SocialUser } from 'angularx-social-login';
import { SecurityService } from './../../service/security.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  public user: User;
  public editUser: UserDetailsToUpdateDto;
  public userVisits: VisitsDto[] = []
  public photoUrl = "";
  public defaultImage = "/assets/images/avatar_template.jpg";

  constructor(private securityService: SecurityService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getVisit(); 
    this.photoUrl = JSON.parse(localStorage.getItem('image_url')!);
    console.log(this.photoUrl);
  }

  public getVisit(): void {
    this.userService.getYourVisits().subscribe(
      (response: VisitsDto[]) => {
        this.userVisits = response
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  public getUser(): void {
    this.userService.getUser().subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => { console.log(error); }
    )
  }

  refreshToken(): void {
    this.securityService.refreshToken();
  }

  goHome(): void {
    this.router.navigate(["/home"])
  }

  adminPanel(): void {
    this.router.navigate(["/adminpanel"])
  }

  showUsers(): void {
    this.router.navigate(["/users"])
  }

  updateProfile(userDetails: UserDetailsToUpdateDto):void{
    console.log(userDetails);
    this.userService.updateUser(userDetails).subscribe(
      (response: UserDetailsToUpdateDto) => {
        console.log(response);
        this.getUser();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      },
    )
    document.getElementById("update-user-form")?.click()
  }

  cancelVisit(id:number) {
    this.userService.cancelVisitById(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getUser();
        this.getVisit();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
      },
    )
  }

}
