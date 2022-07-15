import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'testmap2';
  center = [105.89991, 21.0528];
  key = 'yzMlW7WxOTIbgIA62NbzpqbIQDqMz1hkKxA4bMF0';
  zoom = 10;
  listMarker = [
    // [105.89991, 21.028],
    // [105.83911, 21.028],
    // [105.82911, 21.021],
  ];
  markerPositions = [
    [105.89991, 21.012328],
    [105.83911, 21.0112328],
    [105.82911, 21.0211241],
  ];
  markerOptions = { draggable: true };
  // markerPosition = [105.82911, 21.021]
  // markerTitle = "title"
  // markerPosition2 = [105.82911, 21.09521]
  // markerTitle2 = "title2"
  center2 = [105.83911, 21.028];
  key2 = 'bxaNaBDC2vp7dAD41vPH5MZ44bItOaSCp3djnBVC';
  zoom2 = 10;

  mapClick(value: any) {
    console.log(value);
    this.markerPositions.push(value);
  }
}
