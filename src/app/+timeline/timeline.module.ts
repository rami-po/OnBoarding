import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';

// import { SharedModule } from '../../+shared/shared.module';
import { TimelineEventComponent } from './timeline-event';
import {NgxEditorModule} from "ngx-editor";

@NgModule({
  declarations: [
    TimelineEventComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    NgxEditorModule,
    ReactiveFormsModule,
    // SharedModule,
  ],
  exports: [
    TimelineEventComponent,
  ],
  entryComponents: [
    TimelineEventComponent,
  ]
})
export class TimelineModule {

}
