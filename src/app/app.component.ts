import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, fromEvent, merge, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  snackBarRef: any;
  snackBarOpen: boolean = false;

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  latestStatus: boolean = true;

  constructor(
    public translate: TranslateService,
    private snackBar: MatSnackBar,
    private titleService: Title
  ) {}

  private initDom(dir: 'ltr' | 'rtl') {
    document.documentElement.setAttribute('dir', dir);
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || 'en');

    this.initDom(this.translate.instant('DIR'));
    this.translate.onLangChange.subscribe((data) => {
      this.titleService.setTitle(this.translate.instant('APP_TITLE'));
      this.initDom(data.translations.dir);
    });

    this.checkNetworkStatus();
  }

  ngOnDestroy(): void {
    this.networkStatus$.unsubscribe();
  }

  // To check internet connection stability
  checkNetworkStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        this.presentNetworkChange(status);
        this.networkStatus = status;
      });
  }

  private async presentNetworkChange(status: boolean) {
    if (!status) {
      this.latestStatus = false;
    }
    const message = await this.translate.instant(status ? 'ONLINE' : 'OFFLINE');
    const panelClass = status ? 'success' : 'error';
    const duration = status ? 5000 : 500000;

    if (status && !this.latestStatus) {
      this.closeSnackBar();
      this.snackBarRef = this.snackBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass,
        duration,
      });
      this.snackBarOpen = true;
    }
  }

  closeSnackBar() {
    if (this.snackBarOpen) {
      this.snackBarRef.afterDismissed().subscribe(() => {
        this.snackBarOpen = false;
      });
    }
  }
}
