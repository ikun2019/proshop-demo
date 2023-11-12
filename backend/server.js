const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db.js');
const productRouter = require('./routes/product.route.js');
const userRouter = require('./routes/user.route.js');
const { errorHandler } = require('./error/errorHandler.js');

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // フォームから送信されたデータやクエリパラメータなどのURLエンコード形式のデータを解析する
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log('Server is running!');
});
