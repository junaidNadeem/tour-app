import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule}    from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule,} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ModalModule} from 'ngx-bootstrap';
import {ProgressbarModule} from 'ngx-bootstrap';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {AppComponent}   from './app.component';
import {routing} from './app.routes';
import {NotificationService} from '../services/notification.service';
import {MainComponent} from './main/main.component';
import {AgmCoreModule} from '@agm/core';
import {CreateTourComponent} from "./create-tour/create-tour.component";
import {ActiveTabService} from "../services/active-tab.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SlimLoadingBarModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    routing,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAF4OoKbwwDWJoMqRpbLEhKgz2CvR_SIds'
    })
  ],
  declarations: [
    AppComponent,
    MainComponent,
    CreateTourComponent
  ],
  providers: [
    NotificationService,
    ActiveTabService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
