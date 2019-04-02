/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { RealEstateComponent } from './RealEstate/RealEstate.component';
import { LoanComponent } from './Loan/Loan.component';
import { InsuranceComponent } from './Insurance/Insurance.component';

import { PrivateIndividualComponent } from './PrivateIndividual/PrivateIndividual.component';
import { BankComponent } from './Bank/Bank.component';
import { InsuranceCompanyComponent } from './InsuranceCompany/InsuranceCompany.component';
import { NotaryComponent } from './Notary/Notary.component';

import { BuyingRealEstateComponent } from './BuyingRealEstate/BuyingRealEstate.component';
import { ContractingInsuranceComponent } from './ContractingInsurance/ContractingInsurance.component';
import { ContractingLoanComponent } from './ContractingLoan/ContractingLoan.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'RealEstate', component: RealEstateComponent },
  { path: 'Loan', component: LoanComponent },
  { path: 'Insurance', component: InsuranceComponent },
  { path: 'PrivateIndividual', component: PrivateIndividualComponent },
  { path: 'Bank', component: BankComponent },
  { path: 'InsuranceCompany', component: InsuranceCompanyComponent },
  { path: 'Notary', component: NotaryComponent },
  { path: 'BuyingRealEstate', component: BuyingRealEstateComponent },
  { path: 'ContractingInsurance', component: ContractingInsuranceComponent },
  { path: 'ContractingLoan', component: ContractingLoanComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
