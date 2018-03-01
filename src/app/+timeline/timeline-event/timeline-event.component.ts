import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'timeline-event',
  templateUrl: './timeline-event.component.html',
  styleUrls: ['./timeline-event.component.scss']
})
export class TimelineEventComponent implements OnInit {

  public timelineForm: FormGroup;
  public timelineType: string; // employee, project, client
  public action: string; // add, edit
  public events: any;
  public editorConfig = {
    "editable": true,
    "height": "auto",
    "minHeight": "100px",
    "width": "450px",
    "minWidth": "0",
    "placeholder": "",
    "enableToolbar": true,
    "showToolbar": true,
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["paragraph", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "removeFormat"]
    ]
  };
  // public items = [
  //   'Compensation',
  //   'Review'
  // ];

  // employee
  public employee;

  // project
  public timelineEvents;
  public projectId;

  // client
  public client;

  // action: edit
  public event: any;
  public index: any;


  welcomeLetter =
    '<li>Please visit our OnBoarding page to review, fill out and print the following forms: <br /><ul style="list-style-type:circle">' +
    '<li>Personal Information Form (complete online)</li>' +
    '<li>Emergency Contact Form (complete online)</li>' +
    '<li>IRS W-4 Form (Employee Withholding Allowance)(complete online and print)</li>' +
    '<li>I-9 Form (complate online and print)</li>' +
    '<li>Parking Permit Application(option; complete and print)</li>' +
    '<li>At Will Agreement Form (complete and print)</li>' +
    '<li>Company Handbook (review, sign signature page and print)</li>' +
    '<li>Voya - 401k Handbook (review plan and complete enrollment, p. 17</li>' +
    '<li>Medical Enrollment Form (review, complete and print)*</li>' +
    '<li>Dental Application (optional; complete and print)*</li></ul><br /><br />' +
    '<li>Be prepared to bring your passport or eligible ID and Social Security Card so I can finalize your I-9 paperwork on day one.</li><br />' +
    '<li>Be prepared to bring bank account information for direct deposit (a voided check will work)</li></ol><br />' +
    //'<b>*NOTE: You\'ll have until XX days after your start date to complete your medical and dental insurance enrollment. On your first day, I can provide you with premium costs from our broker.</b><br /><br />' +
    '<b>On your first day:</b><br /><ol>' +
    '<li>Please plan to arrive at 9:00am on <b>STARTDATE</b> at 1347 Pacific Avenue. Ring the buzzer upon your arrival and Chloe will let you in.</li><br />' +
    '<li>Meet with me to:<ul>' +
    '<li>Take a tour of the office</li>' +
    '<li>Settle into your new workplace</li>' +
    '<li>Make introductions</li>' +
    '<li>Review new hire paperwork and collect I-9 verification IDs</li>' +
    '<li>Turn in direct deposit information</li>' +
    '<li>Answer any questions you might have</li>' +
    '<li>Get started on your online harassment training</li>' +
    '<li>Review medical insurance premium costs</li></ul></li></ol><br /><br />' +
    'Please do not hesitate to reach out with any questions before your start date by emailing me at catherine@productops.com or calling at 831-419-7932.<br /><br />' +
    'With kind regards,<br />' +
    'Catherine Rumpanos<br />' +
    'Office Manager';


  constructor(private dialogRef: MatDialogRef<TimelineEventComponent>) {
  }

  ngOnInit() {
    let dateValue = null;
    let typeValue = '';
    let eventValue = null;
    let budgetValue = null;

    if (this.action === 'edit' && this.event) {
      const date = this.event.date.split('T')[0].split('-');
      dateValue = new Date(Date.UTC(date[0], date[1] - 1, date[2], 8, 0, 0));
      typeValue = this.event.type;
      eventValue = this.event.event;
      budgetValue = this.event.budget;
    }

    this.timelineForm = new FormGroup({
      date: new FormControl(dateValue, Validators.required),
      type: new FormControl(typeValue),
      event: new FormControl(eventValue, Validators.required)
    });

    // project
    if (this.timelineType === 'project') {
      this.timelineForm.addControl('budget', new FormControl(budgetValue, null));
    }
  }

  addEvent(id, index) {
  }

  editEvent(id, index) {
  }

  submitTimelineForm() {

  }

}
