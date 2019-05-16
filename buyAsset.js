'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const {spawn} = require('child_process');
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
       buyAsset(registry);

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });
}
/**
 * @param {*} registry This is of type AssetRegistry
 */
function buyAsset(registry)
{
    var id=process.argv[2];
    var buyer=process.argv[3];
    var buyerid=process.argv[4];
    return registry.get(id).then((land)=>
    {
        var price =land.price;
        var sellerid=land.ownid;
        var seller=land.ownname;
        land.ownid=buyer;   
        console.log(land.ownid);
        return registry.update(land).then( ()=>{
            console.log("Update succesful");
            bnUtil.disconnect();
           fprocess =  spawn('node',['/home/mathul/fabric-dev-servers/land-registry/historian.js',id,seller,buyer,price,buyerid,sellerid],{stdio: [process.stdin, process.stdout, process.stderr]}
            )
           fprocess.on('exit', function (codef) {
                console.log("Historian updated");
                process.exit(0);
            });
            
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