import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../model/user';
import { HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to register a user', () => {
    const mockUser: User = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123'
    };

    service.registerUser(mockUser).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/admin/create-user');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush({ message: 'User registered successfully' });
  });
});