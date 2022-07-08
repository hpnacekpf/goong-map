import { Component, OnInit } from '@angular/core';
declare const require: any;
const goongClient = require('@goongmaps/goong-sdk');
const goongDirections = require('@goongmaps/goong-sdk/services/directions');

const baseClient = goongClient({
  accessToken: '4JzlYLJWCeVcj489y43pQJcwqBlS4YjWe8f5SK50',
});
const directionService = goongDirections(baseClient);
const GoongGeocoder = require('@goongmaps/goong-geocoder');
const goongjs = require('@goongmaps/goong-js');
var polyline = require('@mapbox/polyline');
// const goongSdk = require('@goongmaps/goong-sdk');

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  public goongMap: any;
  marker: any;
  listMaker = [
    [105.89991, 21.028],
    [105.83911, 21.028],
    [105.82911, 21.021],
  ];

  constructor() {
    console.log(goongjs);
  }

  ngOnInit(): void {
    console.log(directionService);
    this.goongMap = new goongjs.Map({
      container: 'map',
      accessToken: 'yzMlW7WxOTIbgIA62NbzpqbIQDqMz1hkKxA4bMF0',
      style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
      center: [105.83991, 21.028], // starting position [lng, lat]
      zoom: 10, // starting zoom
      baseApiUrl: 'https://api.goong.io',
    });
    console.log(this.goongMap);
    this.listMaker.map((item: any) => {
      new goongjs.Marker({ draggable: true })
        .setLngLat(item)
        .addTo(this.goongMap);
    });
    this.goongMap.on('click', (e: any) => {
      console.log(e);
      // var popup = new goongjs.Popup({ offset: 25 }).setText(
      //   'The President Ho Chi Minh Mausoleum is a mausoleum which serves as the resting place of Vietnamese Revolutionary leader & President Ho Chi Minh in Hanoi, Vietnam'
      //   );
      new goongjs.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]);
      // .setPopup(popup)
      // .addTo(this.goongMap);
    });
    this.goongMap.addControl(new goongjs.FullscreenControl());
    this.goongMap.addControl(
      new GoongGeocoder({
        accessToken: '4JzlYLJWCeVcj489y43pQJcwqBlS4YjWe8f5SK50',
        goongjs: goongjs,
      })
    );

    this.goongMap.on('load', () => {
      var layers = this.goongMap.getStyle().layers;
      // Find the index of the first symbol layer in the map style
      var firstSymbolId: any;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
          firstSymbolId = layers[i].id;
          break;
        }
      }
      directionService
        .getDirections({
          origin: '20.993872540411516,105.84674022526383',
          destination: '20.982423332810768,105.84337956486735',
          vehicle: 'bike',
        })
        .send()
        .then((response: any) => {
          var directions = response.body;
          var route = directions.routes[0];
          var geometry_string = route.overview_polyline.points;
          var geoJSON = polyline.toGeoJSON(geometry_string);
          this.goongMap.addSource('route', {
            type: 'geojson',
            data: geoJSON,
          });
          // Add route layer below symbol layers
          this.goongMap.addLayer(
            {
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#1e88e5',
                'line-width': 4,
              },
            },
            firstSymbolId
          );
        });
    });
    this.goongMap.on('load', () => {
      this.goongMap.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                icon: 'theatre',
              },
              geometry: {
                type: 'Point',
                coordinates: [105.39991, 21.028],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                icon: 'theatre',
              },
              geometry: {
                type: 'Point',
                coordinates: [105.23911, 21.028],
              },
            },
            {
              type: 'Feature',
              properties: {
                description:
                  '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
                icon: 'bar',
              },
              geometry: {
                type: 'Point',
                coordinates: [105.12911, 21.021],
              },
            },
          ],
        },
      });
      // Add a layer showing the places.
      this.goongMap.addLayer({
        id: 'places',
        type: 'symbol',
        source: 'places',
        layout: {
          'icon-image': '{icon}-15',
          'icon-allow-overlap': true,
        },
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      this.goongMap.on('click', 'places', (e: any) => {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new goongjs.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(this.goongMap);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      this.goongMap.on('mouseenter', 'places', () => {
        this.goongMap.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.goongMap.on('mouseleave', 'places', () => {
        this.goongMap.getCanvas().style.cursor = '';
      });
    });
  }
}
