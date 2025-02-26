import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent implements OnInit {
  
  private keycloakService = inject(KeycloakService);
  private router = inject(Router);

  isLoggedIn = this.keycloakService.isLoggedIn();

  ngOnInit() {
    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }
}