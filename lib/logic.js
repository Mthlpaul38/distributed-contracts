'use strict';


/**
 * Buying Real Estate
 * @param {org.acme.landregistry.BuyingRealEstate} trade
 * @transaction
 */

function buyingRealEstate( trade ){
  var notaryFees = 0.1 * trade.realEstate.price
  //var realEstateAgentFees = trade.realEstateAgent.feeRate * trade.realEstate.price
  //var insuranceCostFirstMonth = trade.insurance.monthlyCost
  var totalCost = notaryFees
  // Updates the seller's balance
  trade.seller.balance += trade.realEstate.price
  
  // Check if the buyer has enough to pay the notary, real estate agent and insurance
  if( trade.buyer.balance < totalCost ){
    throw new Error('Not enough funds to buy this!')
  }
  trade.buyer.balance -= totalCost
  trade.realEstate.owner = trade.buyer
  //trade.realEstateAgent.balance += realEstateAgentFees
  trade.notary.balance += notaryFees
  
  Promise.all([
    getAssetRegistry('org.acme.landregistry.RealEstate'),
    getParticipantRegistry('org.acme.landregistry.PrivateIndividual'),
    getParticipantRegistry('org.acme.landregistry.PrivateIndividual'),
    getParticipantRegistry('org.acme.landregistry.Notary'),
    //getParticipantRegistry('org.acme.landregistry.RealEstateAgent')
  ]).then(function(registries){
    return (
      registries[0].update(trade.realEstate),
      registries[1].update(trade.seller),
      registries[2].update(trade.buyer),
      registries[3].update(trade.notary)
      //registries[4].update(trade.realEstateAgent)
    )
  })
}
