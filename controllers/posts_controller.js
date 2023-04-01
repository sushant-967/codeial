const Post=require('../models/post');  
const Comment=require('../models/comment');

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function(post) {
        return res.redirect('back');
    }).catch(function(err) {
        console.log('error in creating a post', err);
        return res.status(500).send('Internal Server Error');
    });
}


module.exports.destroy=function(req,res){
    Post.findById(req.params.id)
  .then((post) => {
    if(post.user== req.user.id){
        post.deleteOne();
        return Comment.deleteMany({post:req.params.id});
    } else {
        throw new Error('Unauthorized'); // or handle the error case as desired
    }
  })
  .then(() => {
    return res.redirect('back');
  })
  .catch((err) => {
    console.error(err);
    return res.redirect('back');
  });

}
