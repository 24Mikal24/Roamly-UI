import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private keycloakService = inject(KeycloakService);
  
  isNavbarOpen = signal(false);
  isLoggedIn = signal(this.keycloakService.isLoggedIn());

  toggleNavbar() {
    this.isNavbarOpen.update(isOpen => !isOpen);
  }

  logout() {
    this.keycloakService.logout(environment.postLogoutRedirectUri);
  }
}