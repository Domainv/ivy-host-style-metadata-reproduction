import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PopoverModule } from 'ngx-bootstrap/popover';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    PopoverModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
