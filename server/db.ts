import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pgp = pgPromise();
const db = pgp(connectionString);

export { db, pgp };