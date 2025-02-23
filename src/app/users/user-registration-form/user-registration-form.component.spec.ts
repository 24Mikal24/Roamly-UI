import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form.component';
import { UserService } from '../shared/service/user.service';
import { KeycloakService } from 'keycloak-angular';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('UserRegistrationFormComponent', () => {
  let component: UserRegistrationFormComponent;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let authServiceMock: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj<UserService>('UserService', ['registerUser']);
    authServiceMock = jasmine.createSpyObj<KeycloakService>('KeycloakService', ['login']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: KeycloakService, useValue: authServiceMock },
        FormBuilder,
        provideHttpClient()
      ]
    });

    const fixture = TestBed.createComponent(UserRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with empty values', () => {
    expect(component.userForm.value).toEqual({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    expect(component.userForm.invalid).toBeTrue();
  });

  it('should validate password and confirmPassword match', () => {
    component.userForm.patchValue({
      password: 'password123',
      confirmPassword: 'password123'
    });

    expect(component.userForm.hasError('passwordsMismatch')).toBeFalse();

    component.userForm.patchValue({
      confirmPassword: 'password1234'
    });

    expect(component.userForm.hasError('passwordsMismatch')).toBeTrue();
  });

  it('should call userService.registerUser() with form data on valid submission', () => {
    userServiceMock.registerUser.and.returnValue(of({ message: 'Success' }));

    component.userForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });

    component.registerUser();

    expect(userServiceMock.registerUser).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123'
    });

    expect(component.successMessage()).toBe('User registered successfully!');
  });

  it('should set errorMessage if registration fails', () => {
    userServiceMock.registerUser.and.returnValue(throwError(() => ({ error: { message: 'Registration failed' } })));

    component.userForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    });

    component.registerUser();

    expect(component.errorMessage()).toBe('Registration failed');
  });

  it('should call authService.login() when login() is called', () => {
    component.login();
    expect(authServiceMock.login).toHaveBeenCalled();
  });
});