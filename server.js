import express from 'express';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import User from './models/users.js';
import Faq from './models/faq.js'; // Импорт модели FAQ
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PORT = 3000;
const URL = 'mongodb://localhost:27017/moviebox';
const JWT_SECRET = 'your_jwt_secret'; // Перенести в ./env потом

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

// Маршруты для аутентификации
app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Пользователь успешно создан' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при создании пользователя', details: err.message });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message : 'Неверный email или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message : 'Неверный email или пароль' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message : 'Ошибка при входе', details: err.message });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Это защищенный маршрут', user: req.user });
});

// Маршруты для FAQ
const PAGE_LIMIT = 10;

// Обработка GET запроса для /faqs
app.get('/faqs', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';

  try {
    const query = searchTerm ? { question: { $regex: searchTerm, $options: 'i' } } : {};
    const faqs = await Faq.find(query)
      .skip((page - 1) * PAGE_LIMIT)
      .limit(PAGE_LIMIT);
    const totalFaqs = await Faq.countDocuments(query);

    res.json({
      faqs,
      hasMore: (page * PAGE_LIMIT) < totalFaqs
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке данных', details: err.message });
  }
});


app.get('/faqs', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';

  try {
    const query = searchTerm ? { question: { $regex: searchTerm, $options: 'i' } } : {};
    const faqs = await Faq.find(query)
      .skip((page - 1) * PAGE_LIMIT)
      .limit(PAGE_LIMIT);
    const totalFaqs = await Faq.countDocuments(query);

    res.json({
      faqs,
      hasMore: (page * PAGE_LIMIT) < totalFaqs
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке данных', details: err.message });
  }
});


app.put('/api/faqs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!updatedFaq) {
      return res.status(404).json({ error: 'FAQ не найден' });
    }
    res.status(200).json(updatedFaq);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при обновлении FAQ', details: err.message });
  }
});

app.delete('/api/faqs/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq) {
      return res.status(404).json({ error: 'FAQ не найден' });
    }
    res.status(200).json({ message: 'FAQ удален' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при удалении FAQ', details: err.message });
  }
});

// Маршруты для продуктов
app.get('/products', (req, res) => {
  const products = [];

  db.collection('products')
    .find()
    .forEach((product) => products.push(product))
    .then(() => res.status(200).json(products))
    .catch((err) => res.status(500).json({ error: 'Ошибка', details: err.message }));
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return res.status(400).json({ error: 'Неправильный айди продукта' });
  }

  db.collection('products')
    .findOne({ id: numericId })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: 'Продукт не найден' });
      }
      res.status(200).json(product);
    })
    .catch((err) => res.status(500).json({ error: 'Ошибка', details: err.message }));
});
