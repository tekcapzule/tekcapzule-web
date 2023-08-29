import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, ChannelEvent, EventChannelService } from './core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { Router } from '@angular/router';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  footerHidden: boolean;
  // isLoggedIn: boolean;
  subscription: Subscription[] = [];

  constructor(
    private eventChannel: EventChannelService,
    public authService: AuthService,
    private router: Router
  ) {
    window.scroll(0, 0);
    // Amplify.configure(awsExports);
    Carousel.prototype.onTouchMove = (): void => {};
  }

  ngOnInit(): void {
    this.footerStatus();
    // this.loggedInStatus();
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  footerStatus() {
    const sub = this.eventChannel
      .getChannel()
      .pipe(
        filter(out => out.event === ChannelEvent.HideAdminNavTabs),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.footerHidden = true;
      });
    this.subscription.push(sub);
  }

  // loggedInStatus() {
  //   const sub = this.authService.onLoggedInStatusChange().subscribe(isLoggedIn => {
  //     this.isLoggedIn = isLoggedIn;
  //   });
  //   this.subscription.push(sub);
  // }
}
