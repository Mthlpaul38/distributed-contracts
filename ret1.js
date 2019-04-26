// Save as st.js
// install node modules


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


var x = "1001"
var query = ({
    "land_id": x
}); 

//var deed_land_id;

var myFunc = async function(query)  {
var db
var client
try {
  client = await MongoClient.connect(url, { useNewUrlParser: true }).catch((error)=>{
	console.log(error);
});
 console.log("eeessdf"); 
 db = client.db('landdb');
  
  return await db.collection('users').find(query).toArray();
} finally {
  client.close();
}
}


 myFunc(query).then(res =>{

	land_id = res[0].land_id;
	land_adhar_number = res[0].adhar_number;
	land_prev_owner_name = res[0].prev_owner_name;
	land_coordinate_one = res[0].coordinate_one;
	land_coordinate_two = res[0].coordinate_two;
	land_area = res[0].area;
	land_tax_pay_status = res[0].tax_pay_status;
	land_liability_status = res[0].liability_status;
	land_price = res[0].price;
	land_address = res[0].address;

	console.log("land id : ", land_id);
	console.log("owner adhar number : ", land_adhar_number);
	console.log("previous owner : ",land_prev_owner_name);
	console.log("land coordinate one : ",land_coordinate_one);
	console.log("land coordinate two : ",land_coordinate_two);
	console.log("land area : ",land_area);
	console.log("tax payment status : ",land_tax_pay_status);
	console.log("Land liability status : ",land_liability_status);
	console.log("land minimum price : ",land_price);
	console.log("land address : ",land_address);

	if(land_tax_pay_status == 'paid'){
		console.log('Tax paid');
	}
	else{
		console.log('Tax not paid');
	}

	if(land_liability_status == 'nil'){
		console.log('No liability');
	}
	else{
		console.log('liability found');
	}

 })

