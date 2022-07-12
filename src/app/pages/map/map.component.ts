import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() locationCenter!: any[];
  @Input() key!: any;
  @Output() getLocationMarker = new EventEmitter();

  locationForm!: FormGroup;
  lng!: FormControl;
  lat!: FormControl;
  public goongMap: any;
  marker: any;

  constructor(builder: FormBuilder) {
    this.lng = new FormControl('', [Validators.required]);
    this.lat = new FormControl('', []);
    this.locationForm = builder.group({
      lng: this.lng,
      lat: this.lat,
    });
    console.log(goongjs);
    console.log(this.locationForm);
  }

  ngOnInit(): void {
    console.log(directionService);
    this.goongMap = new goongjs.Map({
      container: 'map',
      accessToken: this.key,
      style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
      center: this.locationCenter, // starting position [lng, lat]
      zoom: 10, // starting zoom
      baseApiUrl: 'https://api.goong.io',
      hash: true,
      attributionControl: true,
    });
    var marker = new goongjs.Marker();
    marker.remove(this.goongMap);
    marker.setLngLat(this.locationCenter);
    marker.addTo(this.goongMap);
    this.goongMap.on('click', (e: any) => {
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      marker.addTo(this.goongMap);
      this.getLocationMarker.emit([e.lngLat.lng, e.lngLat.lat]);
    });
    this.goongMap.addControl(new goongjs.FullscreenControl(), 'top-left');
    this.goongMap.addControl(new goongjs.NavigationControl(), 'top-left');
    this.goongMap.addControl(
      new GoongGeocoder({
        accessToken: '4JzlYLJWCeVcj489y43pQJcwqBlS4YjWe8f5SK50',
        goongjs: goongjs,
      })
    );
  }

  addMarker() {
    const lngLat = [
      this.locationForm.value.lng * 1,
      this.locationForm.value.lat * 1,
    ];
    new goongjs.Marker().setLngLat(lngLat).addTo(this.goongMap);
    this.goongMap.flyTo({
      center: lngLat,
      zoom: 12,
      essential: true,
    });
    this.getLocationMarker.emit(lngLat);
  }
}
