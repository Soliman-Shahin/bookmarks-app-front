import { BookmarksService } from '../../services/bookmarks.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-edit-bookmark',
  templateUrl: './add-edit-bookmark.component.html',
  styleUrls: ['./add-edit-bookmark.component.scss'],
})
export class AddEditBookmarkComponent implements OnInit {
  bookmarkForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private bookmarksService: BookmarksService,
    public translate: TranslateService,
    public dialogRef: MatDialogRef<AddEditBookmarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookmarkForm = this.fb.group({
      title: new FormControl(this.data ? this.data.title : '', [
        Validators.required,
      ]),
      url: new FormControl(this.data ? this.data.url : '', [
        Validators.required,
      ]),
      description: new FormControl(this.data ? this.data.description : ''),
    });
  }

  resetForm() {
    this.initForm();
  }

  async submit() {
    const formData = this.bookmarkForm.value;
    try {
      let res: any;
      this.data?._id
        ? (res = await this.bookmarksService
            .updateBookmark(formData, this.data?._id)
            .toPromise())
        : (res = await this.bookmarksService.addBookmark(formData).toPromise());

      this.openSnackBar(
        'success',
        res?.ok,
        this.translate.instant(
          'BOOKMARK.' + (this.data?._id ? 'updated' : 'added')
        )
      );

      this.dialogRef.close(true);
    } catch (err: any) {
      this.openSnackBar('error', err?.error.status, err?.error.message);
    }
  }

  openSnackBar(type: any, status: any, message: any) {
    this._snackBar.open(status, message, { panelClass: type });
  }
}
