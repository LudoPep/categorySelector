import { Component, computed, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../interfaces/category';
import { CategoryGroup } from '../../interfaces/category-group';
import { CommonModule } from '@angular/common';
import { CategoryItemComponent } from '../category-item/category-item.component';
import { SearchComponent } from '../search/search.component';
import { ViewModeService } from '../../services/view-mode.service';
import { SelectionService } from '../../services/selection.service';
import { getColorStyle } from '../../utils/colorUtils';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    CategoryItemComponent,
    SearchComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  categories = signal<Category[]>([]);
  groupedCategories = signal<CategoryGroup[]>([]);
  selectedGroupId = signal<number | null>(null);
  currentView = computed(() => this.viewModeService.viewMode());
  searchTerm = signal('');
  selectedCategories = computed(() => this.selectionService.selectedCategories());
  public getColorStyle = getColorStyle;

  filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const selectedGroupId = this.selectedGroupId();
    return this.groupedCategories()
      .filter(group =>
        selectedGroupId === null || group.group?.id === selectedGroupId
      )
      .map(group => ({
        ...group,
        categories: group.categories.filter(category =>
          category.wording.toLowerCase().includes(term)
        )
      }))
      .filter(group => group.categories.length > 0);
  });
  
  flatCategories = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.categories()
      .filter(category => category.wording.toLowerCase().includes(term))
      .sort((a, b) => a.wording.localeCompare(b.wording));
  });

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly viewModeService: ViewModeService,
    public readonly selectionService: SelectionService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getGroupedVisibleCategories().subscribe({
      next: (data) => {
        this.groupedCategories.set(data);
        const allCategories = data.flatMap(group => group.categories);
        this.categories.set(allCategories);
      },
      error: (err) => {
        console.log('error', err);
      }
    })
  }

  setSearchTerm(term: string) {
    this.searchTerm.set(term);
  }

  setSelectedGroup(id: number | null) {
    this.selectedGroupId.set(id);
  }

}
