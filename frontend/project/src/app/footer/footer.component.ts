import { Component } from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
