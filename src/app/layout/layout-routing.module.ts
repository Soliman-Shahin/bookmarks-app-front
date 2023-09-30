import { Routes, RouterModule } from '@angular/router';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'bookmarks',
        component: BookmarksPageComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
