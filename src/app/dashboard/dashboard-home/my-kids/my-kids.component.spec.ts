import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyKidsComponent } from './my-kids.component';

describe('MyKidsComponent', () => {
  let component: MyKidsComponent;
  let fixture: ComponentFixture<MyKidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyKidsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyKidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
