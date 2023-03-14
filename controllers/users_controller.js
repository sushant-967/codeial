const User=require('../models/user');

module.exports.profile=function(req,res){
    
    return res.render('user_profile',{
        title: "User_profile"
    });
}
//render the sign up page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial |Sign up"
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial |Sign in"
    })
}
//get the sin up data
module.exports.create=function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    // User.findOne({email: req.body.email},function(err,user){
    //     if(err){console.log('error in finding user in signing up');return}
    //     if(!user){
    //         User.create(req.body,function(err,user){
    //             if(err){console.log('error in creating user while signing up');return}
    //             return res.redirect('/users/sign-in');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })
    User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      User.create(req.body)
        .then(user => {
          return res.redirect('/users/sign-in');
        })
        .catch(err => {
          console.log('error in creating user while signing up');
          return;
        });
    } else {
      return res.redirect('back');
    }
  })
  .catch(err => {
    console.log('error in finding user in signing up');
    return;
  });

    // todo later
}
//sign and crete the session for the user
module.exports.createSession = function(req,res){
    //to do later
}