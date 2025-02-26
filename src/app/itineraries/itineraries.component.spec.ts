import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ItinerariesComponent } from './itineraries.component';
import { ItineraryService } from './shared/service/itinerary.service';
import { of } from 'rxjs';

describe('ItinerariesComponent', () => {
  let component: ItinerariesComponent;
  const itineraryServiceMock = jasmine.createSpyObj<ItineraryService>('ItineraryService', ['getRecords', 'getItineraries', 'deleteItinerary'])

  const mockItinerary = {
    id: 1,
    title: 'title',
    destination: 'destination',
    description: 'description'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ItinerariesComponent],
      providers: [
        { provide: ItineraryService, useValue: itineraryServiceMock }
      ]
    });

    component = TestBed.createComponent(ItinerariesComponent).componentInstance;
    itineraryServiceMock.getRecords.and.returnValue(signal([]));
  });

  it('should get all itineraries on init', () => {
    itineraryServiceMock.getItineraries.and.returnValue(of([mockItinerary]));

    component.ngOnInit();

    expect(itineraryServiceMock.getItineraries).toHaveBeenCalledTimes(1);
  });

  it('should delete an itinerary', () => {
    itineraryServiceMock.deleteItinerary.and.returnValue(of());

    component.deleteItinerary(mockItinerary.id);

    expect(itineraryServiceMock.deleteItinerary).toHaveBeenCalledOnceWith(mockItinerary.id);
  });
});
