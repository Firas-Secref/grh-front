import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostMenuStatusComponent } from './post-menu-status.component';

describe('PostMenuStatusComponent', () => {
  let component: PostMenuStatusComponent;
  let fixture: ComponentFixture<PostMenuStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostMenuStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMenuStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
