const Post=require('../models/post');

const User=require('../models/user');

module.exports.home = function(req, res) {
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec()
    .then(posts => {
        User.find({})
    .then(function(users) {
        res.render('home', {
            title: 'Codeial | Home',
            posts: posts,
            all_users: users
        });
    })
    .catch(function(err) {
        // Handle error here
    });

});
   


    
}

//module.exports.actionName=fuction(req,res){}