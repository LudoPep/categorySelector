import { Routes } from '@angular/router';

export const routes: Routes = [
    {   
        path: '', redirectTo: 'categories', pathMatch: 'full' 
    },
    {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then((m) => m.CategoriesComponent),
    },
];
