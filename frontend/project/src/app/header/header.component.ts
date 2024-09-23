import { Component } from '@angular/core';
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzHeaderComponent, NzLayoutComponent} from "ng-zorro-antd/layout";

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    NzPageHeaderComponent,
    NzMenuDirective,
    NzMenuItemComponent,

    NzLayoutComponent,
    NzHeaderComponent,
  ]
})
export class HeaderComponent {

}
