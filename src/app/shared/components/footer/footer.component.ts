import { Component, OnInit } from '@angular/core';
import { EventChannelService } from '@app/core';
import { HelperService } from '@app/core/services/common/helper.service';
import { NavTab } from '@app/shared/models';
import { ChannelEvent } from '@app/shared/models/channel-item.model';
import { Constants } from '@app/shared/utils';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  menuItems: NavTab[] = [];
  selectedMenuItem: NavTab;
  selectedChildMenuItem: NavTab;
  eventsPageLink: NavTab;
  
  constructor(
    private eventChannel: EventChannelService,
    private helperService: HelperService
    ) {}

  ngOnInit(): void {
    Constants.FooterItems.forEach(item =>  {
      const menuitem = Constants.HeaderMenu.find(hm => hm.uniqueId === item);
      this.menuItems.push(menuitem);
    });
    this.eventsPageLink = this.helperService.findPage('events');
  }

  onMenuClick(navTab: NavTab): void {
    this.eventChannel.publish({ event: ChannelEvent.MenuClick, data: navTab });
  }

}
