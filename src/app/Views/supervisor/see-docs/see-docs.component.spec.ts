import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDocsComponent } from './see-docs.component';

describe('SeeDocsComponent', () => {
  let component: SeeDocsComponent;
  let fixture: ComponentFixture<SeeDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
