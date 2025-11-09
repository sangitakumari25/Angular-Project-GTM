import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.css']
})
export class Task2Component implements OnInit {

  transactionForm!: FormGroup;
  saveData: any = null;
  saveMode = false;

  // Example options
  paymentTerms = [
    { typeValue: 'Advance', typeDisplayValue: 'Advance' },
    { typeValue: 'Net 30', typeDisplayValue: 'Net 30' },
    { typeValue: 'Net 60', typeDisplayValue: 'Net 60' }
  ];

  countryArray = [
    { countryCode: 'US', currency: 'USD', name: 'United States' },
    { countryCode: 'IN', currency: 'INR', name: 'India' },
    { countryCode: 'EU', currency: 'EUR', name: 'Europe' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.transactionForm = this.fb.group({
      paymentTerm: ['', Validators.required],
      origPono: ['', Validators.required],
      sourceSystem: ['', Validators.required],
      buCode: ['', Validators.required],
      freightTerm: ['', Validators.required],
      manualHold: ['', Validators.required],
      notes: [''],
      homeCurrency: ['', Validators.required]
    });
  }

  onPaymentTermChange(event: any) {
    console.log('Payment Term Changed:', event.value);
  }

  onSave() {
    if (this.transactionForm.valid) {
      this.saveData = this.transactionForm.value;
      this.saveMode = true;  // show read-only view
      console.log('Saved Data:', this.saveData);
    } else {
      console.log('Form Invalid');
      this.transactionForm.markAllAsTouched();
    }
  }
}
