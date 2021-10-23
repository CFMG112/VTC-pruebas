import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTransformerListComponent } from './report-transformer-list.component';

describe('ReportTransformerListComponent', () => {
  let component: ReportTransformerListComponent;
  let fixture: ComponentFixture<ReportTransformerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTransformerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTransformerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
