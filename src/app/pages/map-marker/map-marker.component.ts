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

  // @Input() positionClick!: any[];
  marker = new goongjs.Marker({scale: 0.8});

  constructor(private readonly _goongMap: GoongMap) {}

  ngOnInit(): void {
    // const popup = new goongjs.Popup({
    // offset: 50,
    // closeButton: false,
    // closeOnClick: false,
    // }).setText(this.markerTitle ? this.markerTitle : '');
    this.marker.setLngLat(this._position);
    this.marker.addTo(this._goongMap.goongMap);
    // this.marker.setPopup(popup);

    // if (this.positionClick) {
    //   this.marker.setLngLat(this.positionClick);
    //   this.marker.addTo(this._goongMap.goongMap);
    // }

    // this._goongMap.goongMap.on('mouseenter', marker,  (e: any) => {
    //   this._goongMap.goongMap.getCanvas().style.cursor = 'pointer';
    //   console.log(e)
    // })
    // this._ngZone.runOutsideAngular(() => {
    //   this.marker = new goongjs.Marker(this._combineOptions());
    // });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   const { marker, _title, _position, _visible } = this;
  //   console.log(marker)
  //   /** Creates a combined options object using the passed-in options and the individual inputs. */
  //   if (marker) {
  //     // if (changes['options']) {
  //     //   marker.setOptions(this._combineOptions());
  //     // }

  //     if (changes['title'] && _title !== undefined) {
  //       marker.setTitle(_title);
  //     }

  //     if (changes['position'] && _position) {
  //       marker.setPosition(_position);
  //     }

  //     if (changes['visible'] && _visible !== undefined) {
  //       marker.setVisible(_visible);
  //     }
  //   }
  // }
  // private _combineOptions() {
  //   const options = this._options || DEFAULT_MARKER_OPTIONS;
  //   return {
  //     ...options,
  //     title: this._title || options.title,
  //     position: this._position || options.position,
  //     visible: this._visible ?? options.visible,
  //   };
  // }
}
