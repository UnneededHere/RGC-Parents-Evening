import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUserPage } from './teacher-user.page';

describe('TeacherUserPage', () => {
  let component: TeacherUserPage;
  let fixture: ComponentFixture<TeacherUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
