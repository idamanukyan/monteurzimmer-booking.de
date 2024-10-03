import {Component, inject, OnInit} from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NgClass, NgForOf} from "@angular/common";
import {SearchService} from "../shared/services/search.service";
import {BookmarkComponent} from "../bookmark/bookmark.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss',
  imports: [
    NgClass,
    NgForOf,
    NzCardComponent,
    BookmarkComponent,
    RouterLink,
    RouterOutlet
  ]
})
export class CitiesComponent implements OnInit {
  private router: Router = inject(Router);
  private searchService: SearchService = inject(SearchService);
  // public cities:any[] =[]
  public cities: any[] = [
    {name: 'Leipzig', availableBeds: 396, statusClass: 'gray'},
    {name: 'Bitterfeld-Wolfen', availableBeds: 132, statusClass: 'gray'},
    {name: 'Chemnitz', availableBeds: 60, statusClass: 'gray'},
    {name: 'Halle (Saale)', availableBeds: 91, statusClass: 'gray'},
    {name: 'Leipzig', availableBeds: 396, statusClass: 'gray'},
    {name: 'Bitterfeld-Wolfen', availableBeds: 132, statusClass: 'gray'},
    {name: 'Chemnitz', availableBeds: 60, statusClass: 'gray'},
    {name: 'Halle (Saale)', availableBeds: 91, statusClass: 'gray'},
    {name: 'Leipzig', availableBeds: 396, statusClass: 'gray'},
    {name: 'Bitterfeld-Wolfen', availableBeds: 132, statusClass: 'gray'},
    {name: 'Chemnitz', availableBeds: 60, statusClass: 'gray'},
    {name: 'Halle (Saale)', availableBeds: 91, statusClass: 'gray'},
  ];

  ngOnInit() {
    // this.getProperties();
  }

  public goOnCity() {
    this.router.navigate(['/search-results/city']);
  }

  private getProperties() {
    this.searchService.getProperties()
      .subscribe((res) => {
        console.log(555, res);
        // this.cities = res;
      })
  }
}
