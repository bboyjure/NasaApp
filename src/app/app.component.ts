import { Component, OnInit } from '@angular/core';
import { NasaService } from './nasa.service';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NasaApp';

  constructor(private nasaService: NasaService) {}

  options: any;
  overlays: any[] = [];
  wildfires: any[];

  ngOnInit(): void {
    this.options = {
      center: {
        lat: 46.255308799999995,
        lng: 14.358937599999999,
      },
      zoom: 10,
    };
    this.nasaService.getData().subscribe(
      (data) => {
        this.wildfires = data.events;
      },
      (err) => {
        console.log('Error ' + err);
      },
      () => {
        this.wildfires.forEach((e) => {
          if (e.categories.find((id) => id.id === 8)) {
            e.geometries.forEach((geo) => {
              const fireLat = geo.coordinates[0];
              const fireLong = geo.coordinates[1];
              const marker = new google.maps.Marker({
                position: { lat: fireLat, lng: fireLong },
                title: e.title,
              });
              this.overlays.push(marker);
            });
            console.log(this.overlays.length); // THIS LOGS 75
            console.log(this.overlays); //THIS LOGS ALL THE MARKES THAT WERE PUSHED INTO ARRAY
          }
        });
      }
    );
  }
}
