import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestInformationComponent } from './harvest-information.component';

describe('HarvestInformationComponent', () => {
  let component: HarvestInformationComponent;
  let fixture: ComponentFixture<HarvestInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarvestInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarvestInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
