import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toNumber',
})
export class ToNumberPipe implements PipeTransform {
  transform(numberToFormat: string): string {
    if (numberToFormat != null) {
      console.log(formatNumber(Number(numberToFormat), 'en-US', '1.0-0'))
      return formatNumber(Number(numberToFormat), 'en-US', '1.0-0');
    }
    return '';
  }
}
