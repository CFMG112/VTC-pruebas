import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextMaintencesComponent } from './next-maintences.component';

describe('NextMaintencesComponent', () => {
  let component: NextMaintencesComponent;
  let fixture: ComponentFixture<NextMaintencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextMaintencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextMaintencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
