import { Component, OnInit } from '@angular/core';
import { ChannelEvent, EventChannelService } from './core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import awsExports from '../aws-exports';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  footerHidden: boolean;

  constructor(private eventChannel: EventChannelService, public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
  
  ngOnInit(): void {
    this.eventChannel.getChannel().pipe(
    filter(out => out.event === ChannelEvent.HideAdminNavTabs), takeUntil(this.destroy$))
    .subscribe(() => {
      this.footerHidden = true;
    });
  }
}
