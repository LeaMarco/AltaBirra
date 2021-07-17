import express, { Application } from 'express';
import authRoutes from './routes/auth';
import morgan from 'morgan';
import cors from 'cors';
import Facebook from 'passport-facebook'
import passport from 'passport';
import { prisma } from '@prisma/client';

const FacebookStrategy = Facebook.Strategy

const app: Application = express();

// settings
app.set('port', 3001);
app.use(express.json());
// middlewares
app.use(morgan('dev'));
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://localhost:3000'); //**cambio** */ update to match the domain you will make the request from//aca habia un 3000!
    next();
});

// routes
app.use('/auth', authRoutes);

/* 

passport.use(new FacebookStrategy({
    clientID: "359285035544045" || "",
    clientSecret: "24e95298e65edbf0a9fd6cec60ac9def" || "",
    callbackURL: "http://localhost:3000/auth/facebook/secrets"
},
    function (accessToken, refreshToken, profile, cb) {

        console.log(profile)
    }
));


app.get('/auth/facebook', passport.authenticate('facebook'));


app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    }); */


export default app;


