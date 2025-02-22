import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const keycloakService = inject(KeycloakService);

  if (!keycloakService.isLoggedIn()) {
    return next(req);
  }

  return from(keycloakService.getToken()).pipe(
    switchMap((token) => {
      if (!token) {
        return next(req);
      }

      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });

      return next(clonedReq);
    })
  );
};