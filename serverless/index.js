const {DynamoDB}= require("aws-sdk"),
api={},
TABLE_NAME=process.env.TABLE_NAME;


api.handler= async(event)=>{
    console.log({event});
    let response={};
    try{
        if (event.path.includes('users') && event.httpMethod==="POST"){
            
// SAVE USER IN DynaomoDB
// parse the JSON string event body into and pass to create handler set response with table's output and success code
// if rejected refer to catch statement
        response.body=JSON.stringify(await api.handleCreateUser(JSON.parse(event.body)));
        response.statusCode=201; 
        }
    }catch(e){
// set response to JSON version of error and status code for serverside error non auth0/authN
        response.body=JSON.stringify(e);
        response.statusCode=500;
    }
// log final form of response to cloudwatch and return to client
        console.log(
            "1",{response},
            "2","response",
            "3",response
            );
    return response;
}
   
api.handleCreateUser= async(userObject)=>{
 return new Promise((resolve,reject)=>{
     let documentClient= new DynamoDB.DocumentClient();
     
     let params={ 
         TableName:TABLE_NAME,
         Item:item
     };
     
     documentClient.put(params,(err,data)=>{
         if(err) reject(err);
         else resolve(data)
    });
 
 })
};

module.exports=api;
