// 文件: /lib/mongodb.js
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
    // 在开发模式下，使用一个全局变量来保存client实例
    // 以避免热重载导致创建过多的数据库连接。
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // 在生产模式下，每次请求都创建一个新的连接是更安全的选择。
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;