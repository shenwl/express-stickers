var express = require('express')
var router = express.Router()

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy

passport.serializeUser(function(user, done) {
    done(null, user);
  });
   
passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

passport.use(new GitHubStrategy({
    clientID: 'ce855fe0bc9c9a3894c2',
    clientSecret: '2af9193ab96c90b37e6e88af3fab158d83cb2fd4',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
))

router.get('/github', passport.authenticate('github'))

router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        console.log('request------', req.user)
        req.session.user = {
            id: req.user._json.id,
            username: req.user._json.login,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        }
        // Successful authentication, redirect home. 
        res.redirect('/')
    }
)

router.get('/logout', function(req, res) {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router
