'use strict';

const RegisrtyNamespace = 'org.acme.landregistry';
const RealEstatetype = 'RealEstate';

// 1. Connect
const bnUtil = require('./connection');
bnUtil.connect(main);

function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the aircraft AssetRegistry
    return bnUtil.connection.getAssetRegistry(RegisrtyNamespace+'.'+RealEstatetype).then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        // Utility method for adding the aircrafts
       changeprice(registry);

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });
}
/**
 * @param {*} registry This is of type AssetRegistry
 */
function changeprice(registry)
{
    var id='453453fdsfds';
    console.log("succesful");
    return registry.resolve(id).then((land)=>
    {
        console.log(land);
        bnUtil.disconnect();
        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
        });
    
}