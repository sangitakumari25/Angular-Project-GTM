import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

// Angular Material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HeaderComponent } from './header/header.component';
import { TaskComponent } from './task/task.component';
import { Task2Component } from './task2/task2.component';

import { LicenseTrackingWizardComponent } from './license-tracking-wizard/license-tracking-wizard.component';

import { LicenseWizardComponent } from './license-wizard/license-wizard.component';
import { TNXComponent } from './tnx/tnx.component';
import { ColorpickerComponent } from './colorpicker/colorpicker.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    HeaderComponent,
    TaskComponent,
    Task2Component,
   
    LicenseTrackingWizardComponent,
 
    LicenseWizardComponent,
      TNXComponent,
      ColorpickerComponent,
  
   
  ],
  imports: [
    BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule, FormsModule,
  


  // ✅ Material imports
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatCardModule,
  MatMenuModule,    
  MatIconModule ,
  
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
