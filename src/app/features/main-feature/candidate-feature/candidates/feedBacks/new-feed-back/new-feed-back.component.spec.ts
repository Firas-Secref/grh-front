import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFeedBackComponent } from './new-feed-back.component';

describe('NewFeedBackComponent', () => {
  let component: NewFeedBackComponent;
  let fixture: ComponentFixture<NewFeedBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFeedBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFeedBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
