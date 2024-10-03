import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../header/header.component";
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NzRateComponent} from "ng-zorro-antd/rate";
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzTagComponent} from "ng-zorro-antd/tag";
import {FormsModule} from "@angular/forms";
import {BookmarkComponent} from "../../bookmark/bookmark.component";
import {FooterComponent} from "../../footer/footer.component";
import {FavoriteCitiesComponent} from "../../favorite-cities/favorite-cities.component";

@Component({
  selector: 'app-city-with-properties',
  standalone: true,
  imports: [
    HeaderComponent,
    NzCardComponent,
    NzCardMetaComponent,
    NzRateComponent,
    NzTypographyComponent,
    NzTagComponent,
    FormsModule,
    BookmarkComponent,
    FooterComponent,
    FavoriteCitiesComponent
  ],
  templateUrl: './city-with-properties.component.html',
  styleUrl: './city-with-properties.component.scss'
})
export class CityWithPropertiesComponent implements OnInit{

  public rating = 4.5;

  ngOnInit() {
    console.log(888888)
  }
}
