import { Injectable, signal } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  selectedCategories = signal<Category[]>([]);

  toggleCategory(category: Category) {
    const isSelected = this.selectedCategories().some(c => c.id === category.id);
    this.selectedCategories.set(isSelected ? [] : [category]);
  }

  clearSelection() {
    this.selectedCategories.set([]);
  }
}
