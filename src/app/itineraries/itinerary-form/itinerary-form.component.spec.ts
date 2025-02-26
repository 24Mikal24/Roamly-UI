import { TestBed } from '@angular/core/testing';
import { ItineraryFormComponent } from './itinerary-form.component';
import { ItineraryService } from '../shared/service/itinerary.service';
import { of } from 'rxjs';
import { Itinerary } from '../shared/model/itinerary';

describe('ItineraryFormComponent', () => {
  let component: ItineraryFormComponent;
  const itineraryServiceMock = jasmine.createSpyObj<ItineraryService>('ItineraryService', ['createItinerary']);
  const itinerary: Itinerary = {
    id: 1,
    title: 'title',
    destination: 'destination',
    description: 'description'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ItineraryService, useValue: itineraryServiceMock},
      ]
    });

    const fixture = TestBed.createComponent(ItineraryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with empty values', () => {
    expect(component.itineraryForm.value).toEqual({
      title: '',
      destination: '',
      description: ''      
    });
  });

  it('should call itineraryService.createItinerary() with form data on valid submission', () => {
    itineraryServiceMock.createItinerary.and.returnValue(of(itinerary));

    component.itineraryForm.patchValue(itinerary);
    
    component.createItinerary();

    expect(itineraryServiceMock.createItinerary).toHaveBeenCalledWith({
      title: itinerary.title, 
      destination: itinerary.destination, 
      description: itinerary.description
    });
  });

  it('should hide the form on valid submission', () => {
    spyOn(component, 'hideForm').and.callThrough();

    itineraryServiceMock.createItinerary.and.returnValue(of(itinerary));

    component.itineraryForm.patchValue(itinerary);
    component.createItinerary();

    expect(component.hideForm).toHaveBeenCalledTimes(1);
  });

  it('should toggle for visibility', () => {
    expect(component.isFormVisible()).toEqual(false);

    component.showForm();

    expect(component.isFormVisible()).toEqual(true);

    component.hideForm();

    expect(component.isFormVisible()).toEqual(false);
  });
});
