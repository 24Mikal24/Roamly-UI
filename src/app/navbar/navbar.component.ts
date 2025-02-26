import { Component, inject, OnInit, signal } from '@angular/core';
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
export class NavbarComponent implements OnInit {

  private keycloakService = inject(KeycloakService);

  ngOnInit(): void {
    this.isLoggedIn.update(() => this.keycloakService.isLoggedIn());
  }
  
  isNavbarOpen = signal(false);
  isLoggedIn = signal(false);

  toggleNavbar() {
    this.isNavbarOpen.update(isOpen => !isOpen);
  }

  logout() {
    this.keycloakService.logout(environment.postLogoutRedirectUri);
  }
}