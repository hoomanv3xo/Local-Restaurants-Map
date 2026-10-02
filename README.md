# Local Restaurants Map

An Angular app that shows a map, requests the visitor's location, and marks nearby restaurants, cafés, and fast-food places.

## What it does

- Shows an interactive OpenStreetMap map using Leaflet.
- Starts centred on Toronto until a location is selected.
- Uses the browser's location permission to find the visitor.
- Searches within 1.5 km for restaurants, cafés, and fast-food places.
- Shows the visitor as a blue marker and places found as red markers.

## Run the app

### From the Desktop shortcut

Double-click **Run Local Restaurants.bat** on the Desktop. It starts the development server and opens the app.

### From a terminal

Open Git Bash or a terminal and run:

```bash
cd ~/local-restaurants
npm start
```

Then visit [http://localhost:4200](http://localhost:4200).

To stop the server, return to the terminal and press `Ctrl+C`.

## Use the restaurant finder

1. Click **Find restaurants near me**.
2. When Chrome asks for location access, choose **Allow**.
3. Wait a few seconds for the map to centre on your location and add markers.
4. Click a red marker to see the restaurant's name and cuisine, when available.

If location is denied or unavailable, enable **Location services** in Windows Settings, allow Location for `localhost:4200` in Chrome, refresh the page, and try again.

## Install dependencies

For a fresh copy of the project:

```bash
npm install
```

## Build for production

```bash
npm run build
```

The build output is written to `dist/`.

## Data and map credits

Map tiles and place data are provided by OpenStreetMap contributors. Restaurant results are queried through the public Overpass API. Availability and completeness can vary, so this app is best suited to a small personal project or prototype.

## Main project files

```text
src/app/restaurant-map/restaurant-map.ts    Map, location, and restaurant-search logic
src/app/restaurant-map/restaurant-map.html  Button and map container
src/app/restaurant-map/restaurant-map.scss  Map and button styling
src/styles.scss                             Leaflet stylesheet import
```

