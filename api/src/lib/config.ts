import dotenv from 'dotenv';


dotenv.config();


const config = {
	dbUser: process.env.DB_USER || 'postgres',
	dbPassword: process.env.DB_PASSWORD || '1234',
	dbHost: process.env.DB_HOST || 'localhost',
	dbName: process.env.DB_NAME || 'workshop',
	dbPort: process.env.DB_PORT || '5432',
	dev: process.env.NODE_ENV !== 'production',
	port: process.env.API_PORT || '3001',
	host: process.env.API_host || 'localhost',
	cors: process.env.CORS || process.env.HOST_FRONT,
}


export default config;