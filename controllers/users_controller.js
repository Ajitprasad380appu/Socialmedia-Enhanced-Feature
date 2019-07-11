const User=require('../models/user');
module.exports.profile=function(req,res)
{
    User.findById(req.params.id,function(err,user){
        res.render('user_profile',{
            title:'User profile',
            profile_user:user
        });
    });
    
    //  if(req.cookies){
    //       User.findById(req.cookies.user_id,function(err,user)
    //       {
    //           if(user)
    //           {
    //               return res.render('user_profile',{
    //                  title:"User Profile",
    //                  user:user
    //               })
    //           }
    //           else{
    //               return res.redirect('/users/sign-in');
    //           }
    //       });
    //  }
    //  else{
    //      return res.redirect('/users/sign-in');
    //  }
    
}
// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    } 
    return res.render('user_sign_up',
    {
        title:"Codeial | Sign Up"
    })
}
// render the signin page 
module.exports.signIn = function(req,res){
    
    if(req.isAuthenticated())
    {
       return  res.redirect('/users/profile');
    }  

    return res.render('user_sign_in',
    { 
        title:"Codeial | Sign In"

    })
}
// get the sign up data
module.exports.create=function(req,res)
{
     if(req.body.password != req.body.confirm_password){
         return res.redirect('back');
     }
     User.findOne({email:req.body.email},function(err,user){
         if(err){
             console.log('error in finding user in signing up');return;}

         if(!user){
             User.create(req.body,function(err,user){
                 if(err){ console.log('error in creating user while signing up'); return;}
             return res.redirect('/users/sign-in');
             })
         } else
         {
            return res.redirect('back');
         }

     });
   // TODO latter 
}
// module.exports.createSession=function(req,res){
//     // step to authenticate 
//     // find the user
//       User.findOne({email:req.body.email},function(err,user)
//       {
//         if(err){ console.log('error in creating user while signing in'); return;}
//         // handle user found
//         if(user)
//         {    
//             // handle password which doesn't match
//              if(user.password!=req.body.password)
//              {
//                  return res.redirect('back');
//              }
//              res.cookie('user_id',user.id);
//               return res.redirect('/users/profile');
//            // handle  session creation
//         }else{
//               //handle user not found 
//               return res.redirect('back');
//         }
//       }); 
     module.exports.createSession=function(req,res)
     {
         return res.redirect('/');
     }
//}



module.exports.destroySession=function(req,res)
{
    req.logout();
    return res.redirect('/');
}