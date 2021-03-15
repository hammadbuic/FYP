import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCoordinatorComponent } from './assign-coordinator.component';

describe('AssignCoordinatorComponent', () => {
  let component: AssignCoordinatorComponent;
  let fixture: ComponentFixture<AssignCoordinatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCoordinatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
