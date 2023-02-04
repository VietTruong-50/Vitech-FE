import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'myDateTimeFormat',
})
export class myDateTimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }
}
