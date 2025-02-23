import { TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { KeycloakService } from 'keycloak-angular';
import { provideHttpClient } from '@angular/common/http';

describe('LandingPageComponent', () => {
  let keycloakServiceMock: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    keycloakServiceMock = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['isLoggedIn', 'login']);

    TestBed.configureTestingModule({
      providers: [
        { provide: KeycloakService, useValue: keycloakServiceMock },
        provideHttpClient()
      ]
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LandingPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});