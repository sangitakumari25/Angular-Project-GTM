import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  transactionForm!: FormGroup;
  saveData: any;

  // UI states
  editMode = true;
  saveMode = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      trnId: ['', Validators.required],
      revisionNo: [''],
      trnDate: [''],
      poType: [''],
      coe: [''],
      trnTotal: [''],
      currency: [''],
      mmvTotal: [''],
      coi: [''],
      ndcTotal: [''],
      incoterm: [''],
      exchangeRate: [''],
      motCd: [''],
      dutyTotal: [''],
      dutiableVal: ['']
    });
  }

  onSave(): void {
    if (this.transactionForm.valid) {
      this.saveData = this.transactionForm.value;
      this.editMode = false;
      this.saveMode = true;
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }

  onEdit(): void {
    this.editMode = true;
    this.saveMode = false;
    // Pre-fill form again with saved data
    if (this.saveData) {
      this.transactionForm.patchValue(this.saveData);
    }
  }
}
