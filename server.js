import express from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const PORT = 3000;
const URL = 'mongodb://localhost:27017/moviebox';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, (err) => {
      if (err) {
        console.log('Server error:', err);
      } else {
        console.log(`Server is running on port ${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.log('Database connection error:', err);
  });

const db = mongoose.connection;

app.get('/products', (req, res) => {
  const products = [];

  db.collection('products')
    .find()
    .forEach((product) => products.push(product))
    .then(() => res.status(200).json(products))
    .catch((err) => res.status(500).json({ error: 'Ошибка', details: err.message }));
});

