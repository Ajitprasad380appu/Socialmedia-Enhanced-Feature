const Post=require('../models/post');
const User=require('../models/user');
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
  .populate('users')
  .populate({
     path:'comments',
     populate:{
        path:'users'
     }
  })
  .exec(function(err,posts){
      // console.log(posts[0].user.name);
      User.find({},function(err,users){
         return res.render('home',{
            title:"codeial | home ",
            posts: posts,
            all_users:users
        });
      });
   
  });
}