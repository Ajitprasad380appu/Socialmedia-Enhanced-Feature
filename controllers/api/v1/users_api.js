const User =require('../../../models/user');
const jwt=require('jsonwebtoken');



module.exports.createSession= async function(req, res)
     { 
         try{
            let user= await User.findOne({email:req.body.email});
            // 422 means invalid user 
            if(!user ||user.password !=req.body.password){
                return res.json(422,{
                    message:"Invalid username and password!"
                });
            }
            // incase user has been found then return user
            return res.json(200,{
                message:"Sign in successfully , here is your token , plaese safe it ",
                data:{
                    token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
                }
            })
         }catch(err){
            console.log('Error',err);
            return res.json(500,{
            message:"Internal server error"
        });

         }
         
     }