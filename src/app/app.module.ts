import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdDatepickerModule, MdDialogModule, MdInputModule, MdNativeDateModule,
  MdProgressBarModule, MdProgressSpinnerModule, MdRadioModule, MdSelectModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {AdminFormComponent} from './admin-form/admin-form.component';
import {routing} from './app.routing';
import {HttpModule} from '@angular/http';
import {StatusMessageDialogComponent} from "./status-message/status-message.component";
import {GithubSlackFormComponent} from './user-hub/github-slack-form/github-slack-form.component';
import {EmergencyFormComponent} from './user-hub/emergency-form/emergency-form.component';
import {PersonalFormComponent} from './user-hub/personal-form/personal-form.component';
import {UserHubComponent} from './user-hub/user-hub.component';
import {AdminLogInComponent} from './admin-log-in/admin-log-in.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {AdminFormAuthGuard} from "./admin-form/admin-form.auth.guard";
import {AdminLogInService} from "./admin-log-in/admin-log-in.service";
import {UserHubAuthGuard} from "./user-hub/user-hub.auth.guard";
import {UserHubService} from "./user-hub/user-hub.service";
import {UserLogInComponent} from './user-log-in/user-log-in.component';
import {MedicalFormComponent} from './user-hub/medical-form/medical-form.component';
import {DentalFormComponent} from './user-hub/dental-form/dental-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminFormComponent,
    StatusMessageDialogComponent,
    GithubSlackFormComponent,
    EmergencyFormComponent,
    PersonalFormComponent,
    UserHubComponent,
    AdminLogInComponent,
    NotFoundComponent,
    UserLogInComponent,
    MedicalFormComponent,
    DentalFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdDialogModule,
    MdCheckboxModule,
    MdProgressBarModule,
    MdSelectModule,
    MdRadioModule,
    MdProgressSpinnerModule,
    MdDatepickerModule,
    MdNativeDateModule,
    routing,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [AdminFormAuthGuard, UserHubAuthGuard, UserHubService],
  entryComponents: [
    StatusMessageDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
