import { Component, OnInit } from '@angular/core';
import { NavTab } from '@app/shared/models';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  menuItems: NavTab[] = [];
  constructor() {}

  ngOnInit(): void {
    Constants.FooterItems.forEach(item =>  {
      const menuitem = Constants.HeaderMenu.find(hm => hm.uniqueId === item);
      this.menuItems.push(menuitem);
    });
  }

  getItem
}
