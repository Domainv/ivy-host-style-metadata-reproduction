import {
  ɵdetectChanges as detectChanges,
  Component,
  ɵɵdirectiveInject as directiveInject,
  INJECTOR,
  ɵrenderComponent as renderComponent
} from '@angular/core';

@LazyComponent({
  path: './child/child.component',
  component: 'ChildComponent',
  host: 'app-parent'
})
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss'],
  host: {
    style: 'display: inline-block;'
  }
})
export class ParentComponent {
  count = 0;
  componentName = 'Parent';

  public counter() {
    this.count++;

    detectChanges(this);
  }
}

export function LazyComponent(config: { path: string, component: string, host: string }) {
  return (cmpType) => {
    const originalFactory = cmpType.ngComponentDef.factory;
    cmpType.ngComponentDef.factory = (...args) => {
      const cmp = originalFactory(...args);
      const injector = directiveInject(INJECTOR);

      cmp.count = 10;
      cmp.componentName = 'affected';

      cmpType.prototype.counter = function() {
        this.count = this.count + 10;

        import(`${config.path}`).then(m =>
          renderComponent(m[config.component], { host: config.host, injector }));

        detectChanges(this);
      };

      if (cmp.afterViewLoad) {
        cmp.afterViewLoad();
      }

      return cmp;
    };

    return cmpType;
  };
}
