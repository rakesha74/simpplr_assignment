'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'pSxxXBpunBnBT0mIoP_m6VTEy32nmGTOG8xO5_9ehd8uIPpSgZvaSTxqmVoNdR_OxuXI2u5JLB5gltsjBUxat5sy4ci96wvRmWJT_Bmw473B48rMEeZQml2lcPBeX3Yx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'Redwood City',
  categories: 'icecream',
  limit: 10,
  sort_by: "rating",

};

const client = yelp.client(apiKey);

async function fetchTopIceCreamParlour(){
    var result = await client.search(searchRequest);
    return result.jsonBody.businesses;
}
 
fetchTopIceCreamParlour().then(result=>{
    console.log(JSON.stringify(result,undefined,2));
}).catch(e => {
      console.log(e);
 });

// client.search(searchRequest).then(response => {
//   const result = response.jsonBody.businesses;
//   const prettyJson = JSON.stringify(result, null, 4);
//   console.log(prettyJson);
// }).catch(e => {
//   console.log(e);
// });
