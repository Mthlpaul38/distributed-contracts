module.exports={
    landdetails:async function()
    {
       
    
        const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
        var cardName = "admin@land-registry";
        const bnConnection = new BusinessNetworkConnection();
        console.log("2");
    
        await bnConnection.connect(cardName).then(async function()
        
            {
                await land();
                bnConnection.disconnect();
    
            }
        
        
        ).catch((error)=>{
            console.log(error);
            //out=error;
            out="Sorry,your request cannot be processed";    
            bnConnection.disconnect();
    
    
            }
                
    
    
    
        );
    
        
        
        async function land()
        {
    
            var statement='SELECT org.acme.landregistry.historian';
    var qry= await bnConnection.buildQuery(statement);
    console.log("3");
    return bnConnection.query(qry).then((result)=>{
        console.log("4");
        console.log(result[0].id);
//        console.log('ID:', result[0].id);
        return result;
    }).catch((error)=>{
        console.log(error);
        bnConnection.disconnect();
    });
}
    
        }    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
