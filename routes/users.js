const express=require('express');
const router=express.Router();


const usersController=require('../controllers/users_controller');
router.get('/profile',usersController.profile);
//similarly for user/posts
const usersPostController=require('../controllers/users_postscontroller');
router.get('/posts',usersPostController.postsController);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
module.exports=router;