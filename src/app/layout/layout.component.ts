import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/auth/services/token.service';
import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  menuOpen: string = 'yes';
  isOpen: boolean = true;
  mode: string = 'side';
  direction: Direction = 'ltr';
  username: string = '';

  constructor(
    public breakpointObserver: BreakpointObserver,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.username = this.emailUsername(this.tokenService.getUsername());

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          // handle XSmall breakpoint
          console.log('handle XSmall breakpoint');
          this.isOpen = false;
          this.menuOpen = 'no';
          this.mode = 'push';
        }
        if (result.breakpoints[Breakpoints.Small]) {
          // handle Small breakpoint
          console.log('handle Small breakpoint');
          this.isOpen = false;
          this.menuOpen = 'no';
          this.mode = 'push';
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          // handle Medium breakpoint
          console.log('handle Medium breakpoint');
          this.isOpen = false;
          this.menuOpen = 'no';
          this.mode = 'push';
        }
        if (result.breakpoints[Breakpoints.Large]) {
          // handle Large breakpoint
          console.log('handle Large breakpoint');
          this.isOpen = true;
          this.menuOpen = 'yes';
          this.mode = 'side';
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          // handle XLarge breakpoint
          console.log('handle XLarge breakpoint');
          this.isOpen = true;
          this.menuOpen = 'yes';
          this.mode = 'side';
        }
      });
  }

  toggleExpandMenu() {
    this.isOpen = !this.isOpen;
    this.menuOpen = this.isOpen ? 'yes' : 'no';
  }

  emailUsername(emailAddress: string): string {
    return emailAddress.split('@')[0];
  }
}
