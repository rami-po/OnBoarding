import 'hammerjs';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatNativeDateModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule
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
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { AdminEmployeesComponent } from './admin-employees/admin-employees.component';
import { AdminEmployeesSideListComponent } from './admin-employees/admin-employees-side-list/admin-employees-side-list.component';
import {AppService} from "./app.service";
import { AdminEmployeesPersonalViewComponent } from './admin-employees/admin-employees-personal-view/admin-employees-personal-view.component';
import { AdminEmployeesEmergencyViewComponent } from './admin-employees/admin-employees-emergency-view/admin-employees-emergency-view.component';
// import { AuthService, AppGlobals } from 'angular2-google-login';
import {TimelineModule} from "./+timeline/timeline.module";
import {HttpClientModule} from "@angular/common/http";
import { WelcomeLetterComponent } from './admin-form/welcome-letter/welcome-letter.component';
import {NgxEditorModule} from "ngx-editor";
import {AdminFormService} from "./admin-form/admin-form.service";
import { UserInformationComponent } from './admin-form/user-information/user-information.component';
import { HarvestInformationComponent } from './admin-form/harvest-information/harvest-information.component';
import { MiscInformationComponent } from './admin-form/misc-information/misc-information.component';
import { ReviewInformationComponent } from './admin-form/review-information/review-information.component';
import {AdminFormModule} from "./admin-form/admin-form.module";


@NgModule({
  declarations: [
    AppComponent,
    StatusMessageDialogComponent,
    GithubSlackFormComponent,
    EmergencyFormComponent,
    PersonalFormComponent,
    UserHubComponent,
    AdminLogInComponent,
    NotFoundComponent,
    UserLogInComponent,
    MedicalFormComponent,
    DentalFormComponent,
    AdminConsoleComponent,
    AdminEmployeesComponent,
    AdminEmployeesSideListComponent,
    AdminEmployeesPersonalViewComponent,
    AdminEmployeesEmergencyViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxEditorModule,
    routing,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    TimelineModule,
    AdminFormModule
  ],
  providers: [AdminFormAuthGuard, UserHubAuthGuard, UserHubService, AppService],
  entryComponents: [
    StatusMessageDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
