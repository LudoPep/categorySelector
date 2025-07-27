import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ViewModeService } from '../../services/view-mode.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly viewModeService = inject(ViewModeService);
  readonly viewMode = this.viewModeService.viewMode;
  
  setCategoryGroupedView() {
    this.viewModeService.setGroup();
  }

  setAlphaOrderedView() {
    this.viewModeService.setAlpha();
  }

  get isGroupMode(): boolean {
    return this.viewMode() === 'group';
  }

  get isAlphaMode(): boolean {
    return this.viewMode() === 'alpha';
  }
}
