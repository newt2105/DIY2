const User = require('../models/user');

class AuthControllers{

      getLogin = (req, res, next) => {
        res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          isAuthenticated: false
        });
      };

      postLogin = (req, res, next) => {
        User.findByPk('1')
          .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.redirect('/');
          })
          .catch(err => console.log(err));
      };

      postLogout = (req, res, next) => {
        req.session.destroy(err => {
          console.log(err);
          res.redirect('/');
        });
      }

      
}

module.exports = new AuthControllers