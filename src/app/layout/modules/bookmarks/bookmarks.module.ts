import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarkCardComponent } from './components/bookmark-card/bookmark-card.component';
import { BookmarksRoutingModule } from './bookmarks-routing.module';
import {
  AddEditBookmarkComponent,
  AutoCompleteSelectChipsComponent,
  ImportBookmarksComponent,
} from './components';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '../../layout.module';
import { BookmarksService } from './services';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    SharedModule,
    LayoutModule,
    BookmarksRoutingModule,
  ],
  declarations: [
    BookmarkCardComponent,
    BookmarksRoutingModule.COMPONENTS,
    AddEditBookmarkComponent,
    ImportBookmarksComponent,
    AutoCompleteSelectChipsComponent,
  ],
  providers: [BookmarksService],
})
export class BookmarksModule {}
