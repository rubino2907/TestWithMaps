import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  collectionName: string = '';
  collections: { name: string }[] = [];

  constructor(private router: Router) {
    // Carregar coleções do localStorage quando o componente é inicializado
    const storedCollections = localStorage.getItem('collections');
    if (storedCollections) {
      this.collections = JSON.parse(storedCollections);
    }
  }

  goToPage(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  openPopup() {
    var popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "block";
    }
  }
  
  closePopup() {
    var popup = document.getElementById("popup");
    if (popup) {
      popup.style.display = "none";
    }
  }

  createCollection() {
    if (this.collectionName.trim() === "") {
      alert("Por favor, insira um nome para a coleção.");
      return;
    }

    this.collections.push({ name: this.collectionName });

    this.collectionName = ''; // Limpar o campo de entrada

    // Salvar coleções no localStorage
    localStorage.setItem('collections', JSON.stringify(this.collections));

    this.closePopup();
  }

  editCollectionName(collection: { name: string }) {
    var newCollectionName = prompt("Editar nome da coleção", collection.name);
    if (newCollectionName !== null && newCollectionName.trim() !== "") {
      collection.name = newCollectionName;

      // Atualizar coleções no localStorage após edição
      localStorage.setItem('collections', JSON.stringify(this.collections));
    }
  }

  deleteCollection(collection: { name: string }) {
    var confirmDelete = confirm("Tem certeza de que deseja excluir esta coleção?");
    if (confirmDelete) {
      const index = this.collections.indexOf(collection);
      if (index !== -1) {
        this.collections.splice(index, 1);

        // Atualizar coleções no localStorage após exclusão
        localStorage.setItem('collections', JSON.stringify(this.collections));
      }
    }
  }

  GotoRelatorios() {
    this.router.navigate(['Listas']);
  }
}
