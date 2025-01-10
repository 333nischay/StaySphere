const User = require("../models/user.js");

module.exports.signUpUser = async (req, res) => {
try{
    const { username, email, password } = req.body;
    const registeredUser = new User({ email, username });
    const registration = await User.register(registeredUser, password); //this resgister is used with passport package
    req.login(registeredUser,(err)=>{
        if(err){
        return next(err);
        }
        req.flash("success", "Welcome to StaySphere");
        res.redirect("/listings");
    })
}
    catch(e){
        req.flash("error",`${e}`);
        res.redirect("/signup");
    }
}

module.exports.loginUser = async (req, res) => {
    let { username } = req.body;
    req.flash("success",`Welcome Back ${username}`); //once the authentication process is done the the sessions is reset and the redirectUrl is gone and it is now a undefined null value
    if(res.locals.redirectUrl){res.redirect(res.locals.redirectUrl); } //res.locals cannot be reset with the passport package
    else{res.redirect("/listings")}
}

module.exports.logoutUser = (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You have successfully logged out!"); //this should be inside the callout function
      res.redirect("/listings");
    });
  }