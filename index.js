const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {secret: 'signin-signout-secret', resave: false, saveUninitialized: true}
))

app.get('/', (req, res) => {
    username = '';
    
    if (req.cookies?.username) {
        username = req.cookies.username;
    }
    res.render('signin',{username: username || ''})})

app.all('/signin', (req, res) => {
    
    let username = req.body?.username || '';
    let password = req.body?.password || '';
    let save = req.body?.save || false;
    let valid = false;
    let signedIn = false;

    if (username === 'Dino' && password === '1111') {
        valid = true;
        signedIn = true;

        if (save) {
            req.session.username = username;
            req.session.password = password;
            req.session.saveme = save;
            req.session.valid = valid;
            req.session.signedIn = signedIn;

            duration = 1000 * 5 * 60 // 5 minutes
            res.cookie('username', username, {maxAge: duration});
        }

        res.render('signin', {username: username,
                                    signedIn: signedIn,
                                    valid: valid
            })
    } else {
        res.redirect('/');
    }
})

app.all('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
})