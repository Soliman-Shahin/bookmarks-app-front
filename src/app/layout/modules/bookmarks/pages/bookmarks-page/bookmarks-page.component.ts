import { Component, OnInit, inject } from '@angular/core';
import { AddEditBookmarkComponent } from '../../components/add-edit-bookmark/add-edit-bookmark.component';
import { ImportBookmarksComponent } from '../../components/import-bookmarks/import-bookmarks.component';
import { BookmarkModel } from '../../models';
import { PageEvent } from '@angular/material/paginator';
import { BookmarksService } from '../../services';
import { BaseComponent } from 'src/app/shared/base';

@Component({
  selector: 'app-bookmarks-page',
  templateUrl: './bookmarks-page.component.html',
  styleUrls: ['./bookmarks-page.component.scss'],
})
export class BookmarksPageComponent extends BaseComponent implements OnInit {
  bookmarksService = inject(BookmarksService);
  bookmarks_list: any = [];
  view_module = false;
  loading = true;

  // init default params
  protected defaultParams = {
    pageSize: 10,
    page: 0,
    sort: 'ASC',
  };

  totalItems = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getAllBookmarks();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.totalItems = e.length;
    this.defaultParams.pageSize = e.pageSize;
    this.defaultParams.page = e.pageIndex;
    this.getAllBookmarks();
  }

  async getAllBookmarks() {
    this.loading = true;
    try {
      const res: BookmarkModel | undefined = await this.bookmarksService
        .getAllBookmarks(this.defaultParams)
        .toPromise();
      this.bookmarks_list = res?.data || [];
      this.totalItems = res?.options.totalCount || this.totalItems;

      this.pageSizeOptions = this.pageSizeOptions.filter((number) => {
        return this.totalItems >= number;
      });
      // check if this.totalItems is already in the new array
      if (!this.pageSizeOptions.includes(this.totalItems)) {
        // if not, push it to the end of the new array
        this.pageSizeOptions.push(this.totalItems);
      }

      this.loading = false;
    } catch (err: any) {
      console.error('error', err.error.message);
      this.loading = false;
    }
  }

  changeView() {
    this.view_module = !this.view_module;
  }

  async addBookmark() {
    const dialogRef = this.dialog.open(AddEditBookmarkComponent, {
      width: '60%',
      height: '80%',
      panelClass: 'bookmark-dialog-box',
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.refreshBookmark();
    }
  }

  async importBookmarks() {
    const dialogRef = this.dialog.open(ImportBookmarksComponent, {
      width: '60%',
      height: '60%',
      panelClass: 'bookmark-dialog-box',
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.refreshBookmark();
    }
  }

  exportBookmarks() {
    const data = this.bookmarks_list;
    // remove from all bookmarks
    data.map((item: any) => {
      delete item._id;
      delete item._userId;
      delete item.createdAt;
      delete item.updatedAt;
      delete item.__v;
    });

    // Convert the data to JSON string
    const json = JSON.stringify(data);
    // Create a blob object with the JSON data
    const blob = new Blob([json], { type: 'application/json' });
    // Use FileSaver to download the file
    this.fileSaverService.save(blob, 'bookmarks.json');
  }

  refreshBookmark() {
    this.getAllBookmarks();
  }
}
