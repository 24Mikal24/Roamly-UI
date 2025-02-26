import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  const keycloakServiceMock = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['isLoggedIn', 'logout']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: KeycloakService, useValue: keycloakServiceMock }
      ],
    });

    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      expect(component).toBeTruthy();
    });
});