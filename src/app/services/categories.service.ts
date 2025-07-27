import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { combineLatest, forkJoin, map, Observable } from 'rxjs';
import { VisibleCategory } from '../interfaces/visible-category';
import { CategoryGroup } from '../interfaces/category-group';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  apiServer = 'http://localhost:3000';
  
  constructor(
    private http: HttpClient,
  ) {}

  // Show all the categories returned
  public getAllCategories = (): Observable<Category[]> => {
    const endpoint = `${this.apiServer}/all-categories`;
    return this.http.get<Category[]>(endpoint);
  }

  // Only the categories that are visible on screen
  public getVisibleCategories = (): Observable<VisibleCategory[]> => {
    const endpoint = `${this.apiServer}/visible-categories`;
    return this.http.get<VisibleCategory[]>(endpoint);
  }

  // Shows only the categories that ids are returned in getVisibleCategories()
  public getFilteredCategories = (): Observable<Category[]> => {
    return combineLatest([
      this.getAllCategories(),
      this.getVisibleCategories()
    ]).pipe(
      map(([allCategories, visibleCategoriesIds]) => {
        const visibleIds = new Set(visibleCategoriesIds.map(vc => vc.id));
        return allCategories.filter(category => visibleIds.has(category.id));
      })
    );
  }

  // Shows every group and their categories
  public getGroupedVisibleCategories = (): Observable<CategoryGroup[]> => {
  return combineLatest([
    this.getAllCategories(),
    this.getVisibleCategories()
  ]).pipe(
    map(([allCategories, visibleCategoryIds]) => {
      const visibleIds = new Set(visibleCategoryIds.map(vc => vc.id));
      const filtered = allCategories.filter(cat => visibleIds.has(cat.id));

      const groups = new Map<number, CategoryGroup>();

      for (const cat of filtered) {
        const group = cat.group;

        if (!group) continue;

        if (!groups.has(group.id)) {
          groups.set(group.id, {
            group,
            categories: [cat]
          });
        } else {
          groups.get(group.id)!.categories.push(cat);
        }
      }

      return Array.from(groups.values());
    })
  );
}
}
