import { Component, inject, Signal, WritableSignal, computed, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../shared/service/user.service';
import { NgIf } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private authService = inject(KeycloakService);

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  userForm: FormGroup = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.passwordMatchValidator }
  );

  isSubmitting: WritableSignal<boolean> = signal(false);
  successMessage: WritableSignal<string> = signal('');
  errorMessage: WritableSignal<string> = signal('');

  registerUser() {
    if (this.userForm.invalid) return;

    this.isSubmitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const { firstName, lastName, username, email, password } = this.userForm.value;

    this.userService.registerUser({ firstName, lastName, username, email, password }).subscribe({
      next: () => {
        this.successMessage.set('User registered successfully!');
        this.userForm.reset();
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message || 'User registration failed.');
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }

  login() {
    this.authService.login();
  }
}