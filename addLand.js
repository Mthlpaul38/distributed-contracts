'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
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
        addRealEstate(registry);

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });
}

/**
 * @param {*} registry This is of type AssetRegistry
 */
function    addRealEstate(registry){
    // 3. This Array will hold the instances of aircraft resource
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();
    // Instance#1
    console.log("addLand2")
    var id=process.argv[2];
    var address=process.argv[3];
    var area=process.argv[4];
    var Coordinate_one=process.argv[5];
    var Coordinate_two=process.argv[6];
    var price=process.argv[7];
    var ownid=process.argv[8];
    /*var id="44324dfs42342";
    var address="523424";
    var area=432423;
    var Coordinate_one=52525.54;
    var Coordinate_two=423423.523;
    var price=53453;
    var ownid="4234234fds";*/
        let    RealEstateResource = factory.newResource(RegisrtyNamespace,RealEstatetype,id);
    RealEstateResource.setPropertyValue('address',address);
    RealEstateResource.setPropertyValue('Area',parseFloat(area));
    RealEstateResource.setPropertyValue('Coordinate_one',parseFloat(Coordinate_one));
    RealEstateResource.setPropertyValue('Coordinate_two',parseFloat(Coordinate_two));
    RealEstateResource.setPropertyValue('price',parseFloat(price));
    RealEstateResource.setPropertyValue('ownid',ownid);
    
    // 4. Add the Aircraft resource to the registry
    return registry.add(RealEstateResource).then(()=>{
        console.log('Added the Resources successfully!!!');
       bnUtil.disconnect();
       process.exit();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}