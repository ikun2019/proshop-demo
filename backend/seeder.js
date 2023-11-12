const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config();
// * データのインポート
const users = require('./data/users.js');
const products = require('./data/products.js');
// * モデルのインポート
const User = require('./models/User.js');
const Product = require('./models/Product.js');
const Order = require('./models/Order.js');

const connectDB = require('./config/db.js');

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; // 管理者ユーザーのidを取得
    const sampleProducts = products.map((product) => { // 製品を作成できるのは管理者ユーザーだけ
      return { ...product, user: adminUser }
    });
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit(); // processを普通に終了
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1); // processを強制終了
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit(); // processを普通に終了
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1); // processを強制終了
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
};
