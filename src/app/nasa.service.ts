import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  readonly NASA_URL = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events';
  events: any;

  constructor(private http: HttpClient) { }

  getData(): Observable<any>{
    this.events = this.http.get(this.NASA_URL);
    return this.events;
  }
}
