import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-license-tracking-wizard',
  templateUrl: './license-tracking-wizard.component.html',
  styleUrls: ['./license-tracking-wizard.component.css']
})
export class LicenseTrackingWizardComponent implements OnInit {
  licenseForm!: FormGroup;
  trackingForm!: FormGroup;
  currentStep = 1;
  showSummary = false;

  issuingAgencies = [
    { value: 'DOS', viewValue: 'DOS - State Department' },
    { value: 'DOC', viewValue: 'DOC - Commerce Department' },
    { value: 'DOT', viewValue: 'DOT - Transportation Department' },
    { value: 'DHS', viewValue: 'DHS - Homeland Security' },
  ];

  countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany',
    'France', 'Japan', 'China', 'India'
  ];

  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  roles = ['Exporter', 'Shipper', 'Manufacturer'];

  constructor(private fb: FormBuilder, private renderer: Renderer2) {}

  ngOnInit(): void {
    // License Form
    this.licenseForm = this.fb.group({
      licenseReference: ['', Validators.required],
      issuingAgency: ['', Validators.required],
      issueDate: ['', Validators.required],
      expirationDate: ['', Validators.required],
      licenseDescription: [''],
      countryOfExport: ['', Validators.required],
      licenseCurrency: ['', Validators.required],
      authorizedLicensee: ['', Validators.required],
    });

    // Tracking Form
    this.trackingForm = this.fb.group({
      trackUsageBy: ['', Validators.required],
      trackItemsBy: ['', Validators.required],
      licenseLimit: ['', Validators.required],
      decrementType: ['', Validators.required],
      enableHeaderLevelTracking: [false],
      totalLicensedQuantity: [0],
      totalLicensedValue: [0],
      remainingQuantityAvailable: [0],
      remainingValueAvailable: [0],
    });

    // Auto-update remaining fields
    this.trackingForm.valueChanges.subscribe(values => {
      const qty = parseFloat(values.totalLicensedQuantity) || 0;
      const val = parseFloat(values.totalLicensedValue) || 0;
      this.trackingForm.patchValue({
        remainingQuantityAvailable: qty,
        remainingValueAvailable: val
      }, { emitEvent: false });
    });
  }

  nextStep() {
    if (this.currentStep === 1 && this.licenseForm.invalid) {
      this.licenseForm.markAllAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  onSubmit() {
    if (this.trackingForm.invalid) {
      this.trackingForm.markAllAsTouched();
      return;
    }

    // ✅ Show summary section
    this.showSummary = true;
    this.renderer.addClass(document.body, 'summary-active');
  }

  resetWizard() {
    this.showSummary = false;
    this.currentStep = 1;
    this.renderer.removeClass(document.body, 'summary-active');
    this.licenseForm.reset();
    this.trackingForm.reset({
      enableHeaderLevelTracking: false,
      totalLicensedQuantity: 0,
      totalLicensedValue: 0,
      remainingQuantityAvailable: 0,
      remainingValueAvailable: 0
    });
  }

  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }

  isStepCompleted(step: number): boolean {
    return this.currentStep > step;
  }

  toggleHeaderTracking() {
    const currentValue = this.trackingForm.get('enableHeaderLevelTracking')?.value;
    this.trackingForm.patchValue({
      enableHeaderLevelTracking: !currentValue
    });
  }
}
