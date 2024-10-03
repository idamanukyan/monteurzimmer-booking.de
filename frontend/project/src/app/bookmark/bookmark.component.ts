import {Component, OnInit} from '@angular/core';
import {BookmarkService} from "./bookmark.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {async} from "rxjs";

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent implements OnInit {

  public urls: string[] = ['https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1','https://www.monteurzimmer.de/wohnung/14165-berlin-05258610c1'];
  public bookmarks: any[] = [];

  constructor(private bookmarkService: BookmarkService) {
    this.loadBookmarks();
  }

  ngOnInit() {
    this.addBookmark(this.urls);
  }

  loadBookmarks() {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

  private async addBookmark(urls: string[]): Promise<void> {
    if (!urls?.length) {
      return;
    }

    for (const url of urls) {
      try {
        const metadata = await this.bookmarkService.fetchLinkMetadata(url);

        if (metadata) {
          await this.bookmarkService.addBookmark(metadata);
          this.loadBookmarks();
        }
      } catch (error) {
        console.error(`Failed to fetch metadata for URL: ${url}`, error);
      }
    }
  }


}
