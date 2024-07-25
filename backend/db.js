
const mongoose=require('mongoose');
const mongoURI='mongodb://coder-7401:amazon7401@ac-ioquk8i-shard-00-00.zsfgtbk.mongodb.net:27017,ac-ioquk8i-shard-00-01.zsfgtbk.mongodb.net:27017,ac-ioquk8i-shard-00-02.zsfgtbk.mongodb.net:27017/GoFoodmern?replicaSet=atlas-5qykza-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
const mongoDB=async ()=>{
    await mongoose.connect(mongoURI, { useNewUrlParser: true},async(err,result)=>{
        if(err)console.log("---",err)
            else
        {
        console.log("connected");
        const fetched_data=await mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(err,data){
            const foodCategory=await mongoose.connection.db.collection("foodCategory");
             foodCategory.find({}).toArray(function (err,catData){
                if(err) console.log(err);
                 else {
                     global.food_items=data;
                     global.foodCategory=catData;
                }  
             })
          
           })
        }
        
       });
}
module.exports=mongoDB;