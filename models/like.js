const mongoose=require('mongoose');
const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    // this fields is used for defining the type of object the like object since this is daynamic reference 
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});





const Like=mongoose.model('Like',likeSchema);
module.exports=Like;