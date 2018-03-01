import { Component, OnInit } from '@angular/core';
import {AdminFormService} from "../admin-form.service";

@Component({
  selector: 'app-welcome-letter',
  templateUrl: './welcome-letter.component.html',
  styleUrls: ['./welcome-letter.component.scss'],
  providers: [AdminFormService]
})
export class WelcomeLetterComponent implements OnInit {

  public editorConfig = {
    "editable": true,
    "height": "70vh",
    "minHeight": "100px",
    "maxHeight": "450px",
    "width": "650px",
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

  private dynamicWords = [
    'FIRST_NAME',
    'LAST_NAME',
    'USERNAME',
    'prod0p$2017',
    'START_DATE'

  ];

  public welcomeLetter;

  constructor(private adminFormService: AdminFormService) { }

  ngOnInit() {
    this.welcomeLetter = this.adminFormService.letter.getValue();
  }

}
