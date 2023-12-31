import { TagsService } from '../../services/tags.service';
import { BookmarksService } from '../../services/bookmarks.service';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tag, TagModel } from '../../models';
import { BaseComponent } from 'src/app/shared/base';

@Component({
  selector: 'app-add-edit-bookmark',
  templateUrl: './add-edit-bookmark.component.html',
  styleUrls: ['./add-edit-bookmark.component.scss'],
})
export class AddEditBookmarkComponent extends BaseComponent implements OnInit {
  bookmarkForm!: FormGroup;

  addOnBlur = true;
  // inject services
  tagsService = inject(TagsService);
  bookmarksService = inject(BookmarksService);
  // init default params
  protected defaultParams = {
    pageSize: 10,
    page: 0,
    sort: 'ASC',
  };
  // The available tags
  tags: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddEditBookmarkComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit() {
    this.getUserTags();
    this.initForm();
  }

  // get user tags
  async getUserTags() {
    try {
      const res: TagModel | any = await this.tagsService
        .getAllTags(this.defaultParams)
        .toPromise();
      this.tags =
        res?.data.map((tag: Tag) => {
          return tag.title;
        }) || [];
    } catch (err: any) {
      console.error('error', err.error.message);
    }
  }

  // Helper function to check if a tag exists in an array
  tagExists(tag: Tag, array: Tag[]) {
    return array.includes(tag);
  }

  addTag(tag: Tag) {
    // Add the tag to the tags service and the tags array if it does not exist
    if (!this.tagExists(tag, this.tags)) {
      const newTag = { title: tag };
      this.tagsService.addTag(newTag).toPromise();
      this.tags.push(tag);
    }
  }

  // Return the title of a tag given its id
  getTagTitle(tag: Tag) {
    return tag && tag.title ? tag.title : '';
  }

  // init bookmark form
  private initForm() {
    this.bookmarkForm = this.fb.group({
      title: new FormControl(this.data ? this.data.title : '', [
        Validators.required,
      ]),
      url: new FormControl(this.data ? this.data.url : '', [
        Validators.required,
      ]),
      description: new FormControl(this.data ? this.data.description : ''),
      tags: new FormControl(this.data ? this.data.tags : []),
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
        this.translateService.instant(
          'BOOKMARK.' + (this.data?._id ? 'updated' : 'added')
        )
      );

      this.dialogRef.close(true);
    } catch (err: any) {
      this.openSnackBar('error', err?.error.status, err?.error.message);
    }
  }
}
