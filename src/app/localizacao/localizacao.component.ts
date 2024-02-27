import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-localizacao',
  standalone: true,
  imports: [CommonModule, TopNavbarComponent, SidebarComponent],
  templateUrl: './localizacao.component.html',
  styleUrls: ['./localizacao.component.css']
})

export class LocalizacaoComponent implements OnInit {

  map: mapboxgl.Map | any;
  draw: any;
  marker1: mapboxgl.Marker;
  marker2: mapboxgl.Marker;

  constructor() {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        trash: false
      },
      //defaultMode: 'draw_polygon'
    });

    // Crie os marcadores no construtor
    const popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
    );
    this.marker1 = new mapboxgl.Marker()
      .setLngLat([12.554729, 55.70651])
      .setPopup(popup1);

    const popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
      'Another marker popup.'
    );
    this.marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
      .setLngLat([12.65147, 55.608166])
      .setPopup(popup2);
  
    }
  

  ngOnInit(): void {
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoicnViaW5vdXUiLCJhIjoiY2xzdnpnc3luMXE0MDJrcWtpMzhiY3FwaCJ9.Rvin9a4gwjGpjVIh6_jOiA';
    this.map = new mapboxgl.Map({
      container: 'map',
      center: [-8.2245, 39.3999], // Coordenadas de Portugal
      zoom: 13,
    });
    this.map.addControl(this.draw, 'bottom-right');

    // Adicione os marcadores ao mapa aqui
    this.marker1.addTo(this.map);
    this.marker2.addTo(this.map);
  }

  drawPolygon(){
    this.draw.changeMode('draw_polygon')
  }

  drawPoint(){
    this.draw.changeMode('draw_point')
  }

  drawLine(){
    this.draw.changeMode('draw_line_string')
  }

  deleteAll(){
    this.draw.deleteAll()
  }

  streets(){
    this.map.setStyle('mapbox://styles/mapbox/streets-v12');
  }

  light(){
    this.map.setStyle('mapbox://styles/mapbox/light-v11')
  }

  dark(){
    this.map.setStyle('mapbox://styles/mapbox/dark-v11')
  }
  satelite(){
    this.map.setStyle('mapbox://styles/mapbox/satellite-streets-v11')
  }

}
