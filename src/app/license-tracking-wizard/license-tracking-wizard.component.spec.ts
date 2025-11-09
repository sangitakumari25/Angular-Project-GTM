import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTrackingWizardComponent } from './license-tracking-wizard.component';

describe('LicenseTrackingWizardComponent', () => {
  let component: LicenseTrackingWizardComponent;
  let fixture: ComponentFixture<LicenseTrackingWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseTrackingWizardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseTrackingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
