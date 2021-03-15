import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainNewsfeedComponent } from './maintain-newsfeed.component';

describe('MaintainNewsfeedComponent', () => {
  let component: MaintainNewsfeedComponent;
  let fixture: ComponentFixture<MaintainNewsfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainNewsfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainNewsfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
