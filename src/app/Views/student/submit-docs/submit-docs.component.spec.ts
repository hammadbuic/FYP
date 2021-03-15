import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitDocsComponent } from './submit-docs.component';

describe('SubmitDocsComponent', () => {
  let component: SubmitDocsComponent;
  let fixture: ComponentFixture<SubmitDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
