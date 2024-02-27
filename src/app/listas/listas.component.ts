import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from '../top-navbar/top-navbar.component';

@Component({
  selector: 'app-listas',
  standalone: true,
  imports: [SidebarComponent, CommonModule, TopNavbarComponent, MatTableModule ],
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  displayedColumns: string[] = ['name', 'latitude', 'longitude', 'label'];
  dataSource = new MatTableDataSource<any>(); // Inicialize a dataSource como uma MatTableDataSource

  ngOnInit(): void {
    // Aqui você pode carregar os dados para a dataSource, por exemplo, do localStorage
    const landmarksString = localStorage.getItem('landmarks');
    if (landmarksString) {
      const landmarks = JSON.parse(landmarksString);
      this.dataSource.data = landmarks;
    }
  }
}
