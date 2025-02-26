import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../environments/environment';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const keycloakServiceSpy = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['isLoggedIn', 'logout']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]),
        { provide: KeycloakService, useValue: keycloakServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should initialize with login state from Keycloak', () => {
    keycloakServiceSpy.isLoggedIn.and.returnValue(true);

    fixture.detectChanges();

    expect(component.isLoggedIn()).toBeTrue();
  });

  it('should toggle navbar open and close', () => {
    expect(component.isNavbarOpen()).toBeFalse();

    component.toggleNavbar();
    expect(component.isNavbarOpen()).toBeTrue();

    component.toggleNavbar();
    expect(component.isNavbarOpen()).toBeFalse();
  });

  it('should call Keycloak logout with correct redirect URI', () => {
    component.logout();
    expect(keycloakServiceSpy.logout).toHaveBeenCalledWith(environment.postLogoutRedirectUri);
  });
});