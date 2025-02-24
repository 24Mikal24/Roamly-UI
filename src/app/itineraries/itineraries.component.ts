import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Itinerary } from './shared/model/itinerary';
import { ItineraryService } from './shared/service/itinerary.service';
import { ItineraryFormComponent } from "./itinerary-form/itinerary-form.component";

@Component({
  standalone: true,
  imports: [NgIf, NgFor, ItineraryFormComponent],
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.scss']
})
export class ItinerariesComponent implements OnInit {
  itineraries: Itinerary[] = [];

  private itineraryService = inject(ItineraryService);
  private router = inject(Router);

  ngOnInit() {
    this.loadItineraries();
  }

  private loadItineraries(): void {
    this.itineraryService.getUserItineraries().subscribe({
      next: (data) => this.itineraries = data,
      error: (err) => console.error('Failed to load itineraries:', err)
    });
  }

  viewItinerary(itineraryId: number): void {
    this.router.navigate(['/itinerary', itineraryId]);
  }

  deleteItinerary(itineraryId: number): void {
    this.itineraryService.deleteItinerary(itineraryId).subscribe();
  }
}