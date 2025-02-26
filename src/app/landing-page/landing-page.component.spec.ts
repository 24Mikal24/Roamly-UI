import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { LandingPageComponent } from './landing-page.component';
import { KeycloakService } from 'keycloak-angular';

describe('LandingPageComponent', () => {
  const keycloakServiceMock = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['isLoggedIn', 'login']);

  beforeEach(() => {
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