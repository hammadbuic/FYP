import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectActivityComponent } from './view-project-activity.component';

describe('ViewProjectActivityComponent', () => {
  let component: ViewProjectActivityComponent;
  let fixture: ComponentFixture<ViewProjectActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProjectActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProjectActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
