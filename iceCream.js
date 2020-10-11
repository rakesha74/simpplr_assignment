'use strict';

const client = require('./client');
const util = require('util');

const searchRequest = {
  location: 'Redwood City',
  categories: 'icecream',
  limit: 10,
  sort_by: "rating"
};

async function fetchTopIceCreamParlour(){
    try {
        var outputResult = [];
        var result = await client.search(searchRequest);

        if(result && result.jsonBody && result.jsonBody.businesses){
            var icecreamParlourResult = result.jsonBody.businesses;
        } else {
            throw(new Error("Response is empty"));
        }

        util.log("Top 10 Ice cream parlour result::"+JSON.stringify(icecreamParlourResult,undefined,2));

        for(var index=0;index<icecreamParlourResult.length;index++){

            var temp = {};
            temp.business_name = icecreamParlourResult[index]["name"];
            temp.business_address = (icecreamParlourResult[index]["location"] && 
                                    icecreamParlourResult[index]["location"]["display_address"]);
            
            if(icecreamParlourResult[index].id){
                
                var reviewResult = await client.reviews(icecreamParlourResult[index].id);

                if(reviewResult && reviewResult.jsonBody && reviewResult.jsonBody["reviews"]
                  && reviewResult.jsonBody["reviews"].length > 0){

                        var reviewResult = reviewResult.jsonBody["reviews"];
                        var reviews_array = [];
                        util.log("Reviews for business id::"+icecreamParlourResult[index].id+"::"+JSON.stringify(reviewResult,undefined,2));
                        for(var reviewIndex=0; reviewIndex<reviewResult.length;reviewIndex++){
                            
                            var temp_review = {};
                            temp_review.excerpt = reviewResult[reviewIndex].text;
                            temp_review.reviewer = (reviewResult[reviewIndex].user &&           reviewResult[reviewIndex]["user"]["name"]);
                            reviews_array.push(temp_review);
                        }
                        
                        temp.reviews = reviews_array;
                
                } else {
                        temp.reviews = "No reviews available";
                }
            }
            outputResult.push(temp);
        }

        return outputResult;
    } catch (err) {
        throw(err);
    }
}
 

fetchTopIceCreamParlour().then(result=>{
    util.log("Final result fro Top 10 Ice cream Parlour with reviews::"+JSON.stringify(result,undefined,2));
}).catch(e => {
      util.log("Error::"+JSON.stringify(e,undefined,2));
});
