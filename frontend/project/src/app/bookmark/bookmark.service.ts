// bookmark.service.ts
import { Injectable } from '@angular/core';

import * as https from "node:https";

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private bookmarks: any[] = [];
  private nextId = 1;

  addBookmark(bookmark: any): void {
    bookmark!.id = this.nextId++;
    this.bookmarks.push(bookmark);
  }

  removeBookmark(id: number): void {
    this.bookmarks = this.bookmarks.filter(b => b.id !== id);
  }

  getBookmarks(): any[] {
    return this.bookmarks;
  }

  async fetchLinkMetadata(url: string): Promise<any | null> {
    try {
      const response = await fetch(`https://api.linkpreview.net/?key=3ff54473bddacb6f56b83ead6d9df6f3&q=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (data) {
        return {
          id: 0, // will be set when added
          title: data.title  ,
          url: data.url ,
          description: data.description ,
          imageUrl: data.image, // optional image URL
        };
      }
    } catch (error) {
      console.error('Error fetching link metadata:', error);
    }
    return null;
  }
}
