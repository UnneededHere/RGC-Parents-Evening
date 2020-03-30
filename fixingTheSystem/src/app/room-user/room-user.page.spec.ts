import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUserPage } from './room-user.page';

describe('RoomUserPage', () => {
  let component: RoomUserPage;
  let fixture: ComponentFixture<RoomUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
