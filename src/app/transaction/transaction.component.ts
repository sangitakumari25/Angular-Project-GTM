import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactionForm!: FormGroup;
  saveData: any;

  // Extra properties
  saveMode = false;
  editMode = true;
  activeTab = 'basic';

  // Dropdown options
  options = [
    { value: 'sale', view: 'Sale' },
    { value: 'purchase', view: 'Purchase' }
  ];

  currancies = [
    { value: 'inr', view: 'INR' },
    { value: 'usd', view: 'USD' },
    { value: 'eur', view: 'EUR' }
  ];

  terms = [
    { value: 'net30', view: 'Net 30' },
    { value: 'net60', view: 'Net 60' },
    { value: 'advance', view: 'Advance' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      transactionId: ['', Validators.required],
      transactionDate: ['', Validators.required],
      shipmentDate: ['', Validators.required],
      transactionType: ['', Validators.required],
      refrance: ['', Validators.required],
      customerPoNo: ['', Validators.required],
      invoiceNumber: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      invoiceDueDate: ['', Validators.required],
      poDate: ['', Validators.required],
      currency: ['', Validators.required],
      invoiceTerms: ['', Validators.required],
      packingReferance: ['', Validators.required],
      billOfLoding: ['', Validators.required],
      commercialInvoice: ['', Validators.required],
      airWaybill: ['', Validators.required],
      masterBol: ['', Validators.required],
      houseBol: ['', Validators.required]
    });
  }

  // ✅ Getter methods for type-safe FormControls
  get transactionId(): FormControl { return this.transactionForm.get('transactionId') as FormControl; }
  get transactionDate(): FormControl { return this.transactionForm.get('transactionDate') as FormControl; }
  get shipmentDate(): FormControl { return this.transactionForm.get('shipmentDate') as FormControl; }
  get transactionType(): FormControl { return this.transactionForm.get('transactionType') as FormControl; }
  get refrance(): FormControl { return this.transactionForm.get('refrance') as FormControl; }
  get customerPoNo(): FormControl { return this.transactionForm.get('customerPoNo') as FormControl; }
  get invoiceNumber(): FormControl { return this.transactionForm.get('invoiceNumber') as FormControl; }
  get invoiceDate(): FormControl { return this.transactionForm.get('invoiceDate') as FormControl; }
  get invoiceDueDate(): FormControl { return this.transactionForm.get('invoiceDueDate') as FormControl; }
  get poDate(): FormControl { return this.transactionForm.get('poDate') as FormControl; }
  get currency(): FormControl { return this.transactionForm.get('currency') as FormControl; }
  get invoiceTerms(): FormControl { return this.transactionForm.get('invoiceTerms') as FormControl; }
  get packingReferance(): FormControl { return this.transactionForm.get('packingReferance') as FormControl; }
  get billOfLoding(): FormControl { return this.transactionForm.get('billOfLoding') as FormControl; }
  get commercialInvoice(): FormControl { return this.transactionForm.get('commercialInvoice') as FormControl; }
  get airWaybill(): FormControl { return this.transactionForm.get('airWaybill') as FormControl; }
  get masterBol(): FormControl { return this.transactionForm.get('masterBol') as FormControl; }
  get houseBol(): FormControl { return this.transactionForm.get('houseBol') as FormControl; }

  onSave() {
    if (this.transactionForm.valid) {
      this.saveMode = !this.saveMode;
      this.editMode = !this.editMode;

      this.saveData = this.transactionForm.value;
      console.log(this.saveData);
    } else {
      console.log("please fill all data");
    }
  }

  onTabSwitch(tabElement: string) {
    this.activeTab = tabElement;
    console.log(this.activeTab);
  }

  getTransactionType(value: any): string {
    const selectedOption = this.options.find(opt => opt.value === value);
    return selectedOption ? selectedOption.view : '';
  }

  getCurrency(value: any): string {
    const selectedOption = this.currancies.find(opt => opt.value === value);
    return selectedOption ? selectedOption.view : '';
  }

  getInvoiceTerms(value: any): string {
    const selectedOption = this.terms.find(opt => opt.value === value);
    return selectedOption ? selectedOption.view : '';
  }
}
