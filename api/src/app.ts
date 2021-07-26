import express, { Request, Response, NextFunction, Application } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';
import config from './lib/config';
const path = require('path');

const app: Application = express();

app.use(cors())
// app.use(
// 	cors({
// 		origin: true,
// 		credentials: false,
// 		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
// 		allowedHeaders: ['Access-Control-Allow-Origin', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
// 	})
// );

// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', "*"); //**cambio** */ update to match the domain you will make the request from//aca habia un 3000!
// 	next();
// });

app.use(express.urlencoded({ extended: true, limit: '50mb' })); //middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, '/')));


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