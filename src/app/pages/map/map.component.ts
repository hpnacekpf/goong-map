import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Input()
  set center(center: any[]) {
    this._center = center;
  }
  private _center!: any[];

  @Input()
  set key(key: string) {
    this._key = key;
  }
  private _key!: string;

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }
  private _zoom!: number;

  @Input() listMarker!: any[];
  @Output() mapClick = new EventEmitter();
  public goongMap: any;

  constructor(private readonly mapRef: ElementRef) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.goongMap = new goongjs.Map({
      container: this.mapRef.nativeElement.querySelector('.map'),
      accessToken: this._key,
      style: 'https://tiles.goong.io/assets/goong_map_web.json', // stylesheet location
      center: this._center, // starting position [lng, lat]
      zoom: this._zoom ? this._zoom : 10, // starting zoom
      baseApiUrl: 'https://api.goong.io',
      // hash: true, // vị trí của bản đồ (thu phóng, vĩ độ trung tâm, kinh độ trung tâm, điểm mang và cao độ) sẽ được đồng bộ hóa với phân đoạn băm của URL của trang.
      // attributionControl: true, // AttributionControl sẽ được thêm vào bản đồ.
      // trackResize: false, //bản đồ sẽ tự động thay đổi kích thước khi cửa sổ trình duyệt thay đổi kích thước
    });
    console.log(this.goongMap);
    const marker = new goongjs.Marker({scale: 0.8});
    // marker.remove(this.goongMap);
    // marker.setLngLat(this._center);
    // marker.addTo(this.goongMap);
    this.goongMap.on('click', (e: any) => {
      marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
      marker.addTo(this.goongMap);
      this.mapClick.emit([e.lngLat.lng, e.lngLat.lat]);
    });

    this.goongMap.addControl(new goongjs.FullscreenControl(), 'top-left');
    this.goongMap.addControl(new goongjs.NavigationControl(), 'top-left');
    this.goongMap.addControl(
      new GoongGeocoder({
        accessToken: '4JzlYLJWCeVcj489y43pQJcwqBlS4YjWe8f5SK50',
        goongjs: goongjs,
      })
    );

    // this.listMarker.map((item: any) => {
    //   new goongjs.Marker({ draggable: true })
    //     .setLngLat(item)
    //     .addTo(this.goongMap);
    //   // this.goongMap.flyTo({
    //   //   center: item,
    //   //   zoom: 10,
    //   //   essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    //   // });
    // });
  }
}
