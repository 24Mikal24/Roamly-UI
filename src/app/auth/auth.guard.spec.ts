import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;
  const keycloakServiceMock = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['isLoggedIn', 'login']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceMock },
      ],
    });

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = {} as RouterStateSnapshot;
  });

  it('should return true if the user is logged in', () => {
    keycloakServiceMock.isLoggedIn.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));
    expect(result).toBeTrue();
  });

  it('should call login() and return false if the user is not logged in', () => {
    keycloakServiceMock.isLoggedIn.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => authGuard(mockRoute, mockState));

    expect(keycloakServiceMock.login).toHaveBeenCalled();
    expect(result).toBeFalse();
  });
});