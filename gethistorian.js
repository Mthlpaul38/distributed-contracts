const land = require('./getAsset');
async function lands()
{
    console.log("2");
console.log( "land-->"+await land.landdetails('1001'));
property=await land.landdetails('1001');
console.log(property[0].id);
//console.log(res);

}
lands();
