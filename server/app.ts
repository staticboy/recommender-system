import express from 'express';
import dotenv from 'dotenv';
import { db, pgp } from './db'; 
import memberRoutes from './src/routes/memberRoutes';
import categoryRoutes from './src/routes/categoryRoutes';
import businessRoutes from './src/routes/businessRoutes';
import productRoutes from './src/routes/productRoutes';
import enquiryRoutes from './src/routes/enquiryRoutes';
import userRoutes from './src/routes/userRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT;

async function testDatabaseConnection() {
    try {
      const result = await db.func('util_get_hello');
      console.log('Successfully connected to db:', result[0].util_get_hello);
    } catch (error) {
      console.error('Error:', error);
    } 
}

testDatabaseConnection();

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/member', memberRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/product', productRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
