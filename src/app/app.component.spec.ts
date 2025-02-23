import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let keycloakServiceMock: jasmine.SpyObj<KeycloakService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    keycloakServiceMock = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['isLoggedIn', 'logout']);
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);

    keycloakServiceMock.isLoggedIn.and.returnValue(true);

    TestBed.configureTestingModule({
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home if user is logged in on ngOnInit', () => {
    component.ngOnInit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should call KeycloakService.logout with the correct URL when logout() is called', () => {
    const postLogoutRedirectUri = 'http://localhost:4200'; // Replace with actual value
    component.logout();
    expect(keycloakServiceMock.logout).toHaveBeenCalledWith(postLogoutRedirectUri);
  });
});