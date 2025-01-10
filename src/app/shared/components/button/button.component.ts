import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

type ButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

@Component({
  selector: 'btn-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disable() || loading()"
      [class]="buttonClasses"
      [ngClass]="colorClasses[color()]"
    >
      <div class="flex items-center justify-center gap-2">
        @if (loading()) {
          <svg
          class="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        }
        @else {
        <span>{{ text() }}</span>
        }
      </div>
    </button>
  `,
})
export class ButtonComponent {
  text = input('Button');
  type = input('submit');
  loading = input(false);
  disable = input(false);
  color = input<ButtonColor>('primary');
  fullWidth = input(false);

  get buttonClasses(): string {
    return `
      ${this.fullWidth() ? 'w-full' : ''}
      py-2 
      px-4 
      rounded-lg 
      transition 
      disabled:opacity-50 
      disabled:cursor-not-allowed
      font-medium
    `;
  }

  colorClasses: Record<ButtonColor, string> = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
    success: 'bg-green-500 hover:bg-green-600 text-white',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  };
}