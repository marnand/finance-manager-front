import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ToggleComponent } from '../toggle/toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  #router = inject(Router)

  readonly #currentRoute = toSignal(
    this.#router.events.pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
  )
  readonly showReader = computed(() => {
    if (this.#currentRoute()) {
      return !['/login', '/registrar'].includes(this.#router.url)
    }
    return false
  })

  readonly #theme = localStorage.getItem('theme')

  isDarkMode = this.#theme === null ? false : this.#theme === 'dark'

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode
    this.setTheme(this.isDarkMode)
  }

  logout(): void {
    localStorage.removeItem('auth_token')
    this.#router.navigate(['/login'])
  }

  private setTheme(isDark: boolean) {
    const htmlElement = document.documentElement
    isDark ? htmlElement.classList.add('dark') : htmlElement.classList.remove('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }
}
