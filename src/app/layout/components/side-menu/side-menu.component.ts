import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() username: string = '';

  menuItems: any = [];
  constructor() {}

  ngOnInit(): void {
    this.menuItems = [
      {
        title: 'BOOKMARKS',
        icon: 'bookmark',
        link: '/sbm/bookmarks',
      },
      {
        title: 'ABOUT',
        icon: 'info',
        link: '/sbm/about',
      },
    ];
  }
}
