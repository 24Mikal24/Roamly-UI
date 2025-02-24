import { inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private keycloakService = inject(KeycloakService);

  getUserId(): string {
    const token = this.keycloakService.getKeycloakInstance().idTokenParsed;
    return token?.sub ?? '';
  }
}