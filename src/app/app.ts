import { Component, signal } from '@angular/core';
import { RestaurantMap } from './restaurant-map/restaurant-map';

@Component({
  selector: 'app-root',
  imports: [RestaurantMap],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('local-restaurants');
}