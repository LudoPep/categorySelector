import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewModeService {
  private readonly _viewMode = signal<'group' | 'alpha'>('group');

  get viewMode() {
    return this._viewMode.asReadonly();
  }

  setGroup() {
    this._viewMode.set('group');
  }

  setAlpha() {
    this._viewMode.set('alpha');
  }
}
