import express from 'express';
import dotenv from 'dotenv';
import { db, pgp } from './db'; 
import memberRoutes from './src/routes/memberRoutes';
import categoryRoutes from './src/routes/categoryRoutes';
import businessRoutes from './src/routes/businessRoutes';
import productRoutes from './src/routes/productRoutes';
import enquiryRoutes from './src/routes/enquiryRoutes';



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

app.use('/api/member', memberRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/product', productRoutes);


app.use('/api/category', categoryRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
