/* tslint:disable:no-unused-variable */
import {} from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatusMessageDialogComponent } from './status-message.component';


describe('StatusMessageDialogComponent', () => {
  let component: StatusMessageDialogComponent;
  let fixture: ComponentFixture<StatusMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
