const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"27812447053-qmoalj53m392l5kjd8cg9hfttjoe1453.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
},
function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email: profile.emails[0].value})
        .exec()
        .then(user => {
            console.log(profile);
            if(user){
                //if found, set this user as req.user
                return done(null,user);
            }else{
                //if not found, create the user and set it as req.user
                return User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                });
            }
        })
        .then(newUser => {
            if(newUser){
                return done(null, newUser);
            }
        })
        .catch(err => {
            console.log('error in google strategy passport',err);
            return done(err, null);
        });
}
));




module.exports=passport;