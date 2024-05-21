import { Pipe, PipeTransform } from '@angular/core';
import { orderBy, get} from 'lodash'

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], order : any, column : string): any {
    if(!value || order ==='' || !order){
      return value;
    }
    if(value.length <= 1){
      return 1;
    }
    if(!column || column === ''){
      if(order === 'asc'){
        return value.sort
      }
      else{
        return value.sort().reverse();
      }
    }
    return orderBy(value,[(obj)=>{
      let value = get(obj,column);
      return typeof value === 'string' ? value.toLowerCase() : value;
    }], [order])
  }

}
