const passport=require('passport');
const localStrategy=require('passport-local').Strategy;


const User=require('../models/user');
//authentication useing passport
passport.use(new localStrategy({
    usernameField:'email'
},
function(email, password, done) {
    // find a user and establish the identity
    User.findOne({email: email})
        .then(function(user) {
            if (!user || user.password !== password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(function(err) {
            console.log('Error in finding user --> passport');
            return done(err);
        });
}

));
// function(email,password,done){
//     User.findOne({email: email})
//     .then(function(user) {
//         if(!user || user.password !== password){
//             console.log('Invalid Username/Password');
//             return Promise.reject(null);
//         }
//         return Promise.resolve(user);
//     })
//     .catch(function(err) {
//         console.log('Error in finding user --> passport');
//         return Promise.reject(err);
//     })
//     .then(function(user) {
//         return done(null, user);
//     })
//     .catch(function(err) {
//         return done(err);
//     });


// }

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializeing the user to decide from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(function(user) {
        if (!user) {
            console.log('User not found');
            return Promise.reject(null);
        }
        return Promise.resolve(user);
    })
    .catch(function(err) {
        console.log('Error in finding user --> passport');
        return Promise.reject(err);
    })
    .then(function(user) {
        return done(null, user);
    })
    .catch(function(err) {
        return done(err);
    });

});
 
//check if the user is authenticate
passport.checkAuthentication=function(req,res,next){
    //if the userr is signe in , then pass on the requrest to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();

    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if (req.isAuthenticated()){
        //req.usere contains the current signed in user from the session cookies and we are just sending to the locals for the views
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;