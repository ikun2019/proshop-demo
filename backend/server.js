const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db.js');
const productRouter = require('./routes/product.route.js');
const { errorHandler } = require('./error/errorHandler.js');

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRouter);

// app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('Server is running!');
});
