'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const RegisrtyNamespace = 'org.acme.landregistry';
const RealEstatetype = 'historian';

// 1. Connect
const bnUtil = require('./connection');
bnUtil.connect(main);

function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }


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
    
    var buyer=process.argv[4];
    var seller=process.argv[3];
    var land_id=process.argv[2];
    var time=new Date().toJSON();
    var id=land_id+time;
    var buyerid=process.argv[5];
    var sellerid=process.argv[6];
    var price=process.argv[5];
    console.log(buyer);
    console.log(seller);
    console.log(land_id); 
    console.log(buyerid);
    console.log(sellerid); 
        let    RealEstateResource = factory.newResource(RegisrtyNamespace,RealEstatetype,id);
    RealEstateResource.setPropertyValue('buyer',buyer);
    RealEstateResource.setPropertyValue('seller',seller); 
    RealEstateResource.setPropertyValue('price',price);
    RealEstateResource.setPropertyValue('land_id',land_id);
    RealEstateResource.setPropertyValue('buyerid',buyerid);
    RealEstateResource.setPropertyValue('sellerid',sellerid);
    RealEstateResource.setPropertyValue('time',new Date().toJSON());
    // 4. Add the Aircraft resource to the registry
    return registry.add(RealEstateResource).then(()=>{
        console.log('Added the Historian successfully!!!');
        bnUtil.disconnect();
        process.exit(0);
        
    }).catch((error)=>{
        console.log(error);
        bnUtil.disconnect();
    });
}