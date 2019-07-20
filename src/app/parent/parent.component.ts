import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  host: {
    style: 'display: block; background: red;'
  }
})
export class ParentComponent {}
