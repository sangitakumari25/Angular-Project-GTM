import { Component, OnInit} from '@angular/core';
import { TheamService } from '../theam.service';

@Component({
  selector: 'app-license-wizard',
  templateUrl: './license-wizard.component.html',
  styleUrls: ['./license-wizard.component.css']
})
export class LicenseWizardComponent implements OnInit  { 
  headingColor: string = '#000000';

  formData: any = {
    licenseReference: 'LIC-2024-USA-00892',
    issuingAgency: 'DOS',
    issueDate: '2024-01-15',
    expirationDate: '2025-01-14',
    licenseDescription: 'Export license for aerospace components and related defense articles to approved NATO member countries',
    countryOfExport: 'United States',
    licenseCurrency: 'USD',
    authorizedLicensee: 'Exporter',
    trackUsageBy: 'Party',
    trackItemsBy: 'ECCN',
    licenseLimit: 'Both',
    decrementType: 'Shipment',
    enableHeaderLevelTracking: true,
    // <-- FIXED: numeric fields are numbers so arithmetic in template works -->
    totalLicensedQuantity: 5000,
    totalLicensedValue: 2500000,
    remainingQuantityAvailable: 5000,
    remainingValueAvailable: 2500000,
    usedQuantity: 0,
    usedValue: 0
  };
constructor(private theamService:TheamService){}
ngOnInit() {
    // Subscribe to color changes
    this.theamService.headingColor$.subscribe((color) => {
      this.headingColor = color;
    });
  }
  changeColor(event: any) {
    const color = event.target.value;
    this.theamService.setHeadingColor(color);
  }


  formatCurrency(value: string | number): string {
    const v = typeof value === 'number' ? value : parseFloat(String(value) || '0');
    const currencySymbol = this.formData.licenseCurrency === 'EUR' ? '€' :
                           this.formData.licenseCurrency === 'GBP' ? '£' :
                           this.formData.licenseCurrency === 'JPY' ? '¥' : '$';
    return `${currencySymbol}${v.toLocaleString()}`;
  }

  handleEdit() {
    console.log('Edit clicked');
    // placeholder for edit action
  }
}

 
