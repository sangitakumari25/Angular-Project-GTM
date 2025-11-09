import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TaskComponent } from './task/task.component';
import { Task2Component } from './task2/task2.component';
import { LicenseTrackingWizardComponent } from './license-tracking-wizard/license-tracking-wizard.component';
import { LicenseWizardComponent } from './license-wizard/license-wizard.component';
import { TNXComponent } from './tnx/tnx.component';
import { ColorpickerComponent } from './colorpicker/colorpicker.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'transactions', component: TransactionComponent },  //  path should match menu
  // { path: '**', redirectTo: '' },
  {path:'task',component:TaskComponent},
  {path:'task2',component:Task2Component},
  {path:'license-tracking-wizard',component:LicenseTrackingWizardComponent},
  {path:'license-wizard',component:LicenseWizardComponent},
  {path:'tnx',component:TNXComponent},
  {path:'colorpicker',component:ColorpickerComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
