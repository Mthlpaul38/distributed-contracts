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
    var id='1001';
    var buyer='1008';
    //console.log("succesful");
    return registry.get(id).then((land)=>
    {
        if (typeof land.prevown == 'undefined') {
            land.prevown = new Array();
           land.prevown[0] = land.ownid;
          } 
          else {
            land.prevown.push(land.ownid);

          }
          if (typeof land.prevprice == 'undefined') {
            land.prevprice = new Array();
            land.prevprice[0] = land.price;
          } 
          else {
            land.prevprice.push(land.price);
          }
        console.log(land.price);
       // console.log(land.prevprice);
       // land.prevown[1]="324efas";
       // land.prevprice.push(land.price);
        land.ownid=buyer;   
        console.log(land.ownid);
        console.log(land.prevown);
        console.log(land.prevprice);
        return registry.update(land).then(()=>{
            console.log("Update succesful");
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