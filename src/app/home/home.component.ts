import { Component } from '@angular/core';
import { ItinerariesComponent } from "../itineraries/itineraries.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ItinerariesComponent]
})
export class HomeComponent {
}
