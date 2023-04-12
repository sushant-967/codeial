const Post=require('../models/post');  
const Comment=require('../models/comment');

module.exports.create = function(req, res) {
    let post=Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(function(post) {
      if(req.xhr){
        return res.status(200).json({
          data:{
            post:post
          },
          message:"Post created!"
        });
      }
      
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
        if(req.xhr){
          return res.status(200).json({
            data: {
              post_id:req.params.id
            },
            message:"Post deleted"
          });
        } else {
          return Comment.deleteMany({post:req.params.id})
            .then(() => {
              return res.redirect('back');
            });
        }
      } else {
        throw new Error('Unauthorized'); // or handle the error case as desired
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    });
}
