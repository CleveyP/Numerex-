const {MongoClient} = require('mongodb');

async function main(){
   
    const uri = "mongodb://localhost:27017";

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        //select the cleveland user
        const database =  client.db("Numerex");
        const users = database.collection("users");
        const data = await users.findOne({name: "Pluto"});
        if(data)
        console.log(data.name);
        else{
            console.log("f");
        }
    } catch (e) {
        console.error(e);
    } 
}

main().catch(console.error);

module.exports = database;