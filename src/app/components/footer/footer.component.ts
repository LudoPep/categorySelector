import { Component, computed, inject, signal } from '@angular/core';
import { SelectionService } from '../../services/selection.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isDisabled = computed(() => this.selectionService.selectedCategories().length === 0);
  confirmationMessage = signal<string | null>(null);

  constructor(
    public readonly selectionService: SelectionService
  ) {}

  submitCategory() {
    const selected = this.selectionService.selectedCategories();
    if (selected.length === 1) {
      this.confirmationMessage.set(`✅ Catégorie sélectionnée : ${selected[0].wording}`);
      this.selectionService.clearSelection();
    } else {
      this.confirmationMessage.set('Aucune catégorie sélectionnée.');
    }

    setTimeout(() => this.confirmationMessage.set(null), 3000);
  }

}
