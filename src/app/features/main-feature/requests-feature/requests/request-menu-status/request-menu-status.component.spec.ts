import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMenuStatusComponent } from './request-menu-status.component';

describe('RequestMenuStatusComponent', () => {
  let component: RequestMenuStatusComponent;
  let fixture: ComponentFixture<RequestMenuStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestMenuStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMenuStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
