import express from 'express';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pgp = pgPromise();
const db = pgp(connectionString);

async function testDatabaseConnection() {
    try {
      const result = await db.func('util_get_hello');
      console.log('Successfully connected to db:', result[0].util_get_hello);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      pgp.end();
    }
}

testDatabaseConnection();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
