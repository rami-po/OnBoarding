import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PDFViewerComponent implements OnInit {

  pdfSrc = '/forms/W4_form.pdf';
  elt = 'self';
  stp = false;

  constructor() { }

  ngOnInit() {
  }

}
