// const alert=require('alert');
const User = require('../models/User')
const Resume = require('../models/Resume');

module.exports.resume= function(req,res){
    return res.render('resume');
}
module.exports.signup=function(req,res){
  if(req.isAuthenticated()){
   
    return res.redirect('/home');
 }
 return  res.render('signup');
  }
  module.exports.login=function(req,res){
    if(req.isAuthenticated()){
    return res.render('/home') }
    return  res.render('login');
  }

  //get the signup data 
  module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
      // alert('howdy');

        res.send('USER NOT REGISTERED AS PASSWORD DID NOT EQUALS CONFIRM PASSWORD');

     return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
      if(err){
        console.log("there is a error in finding in signup");
        return;
      }
      if(!user){
        User.create(req.body,function(err,user){
          if(err){
            console.log(err);
            return;
          }
          return res.redirect('/users/login');
        })
      }
     else{
      return res.redirect('back');
     }
    })
  }




//   // user login  and creating a session
//   module.exports.create_session = function(req,res){
//    //find the user -
// User.findOne({email:req.body.email},function(err,user){
//   if(err){
//     console.log(err);
//     return;
//   }
// //hndle user found - 
// if(user){
// //handle password which does not match
// if (user.password != req.body.password) {
//   return res.redirect('/users/signup')
// }

// // handle create-session
// res.cookie('user_id',user.id);  
// return res.redirect('/users/profile');
// }
//    // handle user not found  -
// else{
// return res.redirect('back');
// }

// })

   

 
//   }

 module.exports.create_session = function(req,res){
return res.redirect('/home');
 }




  //saving data on mongo -
 module.exports.resume_data =  function(req,res){
  Resume.create({name:req.body.name ,email:req.body.email,about:req.body.about,user:req.user._id},function(err,resData){
    if(err){              
      console.log(err);
      return;
    }
    console.log('*****',resData);
    return res.redirect('/users/show_resume');
  })
 }

 //showing your resume 

 module.exports.show_resume = function(req,res){
  console.log(req.params.id);
  Resume.findOne({user: req.user._id},function(err,user_resume){
    if(err){
      console.log(`here is error ${err}`)
      return;
    }
    return res.render('yourresume',{
      user_res:user_resume
    });
  })

 }


 //signout

 module.exports.destroySession = function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.render('home');
  });
}
  
    module.exports.update = function(req, res){
 
        Resume.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('/users/show_resume');
        });
  
}  