import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient()
      ]
    });

    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
