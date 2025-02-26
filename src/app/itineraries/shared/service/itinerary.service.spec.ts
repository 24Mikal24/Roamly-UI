import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ItineraryService } from './itinerary.service';
import { environment } from '../../../../environments/environment';
import { CreateItineraryRequest } from '../model/create-itinerary-request';
import { Itinerary } from '../model/itinerary';

describe('ItineraryService', () => {
  let service: ItineraryService;
  let httpMock: HttpTestingController;

  const mockCreateItineraryRequest: CreateItineraryRequest = {
    title: 'title',
    destination: 'destination',
    description: 'description'
  }

  const mockItinerary: Itinerary = {
    id: 1,
    ...mockCreateItineraryRequest
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ItineraryService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to create an itinerary', () => {
    service.createItinerary(mockCreateItineraryRequest).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/itineraries`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(mockCreateItineraryRequest);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush({id: 1, ...mockCreateItineraryRequest})
  });

  it('should send a GET request to find all itineraries', () => {
    service.getItineraries().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/itineraries`);
    expect(req.request.method).toBe('GET');
    expect(req.request.body).toBeNull();

    req.flush([mockItinerary]);
  });

  it('should send a PUT request to update an itinerary', () => {
    service.updateItinerary(mockItinerary).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/itineraries/${mockItinerary.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(mockItinerary);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockItinerary);
  });

  it('should send a DELETE request to delete an itinerary', () => {
    service.deleteItinerary(mockItinerary.id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/itineraries/${mockItinerary.id}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });
});
