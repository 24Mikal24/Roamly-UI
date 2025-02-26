import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItineraryService } from './shared/service/itinerary.service';
import { ItineraryFormComponent } from "./itinerary-form/itinerary-form.component";

@Component({
  standalone: true,
  imports: [ItineraryFormComponent],
  selector: 'app-itineraries',
  templateUrl: './itineraries.component.html',
  styleUrls: ['./itineraries.component.scss']
})
export class ItinerariesComponent implements OnInit {
  private itineraryService = inject(ItineraryService);
  private router = inject(Router);

  itineraries = this.itineraryService.getRecords();


  ngOnInit() {
    this.loadItineraries();
  }

  private loadItineraries(): void {
    this.itineraryService.getItineraries().subscribe({
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