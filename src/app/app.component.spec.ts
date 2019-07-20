import { TestBed, ComponentFixture } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import {
  Component,
  ViewChild,
} from '@angular/core';

import {
  PopoverModule,
  PopoverDirective,
} from 'ngx-bootstrap/popover';

@Component({selector: 'test-cmpt', template: ``})
export class TestComponent {
  name = 'World';
  show = true;
  title: string;
  placement: string;

  @ViewChild(PopoverDirective, { static: false }) popover: PopoverDirective;

  shown(): void {
    return;
  }

  hidden(): void {
    return;
  }
}

export function createGenericTestComponent<T>(
  html: string,
  type: { new (...args: any[]): T }
): ComponentFixture<T> {
  TestBed.overrideComponent(type, { set: { template: html } });
  const fixture = TestBed.createComponent(type);
  fixture.detectChanges();

  return fixture;
}

const createTestComponent = (html: string) =>
  createGenericTestComponent(html, TestComponent);

describe('popover', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PopoverModule.forRoot()],
      providers: []
    });
  });

  function getWindow(element: HTMLElement): HTMLElement {
    return element.querySelector('popover-container');
  }

  describe('basic functionality', () => {
    it('should open and close a popover - default settings and content as string', () => {
      const fixture = createTestComponent(
        `<div style="margin: 400px" popover="Great tip!" popoverTitle="Title"></div>`
      );
      const directive = fixture.debugElement.query(
        By.directive(PopoverDirective)
      );

      directive.triggerEventHandler('click', {});

      fixture.detectChanges();

      const windowEl = getWindow(fixture.nativeElement);

      expect(windowEl.getAttribute('role')).toBe('tooltip');
    });
  });
});
