import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.css']
})
export class ColorpickerComponent{
 selectedColor: string = '#ff5733'; // default color

  // optional message
  get colorMessage(): string {
    return `You picked: ${this.selectedColor}`;
  }

}
