import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysDetailComponent } from './days-detail.component';

describe('DaysDetailComponent', () => {
  let component: DaysDetailComponent;
  let fixture: ComponentFixture<DaysDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaysDetailComponent]
    });
    fixture = TestBed.createComponent(DaysDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
