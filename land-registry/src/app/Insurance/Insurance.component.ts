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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { InsuranceService } from './Insurance.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-insurance',
  templateUrl: './Insurance.component.html',
  styleUrls: ['./Insurance.component.css'],
  providers: [InsuranceService]
})
export class InsuranceComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  id = new FormControl('', Validators.required);
  realEstate = new FormControl('', Validators.required);
  insured = new FormControl('', Validators.required);
  insuranceCompany = new FormControl('', Validators.required);
  monthlyCost = new FormControl('', Validators.required);
  durationInMonths = new FormControl('', Validators.required);

  constructor(public serviceInsurance: InsuranceService, fb: FormBuilder) {
    this.myForm = fb.group({
      id: this.id,
      realEstate: this.realEstate,
      insured: this.insured,
      insuranceCompany: this.insuranceCompany,
      monthlyCost: this.monthlyCost,
      durationInMonths: this.durationInMonths
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceInsurance.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.landregistry.Insurance',
      'id': this.id.value,
      'realEstate': this.realEstate.value,
      'insured': this.insured.value,
      'insuranceCompany': this.insuranceCompany.value,
      'monthlyCost': this.monthlyCost.value,
      'durationInMonths': this.durationInMonths.value
    };

    this.myForm.setValue({
      'id': null,
      'realEstate': null,
      'insured': null,
      'insuranceCompany': null,
      'monthlyCost': null,
      'durationInMonths': null
    });

    return this.serviceInsurance.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'id': null,
        'realEstate': null,
        'insured': null,
        'insuranceCompany': null,
        'monthlyCost': null,
        'durationInMonths': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.landregistry.Insurance',
      'realEstate': this.realEstate.value,
      'insured': this.insured.value,
      'insuranceCompany': this.insuranceCompany.value,
      'monthlyCost': this.monthlyCost.value,
      'durationInMonths': this.durationInMonths.value
    };

    return this.serviceInsurance.updateAsset(form.get('id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceInsurance.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceInsurance.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'id': null,
        'realEstate': null,
        'insured': null,
        'insuranceCompany': null,
        'monthlyCost': null,
        'durationInMonths': null
      };

      if (result.id) {
        formObject.id = result.id;
      } else {
        formObject.id = null;
      }

      if (result.realEstate) {
        formObject.realEstate = result.realEstate;
      } else {
        formObject.realEstate = null;
      }

      if (result.insured) {
        formObject.insured = result.insured;
      } else {
        formObject.insured = null;
      }

      if (result.insuranceCompany) {
        formObject.insuranceCompany = result.insuranceCompany;
      } else {
        formObject.insuranceCompany = null;
      }

      if (result.monthlyCost) {
        formObject.monthlyCost = result.monthlyCost;
      } else {
        formObject.monthlyCost = null;
      }

      if (result.durationInMonths) {
        formObject.durationInMonths = result.durationInMonths;
      } else {
        formObject.durationInMonths = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'id': null,
      'realEstate': null,
      'insured': null,
      'insuranceCompany': null,
      'monthlyCost': null,
      'durationInMonths': null
      });
  }

}
