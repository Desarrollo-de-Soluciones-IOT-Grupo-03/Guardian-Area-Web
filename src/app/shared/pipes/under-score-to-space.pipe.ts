import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underScoreToSpace',
  standalone: true
})
export class UnderScoreToSpacePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.replace(/_/g, ' ') : value;
  }
}
