import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

export const authGuard: CanActivateFn = () => {
  const authService = inject(KeycloakService);

  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    authService.login();
    return false;
  }

  return true;
};