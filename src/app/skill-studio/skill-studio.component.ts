import { Component, OnInit } from '@angular/core';
import { ITile } from './models/tile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skill-studio',
  templateUrl: './skill-studio.component.html',
  styleUrls: ['./skill-studio.component.scss'],
})
export class SkillStudioComponent implements OnInit {

  tileList: ITile[] = [
    {uniqueId: 'tekbytes', displayName: 'Tekbytes', desc: 'Get your AI Vocabulary Right', navUrl:'/tekbyte/explore'},
    {uniqueId: 'courses', displayName: 'Courses', desc: 'Get ahead in your AI journey with our cutting edge courses', navUrl:'/courses'},
    {uniqueId: 'mentoring', displayName: 'Mentoring', desc: 'Mentoring is our top priority for the people need mentor', navUrl:'/mentoring'},
    {uniqueId: 'weeklyDigest', displayName: 'Weekly Digest', desc: 'Get your weekly digest from us', navUrl:'/weekly-digest'},
    {uniqueId: 'interviewPrep', displayName: 'Interview Prep', desc: 'Go ahead and prepare for your interview', navUrl:'/interview-prepartion'},
    {uniqueId: 'events', displayName: 'Events', desc: 'Get ahead in your AI journey with our Events', navUrl:'/events'}
  ] 
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigatePage(navUrl: string) {
    this.router.navigateByUrl(navUrl);
  }
}
