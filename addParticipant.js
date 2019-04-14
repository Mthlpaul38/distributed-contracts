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
    var id="453453fdsfds";
    var landid="44324";
    var address="abcxxsd";
    var area=4534;
    var Coordinate_one=5433.4543;
    var Coordinate_two=33445.7655;
    var price=33432;
    var ownid="ds332";
    let    RealEstateResource = factory.newResource(RegisrtyNamespace,RealEstatetype,id);
    RealEstateResource.setPropertyValue('landid',landid);
    RealEstateResource.setPropertyValue('address',address);
    RealEstateResource.setPropertyValue('Area',area);
    RealEstateResource.setPropertyValue('Coordinate_one',Coordinate_one);
    RealEstateResource.setPropertyValue('Coordinate_two',Coordinate_two);
    RealEstateResource.setPropertyValue('price',price);
    RealEstateResource.setPropertyValue('ownid',ownid);
    
    // 4. Add the Aircraft resource to the registry
    return registry.add(RealEstateResource).then(()=>{
        console.log('Added the Resources successfully!!!');
       bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}