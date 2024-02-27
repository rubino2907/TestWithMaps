import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  constructor(private router: Router) {}

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  GotoRelatorios(){
    this.router.navigate(['Listas']);
  }
}
