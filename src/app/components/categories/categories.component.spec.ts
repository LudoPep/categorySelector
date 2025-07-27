import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoriesService } from '../../services/categories.service';
import { ViewModeService } from '../../services/view-mode.service';
import { SelectionService } from '../../services/selection.service';
import { of } from 'rxjs';
import { CategoryGroup } from '../../interfaces/category-group';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  const mockCategoriesService = {
    getGroupedVisibleCategories: jest.fn()
  };

  const mockViewModeService = {
    viewMode: jest.fn(() => 'group')
  };

  const mockSelectionService = {
    selectedCategories: jest.fn(() => [])
  };

  const mockGrouped: CategoryGroup[] = [
    {
      group: { id: 1, name: "Autres rentrées d'argent", color: 'm-blue' },
      categories: [
        { id: 1, wording: 'Title 1', description: 'Description 1' },
        { id: 2, wording: 'Title 2', description: 'Description 2' }
      ]
    },
    {
      group: { id: 2, name: 'Achats & Sous-traitance', color: 'm-blue' },
      categories: [{ id: 3, wording: 'Title 3', description: 'Description 3' }]
    }
  ];

  beforeEach(async () => {
    mockCategoriesService.getGroupedVisibleCategories.mockReturnValue(of([]));
    
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CategoriesComponent],
        providers: [
          { provide: CategoriesService, useValue: mockCategoriesService },
          { provide: ViewModeService, useValue: mockViewModeService },
          { provide: SelectionService, useValue: mockSelectionService }
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCategories on init', () => {
    mockCategoriesService.getGroupedVisibleCategories.mockReturnValue(of([]));
    component.ngOnInit();
    expect(mockCategoriesService.getGroupedVisibleCategories).toHaveBeenCalled();
  });

  it('should store data in signals after getCategories', () => {
    mockCategoriesService.getGroupedVisibleCategories.mockReturnValue(of(mockGrouped));
    component.getCategories();

    expect(component.groupedCategories()).toEqual(mockGrouped);
    expect(component.categories()).toEqual([
      { id: 1, wording: 'Title 1', description: 'Description 1' },
      { id: 2, wording: 'Title 2', description: 'Description 2' },
      { id: 3, wording: 'Title 3', description: 'Description 3' }
    ]);
  });

  it('should set search term', () => {
    component.setSearchTerm('title');
    expect(component.searchTerm()).toBe('title');
  });

  it('should set selected group ID', () => {
    component.setSelectedGroup(2);
    expect(component.selectedGroupId()).toBe(2);
  });

  it('should compute filteredCategories', () => {
    component.groupedCategories.set(mockGrouped);
    component.setSearchTerm('title 2');
    component.setSelectedGroup(1);

    const result = component.filteredCategories();

    expect(result.length).toBe(1);
    expect(result[0].categories[0].wording).toBe('Title 2');
  });

  it('should compute flatCategories sorted & filtered', () => {
    component.categories.set([
      { id: 1, wording: 'Title 1', description: 'Description 1' },
      { id: 2, wording: 'Title 2', description: 'Description 1' },
      { id: 3, wording: 'Title 3', description: 'Description 1' }
    ]);
    component.setSearchTerm('i');

    const flat = component.flatCategories();
    const wordings = flat.map(c => c.wording);

    expect(wordings).toEqual(['Title 1', 'Title 2', 'Title 3']);
  });
});
