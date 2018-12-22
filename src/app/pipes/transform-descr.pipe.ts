import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'transformDescr'
})
export class TransformDescrPipe implements PipeTransform {

  transform(description: any, number?: any): any {
    if (description === '') {
      return 'No information...';
    }
    if (description.length > number) {
      return description.slice(0, description.indexOf(' ', number)) + `...`;
    } else {
      return description;
    }
  }

}
