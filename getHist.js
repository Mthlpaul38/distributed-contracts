module.exports={
    landdetails:async function()
    {
        var property;
        const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
        var cardName = "admin@land-registry";
        const bnConnection = new BusinessNetworkConnection();
       // console.log("2");
    
        await bnConnection.connect(cardName).then(async function()
        
            {
                property= await land();
                bnConnection.disconnect();
               // return property;
            }
        
        
        ).catch((error)=>{
            console.log(error);
            //out=error;
            //out="Sorry,your request cannot be processed";    
            bnConnection.disconnect();
    
    
            }
                
    
    
    
        );
    
        return property;
        
        async function land()
        {
        function isEmpty(obj) {
             for(var key in obj) {
                 if(obj.hasOwnProperty(key))
                     return false;
                }
                return true;
            }
     var statement='SELECT org.acme.landregistry.historian';
    var qry= await bnConnection.buildQuery(statement);
    //console.log("3");
    return bnConnection.query(qry).then((result)=>{
       if (isEmpty(result)){
            console.log("empty");
        bnConnection.disconnect();
        return "empty";
        }else{
        //console.log(typeof result[0].id);
        console.log("4");
       // console.log(result[0].id);
//        console.log('ID:', result[0].id);
        return result;}
    }).catch((error)=>{
        console.log(error);
        bnConnection.disconnect();
    });
}
    
        }    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
