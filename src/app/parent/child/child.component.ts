import { Component } from '@angular/core';
// import { ParentComponent } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  // styleUrls: ['../parent/parent.component.scss'],
  host: {
    style: 'display: inline-block;'
  }
})
export class ChildComponent {}
