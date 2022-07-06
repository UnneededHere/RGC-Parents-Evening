import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUserPage } from './mobile-user.page';

describe('MobileUserPage', () => {
  let component: MobileUserPage;
  let fixture: ComponentFixture<MobileUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
