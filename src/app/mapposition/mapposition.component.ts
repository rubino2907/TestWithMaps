import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { LocalizacaobycityComponent } from '../localizacaobycity/localizacaobycity.component';
import { JsmapComponent } from '../jsmap/jsmap.component';

@Component({
  selector: 'app-mapposition',
  standalone: true,
  imports: [CommonModule, LocalizacaobycityComponent, JsmapComponent],
  templateUrl: './mapposition.component.html',
  styleUrls: ['./mapposition.component.css']
})
export class MappositionComponent {

  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;
  
  @Output() notify = new EventEmitter();

}
