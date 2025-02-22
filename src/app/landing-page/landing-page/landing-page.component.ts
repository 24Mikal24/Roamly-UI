import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from "../../users/user-registration-form/user-registration-form.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [UserRegistrationFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
