import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { MappositionComponent } from '../mapposition/mapposition.component';
import { JsmapComponent } from '../jsmap/jsmap.component';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-localizacaobycity',
  standalone: true,
  imports: [CommonModule, MappositionComponent, JsmapComponent, TopNavbarComponent, SidebarComponent],
  templateUrl: './localizacaobycity.component.html',
  styleUrls: ['./localizacaobycity.component.css']
})

export class LocalizacaobycityComponent {

  title = 'jsapi-angular';

  constructor() {
    this.zoom = 2;
    this.lat = 0;
    this.lng = 0;
  }

  zoom: number;
  lat: number;
  lng: number;

  handleInputChange(event: Event) {
    const target = <HTMLInputElement> event.target;
    if (target) {
      if (target.name === 'zoom') {
        this.zoom = parseFloat(target.value);
      }
      if (target.name === 'lat') {
        this.lat = parseFloat(target.value);
      }
      if (target.name === 'lng') {
        this.lng = parseFloat(target.value);
      }
    }
  }

  handleMapChange(event: H.map.ChangeEvent) {
    if (event.newValue.lookAt) {
      const lookAt = event.newValue.lookAt;
      this.zoom = lookAt.zoom;
      this.lat = lookAt.position.lat;
      this.lng = lookAt.position.lng;
    }
  }


}
