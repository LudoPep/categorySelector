import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../interfaces/category';
import { SelectionService } from '../../services/selection.service';
import { getColorStyle } from '../../utils/colorUtils';

@Component({
  selector: 'app-category-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  @Input() category!: Category;
  @Input() view: 'group' | 'alpha' = 'group';

  public getColorStyle = getColorStyle;

  selectedCategoryId: number | null = null;

  constructor(
    public readonly selectionService: SelectionService,
  ) { }

  toggleClicked() {
    this.selectionService.toSelectCategory(this.category);
  }

  isSelected(): boolean {
    return this.selectionService.selectedCategories()
            .some(cat => cat.id === this.category.id);
  }

}
