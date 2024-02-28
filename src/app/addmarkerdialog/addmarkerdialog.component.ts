import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addmarkerdialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addmarkerdialog.component.html',
  styleUrls: ['./addmarkerdialog.component.css']
})
export class AddmarkerdialogComponent {
  
  @Input() collections: { id: number, name: string }[] = [];
  @Output() markerAdded = new EventEmitter<{ name: string, collectionId: number }>();
  @Output() cancel = new EventEmitter<void>();

  markerName: string = '';
  selectedCollectionId: number | undefined;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    // Implemente a lógica para abrir o diálogo aqui
    const dialogRef = this.dialog.open(AddmarkerdialogComponent, {
      // Configurações do diálogo, se necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      // Lógica após o fechamento do diálogo, se necessário
    });
  }

  confirm() {
    if (this.selectedCollectionId !== undefined) {
      this.markerAdded.emit({ name: this.markerName, collectionId: this.selectedCollectionId });
      this.markerName = ''; // Limpa o campo de entrada
    }
  }

  cancelDialog() {
    this.cancel.emit();
  }
}
