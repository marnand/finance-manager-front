import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnackbarType } from '@app/core/model/Snackbar';

@Component({
  selector: 'snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible) {
      <div 
        [@slideInOut]
        class="fixed top-4 right-4 p-4 rounded-lg shadow-lg max-w-sm z-50"
        [class]="typeClasses"
      >
        {{ message }}
      </div>
    }
  `,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class SnackbarComponent {
  message: string = '';
  type: SnackbarType = 'info';
  visible: boolean = false;
  hostElement: HTMLElement | null = null;

  private static activeCount = 0;
  private position = 0;

  constructor() {
    this.position = SnackbarComponent.activeCount++;
    this.updatePosition();
  }

  ngOnDestroy() {
    SnackbarComponent.activeCount--;
  }

  private updatePosition() {
    const baseTop = 16; // 4rem
    const height = 64; // altura aproximada do snackbar + margem
    const top = baseTop + (this.position * height);
    
    setTimeout(() => {
      const container = this.hostElement?.querySelector('div');
      if (container) {
        container.style.top = `${top}px`;
        container.style.right = '16px';
      }
    });
  }

  get typeClasses(): string {
    const baseClasses = 'text-white';
    
    const variantClasses = {
      success: 'bg-green-600',
      error: 'bg-red-600',
      info: 'bg-blue-600',
      warning: 'bg-yellow-600'
    };

    return `${baseClasses} ${variantClasses[this.type]}`;
  }
}