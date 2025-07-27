import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { CategoryGroup } from '../../interfaces/category-group';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getColorStyle } from '../../utils/colorUtils';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() searchTerm = '';
  @Input() groupedCategories!: Signal<CategoryGroup[]>;
  @Output() searchTermChange = new EventEmitter<string>();
  @Output() selectedGroupChange = new EventEmitter<number | null>();

  public getColorStyle = getColorStyle;

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTermChange.emit(value);
  }

  onGroupChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const parsedValue = value ? parseInt(value, 10) : null;
    this.selectedGroupChange.emit(parsedValue);
  }

}
