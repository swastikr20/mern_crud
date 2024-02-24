const mongoose=require('mongoose')


const dbConnection=async()=>{
    try{
        const connect=await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("database connected : ",connect.connection.host,connect.connection.name);
    }
    catch{
        console.log("Failed to connect db")
        process.exit(1);
    }
}

module.exports=dbConnection