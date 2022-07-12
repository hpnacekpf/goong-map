import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locationCenter = [105.89991, 21.028];
  locationCenter2 = [105.83911, 21.028];
  key = "yzMlW7WxOTIbgIA62NbzpqbIQDqMz1hkKxA4bMF0";
  key2 = "bxaNaBDC2vp7dAD41vPH5MZ44bItOaSCp3djnBVC";
  title = 'testmap2';

  locationMarker(value: any) {
    console.log(value);
  }
}
