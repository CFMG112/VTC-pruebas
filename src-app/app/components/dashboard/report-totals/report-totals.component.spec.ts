import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTotalsComponent } from './report-totals.component';

describe('ReportTotalsComponent', () => {
  let component: ReportTotalsComponent;
  let fixture: ComponentFixture<ReportTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
