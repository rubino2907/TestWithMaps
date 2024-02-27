import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css'
})
export class TopNavbarComponent {

  constructor(private router: Router) {}

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  GotoLogin(){
    this.router.navigate(['']);
  }

  GoToLocalizacaoHereMaps(){
    this.router.navigate(['LocalizacaoByCity']);
  }
  GoToLocalizacaoMapBoxMaps(){
    this.router.navigate(['Localizacao']);
  }
}
