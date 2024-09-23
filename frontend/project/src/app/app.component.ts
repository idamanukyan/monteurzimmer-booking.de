import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzPageHeaderComponent} from "ng-zorro-antd/page-header";
import {SearchBarComponent} from "./search-bar/search-bar.component";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, NzMenuDirective, NzMenuItemComponent, NzPageHeaderComponent, SearchBarComponent]
})
export class AppComponent {
}
