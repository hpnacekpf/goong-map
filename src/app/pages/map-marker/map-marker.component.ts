import { Component, Input, NgZone, OnInit, SimpleChanges } from '@angular/core';
import { MapComponent as GoongMap } from '../map/map.component';
declare const require: any;
const goongjs = require('@goongmaps/goong-js');
export const DEFAULT_MARKER_OPTIONS = {
  position: { lat: 37.421995, lng: -122.084092 },
};

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnInit {
  @Input()
  set position(position: any[]) {
    this._position = position;
  }
  private _position!: any[];
  @Input()
  set title(title: string) {
    this._title = title;
  }
  private _title!: string;
  marker = new goongjs.Marker({scale: 0.8});

  constructor(private readonly _goongMap: GoongMap) {}

  ngOnInit(): void {
    this.marker.setLngLat(this._position);
    this.marker.addTo(this._goongMap.goongMap);

  }
}
