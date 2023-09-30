import { BookmarksService } from './../../services/bookmarks.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddEditBookmarkComponent } from '../add-edit-bookmark/add-edit-bookmark.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
})
export class BookmarkCardComponent implements OnInit {
  @Input() bookmark: any = [];
  @Input() view: boolean = false;
  @Output() refreshBookmark = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private bookmarksService: BookmarksService,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  goToExternalWebsite(bookmark: any): void {
    const url = bookmark?.url;
    window.open(url, '_blank');
  }

  updateBookmark(data: any) {
    const dialogRef = this.dialog.open(AddEditBookmarkComponent, {
      width: '60%',
      height: '60%',
      data: data ? { ...data } : {},
      panelClass: 'bookmark-dialog-box',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshBookmark.emit(result);
      }
    });
  }

  removeBookmark(id: string) {
    this.bookmarksService.deleteBookmark(id).subscribe(
      (res: any) => {
        this.openSnackBar(
          'success',
          res?.ok,
          this.translate.instant('BOOKMARK.removed')
        );
        this.refreshBookmark.emit(true);
      },
      (err: any) => {
        this.openSnackBar('error', err?.error.status, err?.error.message);
      }
    );
  }

  openSnackBar(type: any, status: any, message: any) {
    this._snackBar.open(status, message, { panelClass: type });
  }
}
