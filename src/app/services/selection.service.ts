import { Injectable, signal } from '@angular/core';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  selectedCategories = signal<Category[]>([]);

  // Select a category
  toSelectCategory(category: Category) {
    const isSelected = this.selectedCategories().some(c => c.id === category.id);
    this.selectedCategories.set(isSelected ? [] : [category]);
  }

  // Remove the selected state
  clearSelection() {
    this.selectedCategories.set([]);
  }
}
