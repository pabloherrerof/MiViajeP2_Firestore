import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysLayoutComponent } from './days-layout.component';

describe('DaysLayoutComponent', () => {
  let component: DaysLayoutComponent;
  let fixture: ComponentFixture<DaysLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaysLayoutComponent]
    });
    fixture = TestBed.createComponent(DaysLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
