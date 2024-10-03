import { Component } from '@angular/core';
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCardComponent} from "ng-zorro-antd/card";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [
    NzRowDirective,
    NzColDirective,
    NzCardComponent
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
