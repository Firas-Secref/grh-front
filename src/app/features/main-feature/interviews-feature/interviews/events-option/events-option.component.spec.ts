import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsOptionComponent } from './events-option.component';

describe('EventsOptionComponent', () => {
  let component: EventsOptionComponent;
  let fixture: ComponentFixture<EventsOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
