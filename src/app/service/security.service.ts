import { Observable } from 'rxjs';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../model/User';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  user: SocialUser

  constructor(
    private authService: SocialAuthService,
    private userService: UserService,
    private router: Router
  ) { }


  signInWithGoogle(): void {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) =>{
      localStorage.setItem('google_auth', JSON.stringify(user.idToken));
      localStorage.setItem('image_url', JSON.stringify(user.photoUrl));
      this.userService.getUser().subscribe((response: User) => {
        localStorage.setItem('user_role', response.applicationUserRole);
      },
      (error: HttpErrorResponse) => { console.log(error); }
    );
      localStorage.setItem("active_header", "PROFILE");
      console.log(user);
      this.router.navigate(["/logged"]);
    }).catch (
      (error: any) => console.log(error)
    )
  }

  signOut(): void {
    localStorage.removeItem('google_auth');
    localStorage.removeItem('user_role');
    localStorage.removeItem('active_header');
    if(localStorage.getItem('active_admin-nav')){
      localStorage.removeItem('active_admin-nav');
    }    // this.authService.signOut().then(
    // ).catch (
    //   (error: any) => console.log(error)
    // );
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  authUser() {
    return this.authService.authState;
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem("google_auth") != null) {
      return true;
    } else {
      return false;
    }
  }

}
