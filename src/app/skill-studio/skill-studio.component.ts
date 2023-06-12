import { Component, OnInit } from '@angular/core';
import { ITile } from './models/tile.model';

@Component({
  selector: 'app-skill-studio',
  templateUrl: './skill-studio.component.html',
  styleUrls: ['./skill-studio.component.scss'],
})
export class SkillStudioComponent implements OnInit {

  tileList: ITile[] = [
    {uniqueId: 'tekbytes', displayName: 'Tekbytes', desc: 'Get your AI Vocabulary Right', navUrl:'/topics/explore'},
    {uniqueId: 'courses', displayName: 'Courses', desc: 'Get ahead in your AI journey with our cutting edge courses', navUrl:'/topics/explore'},
    {uniqueId: 'mentoring', displayName: 'Mentoring', desc: 'Mentoring is our top priority for the people need mentor', navUrl:'/topics/explore'},
    {uniqueId: 'weeklyDigest', displayName: 'Weekly Digest', desc: 'Get your weekly digest from us', navUrl:'/topics/explore'},
    {uniqueId: 'interviewPrep', displayName: 'Interview Prep', desc: 'Go ahead and prepare for your interview', navUrl:'/topics/explore'},
    {uniqueId: 'events', displayName: 'Events', desc: 'Get ahead in your AI journey with our Events', navUrl:'/topics/explore'}
  ] 
  constructor() {}

  ngOnInit(): void {}
}
