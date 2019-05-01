'use strict';

 // Constant values - change as per your needs
 const namespace = 'org.acme.landregistry';
 const transactionType = "BuyingRealEstate";

// 1. Connect to airlinev7
const bnUtil = require('./connection');
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }
    console.log("success");
    // 2. Get the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory()
    console.log("success");
   // console.log(land);
    let options = {
        generate: false,
        includeOptionalFields: false
    }
    var buyer="234242";
    var seller="3423432";
    var id="1008";
   var price="3432";
   var transId=buyer+id;
    let transaction = factory.newTransaction(namespace,transactionType,transId,options);
    // 5. Set up the properties of the transaction object
    transaction.setPropertyValue('buyer',buyer);
    transaction.setPropertyValue('seller',seller);
    transaction.setPropertyValue('id' ,id);
    transaction.setPropertyValue('price',toString(price));

    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}



