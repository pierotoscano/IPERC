import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Ubicacion } from 'src/app/shared/models/fisics/Ubicacion';

import { uniqBy } from 'lodash';

@Pipe({
  name: 'uniquePipe',
  pure: false
})
@Injectable()
export class UniquePipe implements PipeTransform {
  transform(items: Ubicacion[], arg: string): any {
      // filter items array, items which match and return true will be kept, false will be filtered out
      if(items.length === 0){
        return [];
      } else {
        return uniqBy(items, arg);
        // items.filter(Ubicacion => Ubicacion)
      }

    //   if (!items || !args) {
    //     return items;
    //   }
    //   return items.filter((item: Ubicacion) => this.applyFilter(item, args));
  }

}