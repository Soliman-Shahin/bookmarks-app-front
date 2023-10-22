import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BookmarksPageComponent } from './pages';
import { OutletComponent } from 'src/app/shared/components';

const routes: Routes = [
  {
    path: '',
    component: OutletComponent,
    children: [
      {
        path: '',
        component: BookmarksPageComponent,
        title: 'PAGE_TITLE.bookmarks',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarksRoutingModule {
  static readonly COMPONENTS = [BookmarksPageComponent];
}
