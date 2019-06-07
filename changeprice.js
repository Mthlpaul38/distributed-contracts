'use strict';
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const RegisrtyNamespace = 'org.acme.landregistry';
const RealEstatetype = 'RealEstate';
const {spawn} = require('child_process');
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
    var id=process.argv[3];
    var price=process.argv[2];
    registry.exists(id).then((istrue)=>{
        
        if (istrue){
    //console.log("succesful");
    return registry.get(id).then((land)=>
    {
        land.price=parseFloat(price);
        console.log(land.price);
        return registry.update(land).then(()=>{
            console.log("Update succesful");
            bnUtil.disconnect();
            process.exit(0);
        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
        });
        }).catch((error)=>{
            console.log(error);
            bnUtil.disconnect();
            process.exit(1);
        });}
        else{
           // cprocess =  spawn('node',['/home/mathul/fabric-dev-servers/land-registry/addLand.js',land_id,land_address,land_area,land_coordinate_one,land_coordinate_two,land_price,land_adhar_number,land_ownname],{stdio: [process.stdin, process.stdout, process.stderr]}
		//)
		
		  
		//  cprocess.on('exit', function (code) {
			//console.log('child process exited with code ' + code.toString());
			process.exit(0);
		 // });
        }
    });
}