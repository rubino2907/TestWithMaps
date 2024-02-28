import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatFormFieldModule, FormsModule, MatCheckboxModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  collectionName: string = '';
  collections: { id: number, name: string, checked: boolean }[] = []; // Adicionamos a propriedade 'checked'
  selectedCollection: any; // Variável para rastrear a coleção selecionada
  nextId: number = 1; // Contador para o próximo ID

  constructor(private router: Router) {
    // Carregar coleções do localStorage quando o componente é inicializado
    const storedCollections = localStorage.getItem('collections');
    if (storedCollections) {
      this.collections = JSON.parse(storedCollections);
    }
  
    // Carregar o próximo ID do localStorage ou iniciar em 1 se não houver valor armazenado
    const storedNextId = localStorage.getItem('nextId');
    if (storedNextId) {
      this.nextId = parseInt(storedNextId, 10);
    }
  }

  // Declare o EventEmitter
  @Output() collectionSelected = new EventEmitter<number>();

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

    // Adicionamos a propriedade 'checked' ao criar uma nova coleção
    this.collections.push({ id: this.nextId++, name: this.collectionName, checked: false });

    this.collectionName = ''; // Limpar o campo de entrada

    // Salvar coleções no localStorage
    localStorage.setItem('collections', JSON.stringify(this.collections));
    localStorage.setItem('nextId', this.nextId.toString());

    this.closePopup();
  }

  editCollectionName(collection: { id: number, name: string }) {
    var newCollectionName = prompt("Editar nome da coleção", collection.name);
    if (newCollectionName !== null && newCollectionName.trim() !== "") {
      collection.name = newCollectionName;

      // Atualizar coleções no localStorage após edição
      localStorage.setItem('collections', JSON.stringify(this.collections));
    }
  }

  deleteCollection(collection: { id: number, name: string }) {
    var confirmDelete = confirm("Tem certeza de que deseja excluir esta coleção?");
    if (confirmDelete) {
      const index = this.collections.findIndex(col => col.id === collection.id);
      if (index !== -1) {
        this.collections.splice(index, 1);
  
        // Atualizar coleções no localStorage após exclusão
        localStorage.setItem('collections', JSON.stringify(this.collections));
      }
    }
  }
  
  selectCollection(event: any, collectionId: number) {
    console.log('Coleção selecionada:', collectionId); // Adiciona um log para verificar o valor da coleção selecionada
    // Atualizamos o estado 'checked' da coleção
    const index = this.collections.findIndex(col => col.id === collectionId);
    if (index !== -1) {
      this.collections[index].checked = !this.collections[index].checked;
    }
    this.selectedCollection = collectionId;
    this.collectionSelected.emit(this.selectedCollection);

    // Salvar coleções atualizadas no localStorage
    localStorage.setItem('collections', JSON.stringify(this.collections));
  }

  GotoRelatorios() {
    this.router.navigate(['Listas']);
  }
}
