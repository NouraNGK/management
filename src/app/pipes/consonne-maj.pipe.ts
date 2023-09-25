import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consonneMaj'
})
export class ConsonneMajPipe implements PipeTransform {

  transform(ch: string): string {
    let consonnes = 'bcdfghjklmnpqrstvwxz';
    let result = "";

    for (let i = 0; i < ch.length; i++) {
      let char = ch[i];
      if (consonnes.includes(char)) {
        result += char.toUpperCase();
      } else {
        result += char;
      }
    }
    return result;
  }
}