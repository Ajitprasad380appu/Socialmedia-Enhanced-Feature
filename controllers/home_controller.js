const Post=require('../models/post');
const User=require('../models/user');
module.exports.home= async function(req,res)
{
   try{
      let posts= await Post.find({})
      .populate('users')
      .populate({
         path:'comments',
         populate:{
            path:'users'
         }
      });
      let users= await User.find({});
             return res.render('home',{
             title:"codeial | home ",
             posts: posts,
             all_users:users,
            });

   }catch(err){
        console.log('Error',err);
        return ;
   }
 
}

//   .exec(function(err,posts){
//       // console.log(posts[0].user.name);
      
   
//   });

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