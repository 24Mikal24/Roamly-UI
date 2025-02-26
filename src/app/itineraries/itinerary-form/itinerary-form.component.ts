import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItineraryService } from '../shared/service/itinerary.service';
import { CreateItineraryRequest } from '../shared/model/create-itinerary-request';

@Component({
  selector: 'app-itinerary-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './itinerary-form.component.html',
  styleUrls: ['./itinerary-form.component.scss']
})
export class ItineraryFormComponent {

  private formBuilder = inject(FormBuilder);
  private itineraryService = inject(ItineraryService);

  itineraryForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    description: ['', [Validators.maxLength(255)]]
  });

  isFormVisible = signal(false);

  showForm() {
    this.isFormVisible.set(true);
  }

  hideForm() {
    this.isFormVisible.set(false);
    this.itineraryForm.reset();
  }

  createItinerary() {
    if (this.itineraryForm.valid) {
      this.itineraryService.createItinerary(this.itineraryForm.getRawValue() as CreateItineraryRequest).subscribe({
        next: () => this.hideForm(),
        error: (error) => console.error('Error creating itinerary', error)
      });
    }
  }
}