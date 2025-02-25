import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { Itinerary } from '../model/itinerary';
import { environment } from '../../../../environments/environment';
import { CreateItineraryRequest } from '../model/create-itinerary-request';
import { SmartService } from '../../../core/service/smart-service';
import { HttpService } from '../../../core/service/http-service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService extends SmartService<Itinerary> {

  protected override getId(record: Itinerary) {
      return record.id;
  }

  protected override http: HttpService = inject(HttpService);

  private baseUrl = `${environment.apiUrl}/itineraries`;

  createItinerary(request: CreateItineraryRequest) {
    return this.create(this.baseUrl, request);
  }

  getItineraries(): Observable<Itinerary[]> {
    return this.fetchAll(this.baseUrl);
  }

  updateItinerary(itinerary: Itinerary): Observable<Itinerary> {
    return this.update(`${this.baseUrl}/${itinerary.id}`, itinerary.id, itinerary);
  }

  deleteItinerary(itineraryId: number): Observable<any> {
    return this.delete(`${this.baseUrl}/${itineraryId}`, itineraryId);
  }
}