import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SJsUtilsComponent } from './s-js-utils.component';

describe('SJsUtilsComponent', () => {
  let component: SJsUtilsComponent;
  let fixture: ComponentFixture<SJsUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SJsUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SJsUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
