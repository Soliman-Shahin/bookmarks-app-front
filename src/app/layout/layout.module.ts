import { BookmarkCardComponent } from './pages/bookmark-card/bookmark-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { LayoutComponent } from './layout.component';
import { AboutComponent } from './pages/about/about.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from './components/no-data/no-data.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AddEditBookmarkComponent } from './pages/add-edit-bookmark/add-edit-bookmark.component';
import { ImportBookmarksComponent } from './pages/import-bookmarks/import-bookmarks.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    TranslateModule.forChild(),
    SharedModule,
  ],
  declarations: [
    LayoutComponent,
    BookmarksPageComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    AboutComponent,
    BookmarkCardComponent,
    NoDataComponent,
    LoadingSpinnerComponent,
    AddEditBookmarkComponent,
    ImportBookmarksComponent,
  ],
})
export class LayoutModule {}
