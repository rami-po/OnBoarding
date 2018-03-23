import { Component, OnInit } from '@angular/core';
import {AdminFormService} from "../admin-form.service";
import { LETTER } from '../../consts'
import {User} from "../user.model";

@Component({
  selector: 'app-welcome-letter',
  templateUrl: './welcome-letter.component.html',
  styleUrls: ['./welcome-letter.component.scss'],
  providers: []
})
export class WelcomeLetterComponent implements OnInit {

  public welcomeLetter;
  public isLetterValid = true;
  private user: User;

  public editorConfig = {
    "editable": false,
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


  constructor(private adminFormService: AdminFormService) { }

  ngOnInit() {
    this.isLetterValid = this.adminFormService.isLetterValid.getValue();
    this.editorConfig.editable = this.isLetterValid;
    this.welcomeLetter = this.adminFormService.letter.getValue();

    this.adminFormService.user.subscribe(
      user => {
        this.user = user;
      }
    );
  }

  reset() {
    this.adminFormService.letter.next(LETTER);
    this.welcomeLetter = LETTER;
  }

  save() {
    this.adminFormService.letter.next(this.welcomeLetter);
  }

  updateWelcomeLetter() {
    this.editorConfig.editable = !this.editorConfig.editable;
    this.isLetterValid = this.editorConfig.editable;
    this.adminFormService.isLetterValid.next(this.editorConfig.editable);
  }

  back() {
    if (this.user.hasHarvest) {
      this.adminFormService.setPage(3);
    } else {
      this.adminFormService.setPage(2);
    }
  }

  next() {
    this.adminFormService.setPage(5);
    this.user.setLetter(this.welcomeLetter);
  }

}
