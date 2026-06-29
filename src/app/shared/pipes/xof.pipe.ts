import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'xof',
  standalone: true
})
export class XofPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    const amount = value ?? 0;
    return `${amount.toLocaleString('fr-FR')} XOF`;
  }
}
