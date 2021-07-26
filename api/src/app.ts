import express, { Request, Response, NextFunction, Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import config from './lib/config';
const path = require('path');

const app: Application = express();

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '50mb' })); //middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '/')));

app.use(
	cors({
		origin: process.env.HOST_FRONT,
		credentials: false,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
	})
);

app.use("/", routes);

interface error {
	status: number;
	message: string;
}

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

export default app;