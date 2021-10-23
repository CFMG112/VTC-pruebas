import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTransformerDetailComponent } from './report-transformer-detail.component';

describe('ReportTransformerDetailComponent', () => {
  let component: ReportTransformerDetailComponent;
  let fixture: ComponentFixture<ReportTransformerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTransformerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTransformerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
