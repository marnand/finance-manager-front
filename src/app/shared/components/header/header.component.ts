import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private router = inject(Router);
  private readonly _theme = localStorage.getItem('theme');
  isDarkMode = this._theme === null ? false : this._theme === 'dark';

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.setTheme(this.isDarkMode);
  }

  shouldShowHeader(): boolean {
    return !['/login', '/registrar'].includes(this.router.url);
  }

  private setTheme(isDark: boolean) {
    const htmlElement = document.documentElement;
    isDark ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}
