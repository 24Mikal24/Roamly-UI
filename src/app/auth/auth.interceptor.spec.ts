import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';
import { authInterceptor } from './auth.interceptor';
import { HttpClient } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let keycloakServiceMock: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    keycloakServiceMock = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['isLoggedIn', 'getToken']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: KeycloakService, useValue: keycloakServiceMock }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should pass the request through without modifying it if user is not logged in', () => {
    keycloakServiceMock.isLoggedIn.and.returnValue(false);

    httpClient.get('/test-endpoint').subscribe();

    const req = httpMock.expectOne('/test-endpoint');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('should add an Authorization header if the user is logged in', async () => {
    keycloakServiceMock.isLoggedIn.and.returnValue(true);
    keycloakServiceMock.getToken.and.returnValue(Promise.resolve('mock-token'));
  
    await httpClient.get('/test-endpoint').subscribe();
  
    const req = httpMock.expectOne('/test-endpoint');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush({});
  });

  it('should pass the request through without modifying it if no token is available', async () => {
    keycloakServiceMock.isLoggedIn.and.returnValue(true);
    keycloakServiceMock.getToken.and.returnValue(Promise.resolve(''));

    await httpClient.get('/test-endpoint').subscribe();

    const req = httpMock.expectOne('/test-endpoint');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });
});