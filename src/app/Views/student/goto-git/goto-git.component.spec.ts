import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoGitComponent } from './goto-git.component';

describe('GotoGitComponent', () => {
  let component: GotoGitComponent;
  let fixture: ComponentFixture<GotoGitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotoGitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotoGitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
