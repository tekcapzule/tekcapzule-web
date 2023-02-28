import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tekbyte-page',
  templateUrl: './tekbyte-page.component.html',
  styleUrls: ['./tekbyte-page.component.scss'],
})
export class TekBytePageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoTekbyteTopicDetails(): void {
    this.router.navigate(['tekbytetopicdetails'], {});
  }
}
