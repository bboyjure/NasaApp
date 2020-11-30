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

  constructor(private nasaService: NasaService) { }

  loaded = true;
  options: any = [];
  overlays: any[] = [];
  wildfires: any[];
  latitude: number;
  longitude: number;

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.options = {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 10,
      };
    });
    this.nasaService.getData().subscribe(
      (data) => {
        this.wildfires = data.events;
      },
      (err) => {
        console.log('Error ' + err);
      },
      () => {
        this.loaded = false;
        this.wildfires.forEach((e) => {
          if (e.categories.find((id) => id.id === 8)) {
            e.geometries.forEach((geo) => {
              const fireLat = geo.coordinates[1];
              const fireLong = geo.coordinates[0];
              this.overlays.push(
                new google.maps.Marker({
                  position: { lat: fireLat, lng: fireLong },
                  title: e.title,
                  icon: '../assets/img/fire-icon.png',
                  optimized: false,
                })
              );
              console.log(this.overlays);
            });
          }
        });
      }
    );
  }
}
