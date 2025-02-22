import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NgIf, RouterOutlet]
})
export class AppComponent implements OnInit {
  
  private authService = inject(KeycloakService);
  private router = inject(Router);

  isLoggedIn = this.authService.isLoggedIn();

  ngOnInit() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  logout() {
    this.authService.logout(environment.postLogoutRedirectUri);
  }

  login() {
    this.authService.login();
  }
}