import {Component, inject, Input, OnInit} from '@angular/core';
import {NzCardComponent, NzCardMetaComponent} from "ng-zorro-antd/card";
import {NgForOf, NgIf} from "@angular/common";
import {SearchService} from "../shared/services/search.service";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCarouselComponent, NzCarouselContentDirective} from "ng-zorro-antd/carousel";
import {IvyCarouselModule} from "angular-responsive-carousel";
import {CarouselModule} from "ngx-owl-carousel-o";


interface Bookmark {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  standalone: true,
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrl: './favorite-cities.component.scss',
  imports: [
    NgForOf,
    NzCardComponent,
    NzRowDirective,
    NzColDirective,
    NzCardMetaComponent,
    NzButtonComponent,
    NzCarouselComponent,
    NzCarouselContentDirective,
    NgIf,
    CarouselModule
  ]
})
export class FavoriteCitiesComponent implements OnInit {
  private searchService: SearchService = inject(SearchService);
  @Input() title: string = '';
  @Input() bookmarks: any[] = [];

  private destroy$: any;

  // public urls: string[] = ['https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1'];

  ngOnInit() {

  }

  //
  // constructor(private bookmarkService: BookmarkService) {
  //   this.loadBookmarks();
  // }
  //
  // ngOnInit() {
  //   this.addBookmark(this.urls);
  // }
  //
  // loadBookmarks() {
  //   this.bookmarks = this.bookmarkService.getBookmarks();
  // }
  //
  // private async addBookmark(urls: string[]): Promise<void> {
  //   if (!urls?.length) {
  //     return;
  //   }
  //
  //   for (const url of urls) {
  //     try {
  //       const metadata = await this.bookmarkService.fetchLinkMetadata(url);
  //
  //       if (metadata) {
  //         await this.bookmarkService.addBookmark(metadata);
  //         this.loadBookmarks();
  //       }
  //     } catch (error) {
  //       console.error(`Failed to fetch metadata for URL: ${url}`, error);
  //     }
  //   }
  // }

  // public experiences = [
  //   {
  //     image: 'assets/berlin.jpg',
  //     title: 'Experience One',
  //     description: 'This is the first experience description.',
  //   },
  //   {
  //     image: 'assets/img.png',
  //     title: 'Experience Two',
  //     description: 'This is the second experience description.',
  //   },
  //   {
  //     image: 'assets/img.png',
  //     title: 'Experience Three',
  //     description: 'This is the second experience description.',
  //   },
  //   {
  //     image: 'assets/berlin.jpg',
  //     title: 'Experience 4',
  //     description: 'This is the first experience description.',
  //   },
  //   {
  //     image: 'assets/berlin.jpg',
  //     title: 'Experience 5',
  //     description: 'This is the first experience description.',
  //   },
  //   {
  //     image: 'assets/berlin.jpg',
  //     title: 'Experience 6',
  //     description: 'This is the first experience description.',
  //   },
  //   {
  //     image: 'assets/berlin.jpg',
  //     title: 'Experience 7',
  //     description: 'This is the first experience description.',
  //   },
  //   {
  //     image: 'assets/berlin.jpg',
  //     title: 'Experience 8',
  //     description: 'This is the first experience description.',
  //   },
  // ];

  customOptions: any = {
    loop: true,
    margin: 0,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    nav: true,
    dots: true,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        nav: false,
      },
      1000: {
        items: 3,
        nav: true,
      },
    },
  };

}
