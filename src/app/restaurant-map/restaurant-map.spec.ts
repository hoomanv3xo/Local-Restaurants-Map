import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantMap } from './restaurant-map';

describe('RestaurantMap', () => {
  let component: RestaurantMap;
  let fixture: ComponentFixture<RestaurantMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantMap],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
