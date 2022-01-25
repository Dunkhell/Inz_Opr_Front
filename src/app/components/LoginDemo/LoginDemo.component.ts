import { SecurityService } from '../../service/security.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-LoginDemo',
  templateUrl: './LoginDemo.component.html',
  styleUrls: ['./LoginDemo.component.css']
})
export class LoginDemoComponent implements OnInit {
  user: SocialUser;

  constructor(
    private securityService: SecurityService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.securityService.authUser().subscribe((user) => {
        this.user = user;
      });
  }

  signInWithGoogle(): void {
    this.securityService.signInWithGoogle();
  }

  signOut(): void {
    this.securityService.signOut();
  }

  refreshToken(): void {
    this.securityService.refreshToken();
  }

  goHome(): void {
    this.router.navigate(["/home"])
  }


}
