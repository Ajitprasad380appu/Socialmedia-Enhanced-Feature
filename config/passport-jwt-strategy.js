const passport =require('passport');
// there are two thing for jwt  given in following two step jwtstretegy and extract jwt 
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User =require('../models/user');


let opts ={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'codeial'
    // increption goes throw this and decreption throw this and not decrept the token 
  
}
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){console.log('Error in finding user from jwt');return;}
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}));


module.exports=passport;