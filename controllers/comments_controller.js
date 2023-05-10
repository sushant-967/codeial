const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');


//  module.exports.create=async function(req,res){
//     try{
//         let post=await Post.findById(req.body.post);
//         if(post){
//             let comment=await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });
//             post.comments.push(comment);
//             post.save();
//             comment=await comment.populate('user','name email').execPopulate();
//             commentsMailer.newComment(comment);
            
//             if(req.xhr){
//                 return res.status(200).json({
//                     data:{
//                         comment: comment
//                     },
//                     message: "Post created!"
//                 });
//             }
            
//             res.redirect('/');
//         }

//     }catch(err){
        
//         return;
//     }
//  }

module.exports.create= function(req,res){
    Post.findById(req.body.post)
    .then(post => {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then(comment => {
                post.comments.push(comment);
                return post.save();
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                console.log("Error creating comment", err);
                return res.redirect('/');
            });
            commentsMailer.newComment(comment);
        }
    })
    .catch(err => {
        console.log("Error finding post", err);
        return res.redirect('/');
    });


}

module.exports.destroy= function(req,res){
    Comment.findById(req.params.id)
    .then((comment) => {
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.deleteOne();
            Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}})
                .then((post) => {
                    return res.redirect('back');
                })
                .catch((err) => {
                    console.error(err);
                    return res.redirect('back');
                });
        }else{
            return res.redirect('back');
        }
    })
    .catch((err) => {
        console.error(err);
        return res.redirect('back');
    });

}