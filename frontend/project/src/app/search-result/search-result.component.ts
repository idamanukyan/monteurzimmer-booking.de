import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../shared/services/search.service";
import {takeUntil} from "rxjs";
import {HeaderComponent} from "../header/header.component";
import {CitiesComponent} from "../cities/cities.component";
import {FooterComponent} from "../footer/footer.component";
import {SliderComponent} from "../slider/slider.component";

@Component({
  standalone: true,
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
  imports: [
    HeaderComponent,
    CitiesComponent,
    FooterComponent,
    SliderComponent
  ]
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private searchService: SearchService = inject(SearchService);

  private destroy$: any;

  ngOnInit() {
  }



  ngOnDestroy() {
  }
}
