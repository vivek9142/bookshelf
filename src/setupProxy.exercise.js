// 🐨 you don't need to do anything in this file for the exercise. This is
// just here for the extra credit. See the instructions for more info.

//module.exports here is exporting a func app 
// and with app we can add .get func (express app)
module.exports = (app) => {
    //so with this we're going to home route and it is redirecting to discover page
    app.get(/^\/$/, (req,res) => res.redirect('/discover'));
}

//so when we build our project and we wanna run it locally we're using a module serve
//so we're using serve to use this as well so go to serve.json
// in serve we'll get  the source destination and status code
// by this the server will sen=t the status code to the front end side
 
//and after this we will update the netlify _redirects file
//so that clients who tried to acces the home route will 
// get redirected as well