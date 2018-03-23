import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatNativeDateModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule
} from '@angular/material';

import {AdminFormComponent} from './admin-form.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from "@angular/common/http";
import { WelcomeLetterComponent } from './welcome-letter/welcome-letter.component';
import {NgxEditorModule} from "ngx-editor";
import {AdminFormService} from "./admin-form.service";
import { UserInformationComponent } from './user-information/user-information.component';
import { HarvestInformationComponent } from './harvest-information/harvest-information.component';
import { MiscInformationComponent } from './misc-information/misc-information.component';
import { ReviewInformationComponent } from './review-information/review-information.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    AdminFormComponent,
    WelcomeLetterComponent,
    UserInformationComponent,
    HarvestInformationComponent,
    MiscInformationComponent,
    ReviewInformationComponent
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
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AdminFormService],
  entryComponents: [
    AdminFormComponent
  ],
  bootstrap: []
})
export class AdminFormModule {
}
