const Post=require('../models/post');
module.exports.home=function(req,res)
{
   //return res.end('<h1> exprees is up for codeial</h1>');


  // Post.find({},function(err,posts){
  //       console.log(`
    
  //   Debugging

  //   `);
  //   console.log(err);
  //  return res.render('home',{
  //     title:"codeial | home ",
  //     posts:posts
  // });
  // });


  Post.find({})
  .populate('user')
  .populate({
     path:'comments',
     populate:{
        path:'user'
     }
  })
  .exec(function(err,posts){
      // console.log(posts[0].user.name);
   return res.render('home',{
      title:"codeial | home ",
      posts:posts
  });
  });

  
}