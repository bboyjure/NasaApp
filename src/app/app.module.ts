import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GMapModule} from 'primeng/gmap';
import { HttpClientModule } from '@angular/common/http'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GMapModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
