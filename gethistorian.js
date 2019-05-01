const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
// Used as the card for all calls
var cardName = "admin@land-registry";
//const   registryId = "org.example.voting.candidate.Candidate";



const bnConnection = new BusinessNetworkConnection();//cardStoreObj);


return bnConnection.connect(cardName).then(async function(){
    console.log("Connected Successfully!!!");
    await landdetails();
    process.exit();

}).catch((error)=>{
    console.log(error);
});
function landdetails(registry)
{
    var statement='SELECT org.acme.landregistry.historian';
    var qry= bnConnection.buildQuery(statement);
    return bnConnection.query(qry,{id:process.argv[2]}).then((result)=>{

//        console.log('ID:', result[0].id);
        for (var i of result) {
            console.log("Buyer:"+i.buyer);
            console.log("Seller:"+i.seller);
            console.log("Timestamp:"+i.time);
         }
    }).catch((error)=>{
        console.log(error);
        bnConnection.disconnect();
    });
}