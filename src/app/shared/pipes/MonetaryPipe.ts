import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monetary',
  standalone: true
})
export class MonetaryPipe implements PipeTransform {
  transform(value: number, currencyType: 'BRL' | 'USD' = 'BRL'): string {
    if (value === null || value === undefined) {
      return ''
    }

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyType,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return formatter.format(value)
  }
}