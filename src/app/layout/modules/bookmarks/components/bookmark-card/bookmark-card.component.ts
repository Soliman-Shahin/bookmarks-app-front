import { BookmarksService } from '../../services/bookmarks.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { AddEditBookmarkComponent } from '../add-edit-bookmark/add-edit-bookmark.component';
import { BaseComponent } from 'src/app/shared/base';

@Component({
  selector: 'app-bookmark-card',
  templateUrl: './bookmark-card.component.html',
  styleUrls: ['./bookmark-card.component.scss'],
})
export class BookmarkCardComponent extends BaseComponent implements OnInit {
  @Input() bookmark: any = [];
  @Input() view: boolean = false;
  @Output() refreshBookmark = new EventEmitter();

  bookmarksService = inject(BookmarksService);

  constructor() {
    super();
  }

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
          this.translateService.instant('BOOKMARK.removed')
        );
        this.refreshBookmark.emit(true);
      },
      (err: any) => {
        this.openSnackBar('error', err?.error.status, err?.error.message);
      }
    );
  }
}
