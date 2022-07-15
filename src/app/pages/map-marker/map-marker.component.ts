import { Component, Input, OnInit } from '@angular/core';
import { MapComponent as GoongMap } from '../map/map.component';
declare const require: any;
const goongjs = require('@goongmaps/goong-js');

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styleUrls: ['./map-marker.component.css'],
})
export class MapMarkerComponent implements OnInit {
  @Input() markerPosition!: any[];
  @Input() markerTitle!: string;
  @Input() positionClick!: any[];

  constructor(private readonly _goongMap: GoongMap) {}

  ngOnInit(): void {
    console.log(this._goongMap);
    const popup = new goongjs.Popup({
      // offset: 50,
      // closeButton: false,
      // closeOnClick: false,
    }).setText(this.markerTitle ? this.markerTitle : '');
    let marker = new goongjs.Marker();
    marker.setLngLat(this.markerPosition);
    marker.addTo(this._goongMap.goongMap);
    marker.setPopup(popup);

    if (this.positionClick) {
      marker.setLngLat(this.positionClick);
      marker.addTo(this._goongMap.goongMap);
    }

    // this._goongMap.goongMap.on('mouseenter', marker,  (e: any) => {
    //   this._goongMap.goongMap.getCanvas().style.cursor = 'pointer';
    //   console.log(e)
    // })
  }
}
