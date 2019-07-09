const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');
const db=mongoose.connection;
db.on('Error',console.error.bind(console,"error connection to mongoDB"));




db.once('open',function()
{
    console.log('connection to the database :: mongoDB');
});
module.exports=db;