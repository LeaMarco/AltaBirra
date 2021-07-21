import express, { Application } from 'express';
import authRoutes from './routes/auth';
import morgan from 'morgan';
import cors from 'cors';
// import Facebook from 'passport-facebook'
// import passport from 'passport';
import { prisma } from '@prisma/client';

// const FacebookStrategy = Facebook.Strategy

const app: Application = express();

// settings
app.set('port', 3001);
app.use(express.json());
// middlewares
app.use(morgan('dev'));
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.HOST_FRONT); //**cambio** */ update to match the domain you will make the request from//aca habia un 3000!
    next();
});

// routes
app.use('/auth', authRoutes);


export default app;


