import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [],
  templateUrl: './toggle.component.html'
})
export class ToggleComponent {
  checked = input<boolean>(false);
  checkedChange = output<void>();

  onToggleChange = (): void => this.checkedChange.emit();
}
