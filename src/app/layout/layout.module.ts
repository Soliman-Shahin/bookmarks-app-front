import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from './components/no-data/no-data.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
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
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    NoDataComponent,
    LoadingSpinnerComponent,
  ],
  exports: [NoDataComponent, LoadingSpinnerComponent],
})
export class LayoutModule {}
