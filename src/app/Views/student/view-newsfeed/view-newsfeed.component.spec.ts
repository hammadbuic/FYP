import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNewsfeedComponent } from './view-newsfeed.component';

describe('ViewNewsfeedComponent', () => {
  let component: ViewNewsfeedComponent;
  let fixture: ComponentFixture<ViewNewsfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNewsfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewNewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
