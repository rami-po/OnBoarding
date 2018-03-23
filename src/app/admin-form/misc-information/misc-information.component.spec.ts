import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscInformationComponent } from './misc-information.component';

describe('MiscInformationComponent', () => {
  let component: MiscInformationComponent;
  let fixture: ComponentFixture<MiscInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
