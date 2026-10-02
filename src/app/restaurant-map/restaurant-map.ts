import { afterNextRender, Component, signal } from '@angular/core';
import type { LayerGroup, Map } from 'leaflet';

interface RestaurantResult {
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

@Component({
  selector: 'app-restaurant-map',
  imports: [],
  templateUrl: './restaurant-map.html',
  styleUrl: './restaurant-map.scss',
})
export class RestaurantMap {
  private map?: Map;
  private restaurantMarkers?: LayerGroup;

  status = signal('Click “Find restaurants near me” to begin.');

  constructor() {
    afterNextRender(async () => {
      const L = await import('leaflet');

      this.map = L.map('map').setView([43.6532, -79.3832], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);
    });
  }

  findRestaurants(): void {
    if (!navigator.geolocation) {
      this.status.set('Your browser does not support location services.');
      return;
    }

    this.status.set('Requesting your location…');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => this.loadRestaurants(coords.latitude, coords.longitude),
      (error) => this.status.set(`Location failed: ${error.message}`),
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  }

  private async loadRestaurants(
    latitude: number,
    longitude: number,
  ): Promise<void> {
    if (!this.map) return;

    const L = await import('leaflet');

    this.status.set('Searching for nearby restaurants…');
    this.map.setView([latitude, longitude], 14);

    this.restaurantMarkers?.clearLayers();
    this.restaurantMarkers = L.layerGroup().addTo(this.map);

    L.circleMarker([latitude, longitude], {
      radius: 9,
      color: '#1565c0',
      fillColor: '#1565c0',
      fillOpacity: 1,
    })
      .addTo(this.restaurantMarkers)
      .bindPopup('You are here');

    const query = `
[out:json][timeout:20];
nwr["amenity"~"^(restaurant|cafe|fast_food)$"]
(around:1500,${latitude},${longitude});
out center tags;
`;

    try {
      const response = await fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error('Restaurant service unavailable.');
      }

      const data = (await response.json()) as {
        elements: RestaurantResult[];
      };

      let count = 0;

      for (const restaurant of data.elements) {
        const lat = restaurant.lat ?? restaurant.center?.lat;
        const lng = restaurant.lon ?? restaurant.center?.lon;

        if (lat === undefined || lng === undefined) continue;

        const name = restaurant.tags?.['name'] ?? 'Unnamed restaurant';
        const cuisine = restaurant.tags?.['cuisine'] ?? '';

        L.circleMarker([lat, lng], {
          radius: 7,
          color: '#e53935',
          fillColor: '#e53935',
          fillOpacity: 0.85,
        })
          .addTo(this.restaurantMarkers)
          .bindPopup(`<strong>${name}</strong><br>${cuisine}`);

        count++;
      }

      this.status.set(
        count
          ? `Found ${count} nearby restaurants.`
          : 'No nearby restaurants were found.',
      );
    } catch {
      this.status.set(
        'Could not load restaurants. Please try again shortly.',
      );
    }
  }
}