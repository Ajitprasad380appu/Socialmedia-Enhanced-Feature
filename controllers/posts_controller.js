const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');
module.exports.create= async function(req,res){
    try{
      let post= await Post.create({
            content:req.body.content,
            user: req.user._id
        });


        // xml http requiest
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message: "Post created !"
            });
        }
        req.flash('success','Post published !');
        return res.redirect('back');
    }catch(err){
          //console.log('Error',err);
          req.flash('error',err);
         // return;
         return res.redirect('back');
    }
  
}
module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id)
            {

                // delete the associalted likes for the post and all its comment like too

                await Like.deleteMany({likeable:post, onModle:'Post'});
                await Like.deleteMany({_id: {$in:post.comments}});

                post.remove();
               await Comment.deleteMany({post: req.params.id});
               if(req.xhr){
                   return res.status(200).json({
                       data:{
                           post_id: req.params.id
                       },
                       message:"post deleted"
                   });
               }

               req.flash('success', 'post and associated comments deleted !');
               res.redirect('back');
            }else{
                req.flash('error','You can not delete post!');
                return res.redirect('back');
            }
    }catch(err){
        //  console.log('Error',err);
            req.flash('error',err);
        // return ;
        return res.redirect('back');
    }
   
}