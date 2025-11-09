import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TNXComponent } from './tnx.component';

describe('TNXComponent', () => {
  let component: TNXComponent;
  let fixture: ComponentFixture<TNXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TNXComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TNXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
