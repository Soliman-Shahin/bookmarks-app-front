import { Direction } from '@angular/cdk/bidi';

import { Directive, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, map, shareReplay, startWith } from 'rxjs';
import { FileSaverService } from 'ngx-filesaver';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroySubject } from './destroy.subject';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: 'sbm-base',
})
export abstract class BaseComponent extends DestroySubject {
  routerService = inject(Router);
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);
  translateService = inject(TranslateService);
  dialog: MatDialog = inject(MatDialog);
  fileSaverService = inject(FileSaverService);
  _snackBar = inject(MatSnackBar);
  fb = inject(FormBuilder);
  dir$: Observable<Direction> = this.#getDir();
  currentLang$: Observable<string> = this.#getCurrentLang();

  location = inject(Location);

  constructor() {
    super();
  }

  #getDir() {
    return this.#onLangChange().pipe(
      map((data) => (data.lang === 'ar' ? 'rtl' : 'ltr'))
    );
  }

  #getCurrentLang(): Observable<string> {
    return this.#onLangChange().pipe(
      map((data) => data.lang),
      shareReplay()
    );
  }

  #onLangChange() {
    return this.translateService.onLangChange.pipe(
      startWith({
        lang: this.translateService.currentLang,
      }),
      shareReplay(1)
    );
  }

  openSnackBar(type: any, status: any, message: any) {
    this._snackBar.open(status, message, { panelClass: type });
  }

  goBack() {
    this.location.back();
  }
}
