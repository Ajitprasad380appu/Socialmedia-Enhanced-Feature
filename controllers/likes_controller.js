const Like=require('../models/like');
const Comment=require('../models/comment');
const post=require('../models/post');

module.exports.toggleLike=async function(req,res){
    try{
        // likes/toggle/?id==abc& type=post
      let likeable;
      let deleted=false;

        if(req.query.type=='Post'){
            likeable=await  post.findById(req.query.id).populate('likes');
        }else{
                likeable=await Comment.findById(req.query.id).populate('likes');
           
            
        }

        // check if like is alredy exist
        let existingLike=await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        }) 
        // if like alredy exist then deleted it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted=true;
        }else{
            // make a new like 
             let newLike=await Like.create({
                 user:req.user._id,
                 likeable:req.query.id,
                 onModel:req.query.type
             });
             likeable.likes.push(newLike._id);
             likeable.save();
        }
        return res.json(200,{
            message:"Request successfull",
            data:{
                deleted:deleted
            }
        })


    }catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal server Error'
        });
    }
}