import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.landregistry{
   export class PrivateIndividual extends Participant {
      id: string;
      name: string;
      address: string;
      balance: number;
   }
   export class Bank extends Participant {
      id: string;
      name: string;
      balance: number;
   }
   export class InsuranceCompany extends Participant {
      id: string;
      name: string;
      balance: number;
   }
   export class Notary extends Participant {
      id: string;
      name: string;
      address: string;
      balance: number;
   }
   export class RealEstate extends Asset {
      id: string;
      address: string;
      squareMeters: number;
      price: number;
      owner: PrivateIndividual;
   }
   export class Loan extends Asset {
      id: string;
      amount: number;
      interestRate: number;
      debtor: PrivateIndividual;
      bank: Bank;
      realEstate: RealEstate;
      durationInMonths: number;
   }
   export class Insurance extends Asset {
      id: string;
      realEstate: RealEstate;
      insured: PrivateIndividual;
      insuranceCompany: InsuranceCompany;
      monthlyCost: number;
      durationInMonths: number;
   }
   export class BuyingRealEstate extends Transaction {
      buyer: PrivateIndividual;
      seller: PrivateIndividual;
      realEstate: RealEstate;
      loan: Loan;
      notary: Notary;
      insurance: Insurance;
   }
   export class ContractingInsurance extends Transaction {
      insured: PrivateIndividual;
      insuranceCompany: InsuranceCompany;
      realEstate: RealEstate;
      monthlyCost: number;
      durationInMonths: number;
   }
   export class ContractingLoan extends Transaction {
      debtor: PrivateIndividual;
      bank: Bank;
      realEstate: RealEstate;
      interestRate: number;
      durationInMonths: number;
   }
// }
