import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itinerary } from '../model/itinerary';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/shared/service/auth.service';
import { CreateItineraryRequest } from '../model/create-itinerary-request';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private baseUrl = `${environment.apiUrl}/itineraries`;

  createItinerary(request: CreateItineraryRequest) {
    return this.http.post<Itinerary>(`${this.baseUrl}`, request);
  }

  getUserItineraries(): Observable<Itinerary[]> {
    const userId = this.authService.getUserId();
    return this.http.get<Itinerary[]>(`${this.baseUrl}/${userId}`);
  }

  updateItinerary(itinerary: Itinerary): Observable<Itinerary> {
    return this.http.put<Itinerary>(`${this.baseUrl}/${itinerary.id}`, itinerary);
  }

  deleteItinerary(itineraryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${itineraryId}`);
  }
}