import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoGitlabComponent } from './goto-gitlab.component';

describe('GotoGitlabComponent', () => {
  let component: GotoGitlabComponent;
  let fixture: ComponentFixture<GotoGitlabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotoGitlabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotoGitlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
