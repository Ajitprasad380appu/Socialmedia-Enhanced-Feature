const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');



// tell passport to use a new strategy for google login

passport.use(new googleStrategy({
    // find the user 
        clientID:"1091587621037-egk3v9n9m4a7v0vt6vq0e166ak70sorp.apps.googleusercontent.com",
        clientSecret:"K3Bs9Lqz_pr2_ZD4guPgQ2J1",
        callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){

            if(err){console.log('error in google strategy-passport',err);return ;}
            console.log(profile);
            if(user){
                // if found the user set this user as req.user
                return done(null,user);
            }else{
                // not found  means user is not there in the system  and create the user and set it req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')

                },function(err,user){
                    if(err){console.log('error in creating user google strategy-passport',err);return ;}
                    return done(null,user);
                });
            }
        });
    }
));
module.exports=passport;