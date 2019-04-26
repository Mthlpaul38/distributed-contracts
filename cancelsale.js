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
       cancelsale(registry);

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });
}
/**
 * @param {*} registry This is of type AssetRegistry
 */
function cancelsale(registry)
{
    var id="1001";
    var land;
    //console.log("succesful");
    return registry.get(id).then((land)=>
    {
        console.log(land.price);
        return registry.remove(land).then(()=>{
            console.log("Remove succesful");
            bnUtil.disconnect();
        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
        });
        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
            process.exit(1);
        });
}